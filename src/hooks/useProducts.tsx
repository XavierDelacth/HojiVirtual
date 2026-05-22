import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { products as mockProducts } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// ==========================================
// 📦 TIPOS E INTERFACES
// ==========================================

export interface DynamicProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  // Marca que é produto criado dinamicamente (não mockado)
  isDynamic: true;
  // ID do utilizador vendedor (quando aplicável)
  sellerId?: string;
}

export interface Product extends DynamicProduct {}

interface ProductsContextType {
  // Lista combinada: mockados + dinâmicos
  allProducts: Product[];
  // Apenas produtos dinâmicos
  dynamicProducts: DynamicProduct[];
  // Apenas mockados
  mockProducts: Product[];
  // Adicionar novo produto dinâmico
  addProduct: (product: DynamicProduct) => Promise<DynamicProduct | null>;
  // Remover produto dinâmico
  removeProduct: (productId: string) => Promise<boolean>;
  // Atualizar produto dinâmico
  updateProduct: (productId: string, updates: Partial<DynamicProduct>) => void;
  // Obter produtos de uma loja específica
  getStoreProducts: (storeId: string) => Product[];
  // Limpar todos os produtos dinâmicos
  clearDynamicProducts: () => void;
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// ==========================================
// 🏪 PROVIDER DO CONTEXTO
// ==========================================

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [dynamicProducts, setDynamicProducts] = useState<DynamicProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mapServerProduct = (
    row: Database['public']['Tables']['products']['Row'],
    storeName?: string
  ): DynamicProduct => ({
    id: String(row.id),
    name: row.name,
    description: row.description ?? '',
    price: row.price,
    stock: row.stock,
    category: row.category,
    images: row.images ?? [],
    storeId: `store_${row.seller_id}`,
    storeName:
      storeName || `Loja de ${row.seller_id.slice(0, 6)}`,
    rating: 0,
    reviewCount: 0,
    featured: false,
    isDynamic: true,
    sellerId: row.seller_id,
  });

  const hiddenProductNames = new Set(['tele', 'akamaru']);
  const isHiddenProduct = (name: string) =>
    hiddenProductNames.has(name.trim().toLowerCase());
  const filterHiddenProducts = <T extends { name: string }>(
    items: T[]
  ): T[] => items.filter((item) => !isHiddenProduct(item.name));

