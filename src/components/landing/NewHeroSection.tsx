import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#7C2D12] via-[#C2410C] to-[#F97316] text-white py-16 px-4 sm:px-6 lg:px-7">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
          {/* Conteúdo à esquerda */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1 mb-6 w-fit px-4 py-2 rounded-full bg-white/20 border border-white/30 text-xs sm:text-sm">
              <span className="text-white text-sm font-medium">
                Mercado Hoji Ya Henda · Digital
              </span>
            </div>

            {/* Título */}
            <h1 className="text-white font-black text-3xl sm:text-4xl md:text-[46px] leading-tight mb-4 max-w-2xl">
              O mercado que conheces, agora na palma da mão
            </h1>

            {/* Parágrafo */}
            <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed max-w-xl md:max-w-2xl">
              Compre dos melhores vendedores de Luanda. Entrega rápida via Tupuca e Mamboo.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:w-full">
              <Button
                onClick={() => navigate("/explorar")}
                className="w-full sm:w-auto bg-white text-[#C2410C] font-bold px-6 py-3 text-sm rounded-lg hover:bg-gray-100"
              >
                Explorar produtos
              </Button>
              <Button
                onClick={() => navigate("/registo")}
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-6 py-3 text-sm rounded-lg hover:bg-white/10"
              >
                Vender aqui <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Stats à direita */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            {[
              { value: "+2.4k", label: "Vendedores" },
              { value: "18k", label: "Produtos" },
              { value: "340", label: "Agentes" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-4 rounded-[14px] bg-white/15 backdrop-blur-sm min-w-[160px]">
                <div className="text-white font-bold text-2xl sm:text-[26px]">{stat.value}</div>
                <div className="text-white/70 text-sm sm:text-[13px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
