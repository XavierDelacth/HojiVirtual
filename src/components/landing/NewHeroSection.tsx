import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#7C2D12] via-[#C2410C] to-[#F97316] text-white py-16 px-7">
      <div className="container mx-auto">
        <div className="flex flex-row gap-12 items-stretch">
          {/* Conteúdo à esquerda */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1 mb-6 w-fit px-5 py-2 rounded-full bg-white/20 border border-white/30">
              <span className="text-white text-sm font-medium">
                Mercado Hoji Ya Henda · Digital
              </span>
            </div>

            {/* Título */}
            <h1 className="text-white font-black text-[28px] leading-tight mb-4">
              O mercado que conheces, agora na palma da mão
            </h1>

            {/* Parágrafo */}
            <p className="text-white/80 text-[13px] mb-6 leading-relaxed max-w-lg">
              Compre dos melhores vendedores de Luanda. Entrega rápida via Tupuca e Mamboo.
            </p>

            {/* Botões */}
            <div className="flex gap-4 w-fit">
              <Button
                onClick={() => navigate("/explorar")}
                className="bg-white text-[#C2410C] font-bold px-6 py-2 h-auto text-sm rounded-lg hover:bg-gray-100"
              >
                Explorar produtos
              </Button>
              <Button
                onClick={() => navigate("/registo")}
                className="bg-transparent border-2 border-white text-white font-bold px-6 py-2 h-auto text-sm rounded-lg hover:bg-white/10"
              >
                Vender aqui <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Stats à direita */}
          <div className="flex flex-col gap-3 justify-center">
            {/* Card 1 */}
            <div className="px-[18px] py-[10px] rounded-[10px] bg-white/15 backdrop-blur-sm">
              <div className="text-white font-bold text-[22px]">+2.4k</div>
              <div className="text-white/70 text-[10px]">Vendedores</div>
            </div>

            {/* Card 2 */}
            <div className="px-[18px] py-[10px] rounded-[10px] bg-white/15 backdrop-blur-sm">
              <div className="text-white font-bold text-[22px]">18k</div>
              <div className="text-white/70 text-[10px]">Produtos</div>
            </div>

            {/* Card 3 */}
            <div className="px-[18px] py-[10px] rounded-[10px] bg-white/15 backdrop-blur-sm">
              <div className="text-white font-bold text-[22px]">340</div>
              <div className="text-white/70 text-[10px]">Agentes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
