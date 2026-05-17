import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
}

const AddToCartButton = ({
  productId,
  className,
  size = "sm",
  fullWidth = false,
}: AddToCartButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInCart, addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const inCart = isInCart(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) return;

    setIsAdding(true);
    const result = await addToCart(productId);
    setIsAdding(false);

    if (result.needsLogin) {
      navigate("/login", {
        state: {
          from: { pathname: window.location.pathname },
          message: "Faça login para adicionar ao carrinho",
        },
      });
      return;
    }

    if (result.success) {
      toast({
        title: "Produto adicionado ao carrinho! 🛒",
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar ao carrinho. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (inCart) {
    return (
      <Button
        size={size}
        disabled
        className={cn(
          "bg-green-600 text-white hover:bg-green-600 cursor-default",
          fullWidth && "w-full",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        ✅ Adicionado
      </Button>
    );
  }

  return (
    <Button
      size={size}
      variant="hero"
      className={cn(fullWidth && "w-full", className)}
      onClick={handleClick}
      disabled={isAdding}
    >
      {isAdding ? "A adicionar..." : "🛒 Adicionar ao Carrinho"}
    </Button>
  );
};

export default AddToCartButton;
