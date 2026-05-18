import { useNavigate, Link } from "react-router-dom";
import { Heart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mockData";

const FeaturedProductsGrid = () => {
  const navigate = useNavigate();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-AO").format(price);
  };

  // Mock discounted prices for some products
  const getDiscountedPrice = (index: number): number | null => {
    if (index === 0) return 2900; // Primeiro produto tem desconto
    return null;
  };

  return (
    <section className="bg-[#f8f7f4] py-6 px-7 mt-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-bold text-gray-900">Produtos em Destaque</h2>
          <Link to="/explorar" className="text-[#F97316] text-[12px] font-semibold flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-4 gap-[10px] mb-6">
          {featuredProducts.map((product, index) => {
            const discountedPrice = getDiscountedPrice(index);
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/produto/${product.id}`)}
                className="bg-white rounded-lg overflow-hidden border border-[#f0ede8] hover:border-[#F97316] transition-all duration-300 cursor-pointer group"
              >
                {/* Área de imagem */}
                <div className="relative h-[130px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge Destaque */}
                  <div className="absolute top-2 left-2 bg-[#F97316] text-white text-[10px] font-bold px-2 py-1 rounded">
                    ★ Destaque
                  </div>

                  {/* Ícone coração */}
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="p-3">
                  {/* Vendedor */}
                  <div className="text-[10px] uppercase text-[#999] font-semibold mb-1">
                    {product.storeName}
                  </div>

                  {/* Nome */}
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Preço */}
                  <div className="mb-2">
                    <span className="text-[#F97316] font-bold text-[14px]">
                      {formatPrice(product.price)} Kz
                    </span>
                    {discountedPrice && (
                      <span className="text-[11px] text-gray-400 line-through ml-2">
                        {formatPrice(discountedPrice)} Kz
                      </span>
                    )}
                  </div>

                  {/* Avaliação */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-[11px] font-semibold text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Botão + */}
                  <div className="flex justify-end">
                    <button 
                      className="bg-[#F97316] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold hover:bg-[#C2410C] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão centrado */}
        <div className="flex justify-center">
          <Link to="/explorar">
            <Button className="bg-[#F97316] text-white font-bold px-7 py-2 rounded-lg hover:bg-[#C2410C] text-sm h-auto">
              Ver Todos os Produtos <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsGrid;