  const loadServerProducts = async () => {
    setIsLoading(true);

    try {
      // Hide test products first (safety measure)
      const productIds = [
        '7293fee2-9339-419b-bb0a-3c2462202779',
        '9f00790e-86df-48c4-8252-732b882a684c',
        '7c94008e-5822-481a-b0f3-7768387c8a50',
        '5cbb73d1-c3eb-45e6-a835-94a4c489d706'
      ];

      const { error: hideError } = await supabase
        .from('products')
        .update({ is_active: false })
        .in('id', productIds);

      if (hideError) {
        console.error('Falha ao ocultar produtos de teste no Supabase:', hideError);
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Falha ao carregar produtos do Supabase:', error);
        return;
      }

      const sellerIds = Array.from(
        new Set((data ?? []).map((row) => row.seller_id))
      );

      const { data: profileData, error: profileError } = sellerIds.length
        ? await supabase
            .from('profiles')
            .select('user_id, store_name, name')
            .in('user_id', sellerIds)
        : { data: [], error: null };

      if (profileError) {
        console.error('Falha ao carregar perfis de vendedores do Supabase:', profileError);
      }

      const profileMap = new Map(
        (profileData ?? []).map((profile) => [
          profile.user_id,
          profile.store_name || `Loja de ${profile.name || 'Vendedor'}`,
        ])
      );

      const loadedProducts = (data ?? []).map((row) =>
        mapServerProduct(row, profileMap.get(row.seller_id))
      );
      const visibleProducts = filterHiddenProducts(loadedProducts);

      setDynamicProducts(visibleProducts);
      console.log(`🔁 Carregados ${visibleProducts.length} produtos visíveis do Supabase`);
    } catch (error) {
      console.error('Falha ao carregar produtos do Supabase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Inicializar mockados no contexto (sem duplicação)
  const mockProductsWithFlag = filterHiddenProducts(
    (mockProducts as any[]).map((p) => ({
      ...p,
      isDynamic: false,
    }))
  ) as Product[];

  // ==========================================
  // 📝 OPERAÇÕES SOBRE PRODUTOS
  // ==========================================

  const addProduct = async (product: DynamicProduct): Promise<DynamicProduct | null> => {
    // Validar produto
    if (!product.id || !product.name || !product.storeId || !product.sellerId) {
      console.error('Produto inválido ou sem sellerId:', product);
      return null;
    }

    // Verificar duplicação de ID
    if (
      dynamicProducts.some((p) => p.id === product.id) ||
      mockProductsWithFlag.some((p) => p.id === product.id)
    ) {
      console.error('Produto com ID duplicado:', product.id);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description || null,
          price: product.price,
          stock: product.stock,
          category: product.category,
          images: product.images.length > 0 ? product.images : null,
          seller_id: product.sellerId,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar produto no Supabase:', error);
        return null;
      }

      if (!data) {
        console.error('Erro ao adicionar produto no Supabase: nenhum dado retornado');
        return null;
      }

      const saved = mapServerProduct(data);
      if (!isHiddenProduct(saved.name)) {
        setDynamicProducts((prev) => [...prev, saved]);
      } else {
        console.log(`🔒 Produto oculto não adicionado ao estado: ${saved.name}`);
      }
      console.log(`✅ Produto adicionado: ${saved.name} (${saved.id})`);
      return saved;
    } catch (error) {
      console.error('Erro ao adicionar produto no Supabase:', error);
      return null;
    }
  };

  const removeProduct = async (productId: string): Promise<boolean> => {
    const isMocked = mockProductsWithFlag.some((p) => p.id === productId);

    if (isMocked) {
      console.warn('❌ Não é permitido remover produtos mockados');
      return false;
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Falha ao remover produto do Supabase:', error);
        return false;
      }
      setDynamicProducts((prev) => prev.filter((p) => p.id !== productId));
      console.log(`🗑️ Produto removido: ${productId}`);
      return true;
    } catch (error) {
      console.error('Erro ao remover produto do Supabase:', error);
      return false;
    }
  };

  const updateProduct = (productId: string, updates: Partial<DynamicProduct>) => {
    const isMocked = mockProductsWithFlag.some((p) => p.id === productId);

    if (isMocked) {
      console.warn('❌ Não é permitido editar produtos mockados');
      return;
    }

    setDynamicProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
    console.log(`✏️ Produto atualizado: ${productId}`);
  };

  const getStoreProducts = (storeId: string): Product[] => {
    return [...mockProductsWithFlag, ...dynamicProducts]
      .filter((p) => p.storeId === storeId)
      .filter((p) => !isHiddenProduct(p.name));
  };

  const clearDynamicProducts = () => {
    setDynamicProducts([]);
    console.log('🧹 Todos os produtos dinâmicos foram limpos');
  };

  // ==========================================
  // 🔄 COMBINAR PRODUTOS
  // ==========================================

  const allProducts: Product[] = [...mockProductsWithFlag, ...dynamicProducts]
    .filter((p) => !isHiddenProduct(p.name))
    .filter((p, index, self) => index === self.findIndex((x) => x.id === p.id));

  useEffect(() => {
    try {
      localStorage.removeItem('hoji_dynamic_products_v1');
    } catch (e) {
      console.error('Falha ao limpar hoji_dynamic_products_v1 dentro do provider:', e);
    }

    loadServerProducts();

    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          if (!payload.new) {
            return;
          }

          const newProduct = mapServerProduct(payload.new as Database['public']['Tables']['products']['Row']);
          if (isHiddenProduct(newProduct.name)) {
            return;
          }

          setDynamicProducts((prev) => {
            const exists = prev.find((p) => p.id === newProduct.id);
            if (exists) return prev;
            return [newProduct, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ProductsContextType = {
    allProducts,
    dynamicProducts,
    mockProducts: mockProductsWithFlag,
    addProduct,
    removeProduct,
    updateProduct,
    getStoreProducts,
    clearDynamicProducts,
    isLoading,
  };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};

// ==========================================
// 🎣 HOOK PARA USAR O CONTEXTO
// ==========================================

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }

  return context;
};
