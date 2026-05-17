import { Star, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/mockData";
import AddToCartButton from "@/components/products/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-AO").format(price);
  };

  return (
    <Card hover className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 gradient-primary text-primary-foreground">
            ⭐ Destaque
          </Badge>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Últimas unidades!
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">{product.storeName}</span>
            <BadgeCheck className="w-3.5 h-3.5 text-trust" />
          </div>

          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount} avaliações)
            </span>
          </div>

          <div className="mb-3">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">Kz</span>
          </div>

          <div className="flex flex-col gap-2">
            <AddToCartButton productId={product.id} fullWidth />
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/produto/${product.id}`)}
            >
              Ver
            </Button>
          </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
