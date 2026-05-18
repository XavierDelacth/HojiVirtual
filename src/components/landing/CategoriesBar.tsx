import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Alimentação", emoji: "🍅" },
  { name: "Vestuário", emoji: "👗" },
  { name: "Electrónica", emoji: "🔌" },
  { name: "Casa", emoji: "🏠" },
  { name: "Beleza", emoji: "💄" },
  { name: "Calçado", emoji: "👟" },
  { name: "Infantil", emoji: "👶" },
  { name: "Serviços", emoji: "🛠️" },
];

const CategoriesBar = () => {
  return (
    <section className="bg-white py-6 px-7 mt-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-bold text-gray-900">Categorias</h2>
          <Link to="/explorar" className="text-[#F97316] text-[12px] font-semibold flex items-center gap-1 hover:underline">
            Ver todas <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-8 gap-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-[10px] rounded-[10px] bg-white border border-[#f0ede8] text-center cursor-pointer transition-all duration-300 hover:border-[#F97316] hover:bg-[#FFF7ED] group"
            >
              <div className="text-[24px] mb-1">{category.emoji}</div>
              <div className="text-[10px] text-[#666] group-hover:text-[#C2410C] font-medium transition-colors">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesBar;
