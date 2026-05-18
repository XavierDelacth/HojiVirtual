import { Link } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { stores } from "@/data/mockData";

const FeaturedStoresGrid = () => {
  const featuredStores = stores.slice(0, 4);

  return (
    <section className="bg-[#f8f7f4] py-6 px-7 mt-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-bold text-gray-900">
            Lojas <span className="text-[#F97316]">Registadas</span>
          </h2>
          <Link to="/explorar" className="text-[#F97316] text-[12px] font-semibold flex items-center gap-1 hover:underline">
            Ver todas <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Subtítulo */}
        <p className="text-[12px] text-[#999] mb-4">
          Conheça algumas das lojas que já fazem parte do HojiVirtual
        </p>

        {/* Grid de lojas */}
        <div className="grid grid-cols-4 gap-[10px]">
          {featuredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg overflow-hidden border border-[#f0ede8] hover:border-[#F97316] transition-all duration-300 cursor-pointer group"
            >
              {/* Capa da loja */}
              <div className="relative h-[100px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge Verificada */}
                {store.verified && (
                  <div className="absolute top-2 right-2 bg-[#16A34A] text-white text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    ✓ Verificada
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-3">
                {/* Nome da loja */}
                <h3 className="text-[13px] font-bold text-gray-900 truncate">
                  {store.name}
                </h3>

                {/* Categoria */}
                <p className="text-[10px] text-[#F97316] font-semibold mb-2">
                  {store.category}
                </p>

                {/* Localização */}
                <div className="flex items-center gap-1 text-[10px] text-[#999] mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{store.location}</span>
                </div>

                {/* Avaliação */}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[11px] font-semibold text-gray-900">
                    {store.rating}
                  </span>
                  <span className="text-[9px] text-gray-500">
                    ({store.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoresGrid;
