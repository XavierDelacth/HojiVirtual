import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, Product } from "@/hooks/useProducts";

export interface CartItemRow {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  added_at: string;
}

export interface EnrichedCartItem extends CartItemRow {
  product: Product;
}

interface CartContextType {
  items: EnrichedCartItem[];
  isLoading: boolean;
  totalItems: number;
  isInCart: (productId: string) => boolean;
  addToCart: (productId: string) => Promise<{ success: boolean; needsLogin?: boolean }>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { allProducts } = useProducts();
  const [rows, setRows] = useState<CartItemRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setRows([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .order("added_at", { ascending: false });

      if (error) throw error;
      setRows((data as CartItemRow[]) || []);
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items: EnrichedCartItem[] = rows
    .map((row) => {
      const product = allProducts.find((p) => String(p.id) === String(row.product_id));
      if (!product) return null;
      return { ...row, product };
    })
    .filter((item): item is EnrichedCartItem => item !== null);

  const totalItems = rows.reduce((sum, row) => sum + row.quantity, 0);

  const isInCart = useCallback(
    (productId: string) => rows.some((r) => String(r.product_id) === String(productId)),
    [rows]
  );

  const addToCart = useCallback(
    async (productId: string): Promise<{ success: boolean; needsLogin?: boolean }> => {
      if (!user) {
        return { success: false, needsLogin: true };
      }

      try {
        const { data: existing } = await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("user_id", user.id)
          .eq("product_id", String(productId))
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from("cart_items")
            .update({ quantity: existing.quantity + 1 })
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("cart_items").insert({
            user_id: user.id,
            product_id: String(productId),
            quantity: 1,
          });
          if (error) throw error;
        }

        await fetchCart();
        return { success: true };
      } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        return { success: false };
      }
    },
    [user, fetchCart]
  );

  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      if (!user) return;

      try {
        const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
        if (error) throw error;
        await fetchCart();
      } catch (err) {
        console.error("Erro ao remover do carrinho:", err);
      }
    },
    [user, fetchCart]
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      if (!user) return;

      const qty = Math.max(1, quantity);
      try {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: qty })
          .eq("id", cartItemId);
        if (error) throw error;
        await fetchCart();
      } catch (err) {
        console.error("Erro ao atualizar quantidade:", err);
      }
    },
    [user, fetchCart]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        totalItems,
        isInCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
