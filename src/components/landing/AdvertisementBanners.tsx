import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdvertisementBanners = () => {
  return (
    <section className="px-7 mt-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {/* Banner Esquerdo - Multicaixa Express */}
          <div className="relative overflow-hidden rounded-[14px] min-h-[145px] bg-gradient-to-r from-[#1e3a5f] via-[#2563EB] to-[#3B82F6] p-5 flex flex-col justify-between">
            {/* Emoji decorativo */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[64px] opacity-20">
              💳
            </div>

            {/* Conteúdo */}
            <div className="relative z-10">
              {/* Pill Badge */}
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-white text-[9px] uppercase font-bold">💳 Método de Pagamento</span>
              </div>

              {/* Título */}
              <h3 className="text-white font-black text-[17px] mb-2 leading-tight">
                Paga com Multicaixa Express
              </h3>

              {/* Subtítulo */}
              <p className="text-white/80 text-[11px] mb-3 leading-relaxed max-w-xs">
                Pagamentos rápidos, seguros e sem complicações directamente no checkout do HojiVirtual.
              </p>

              {/* Botão CTA */}
              <Link to="/explorar">
                <Button className="bg-white text-[#1e3a5f] font-bold text-[11px] px-4 py-1 h-auto rounded-[7px] hover:bg-gray-100">
                  Comprar agora
                </Button>
              </Link>
            </div>

            {/* Rodapé */}
            <div className="relative z-10 flex items-center gap-2 mt-3 pt-3 border-t border-white/20">
              <span className="text-white/70 text-[10px]">Powered by</span>
              <span className="text-white text-[9px] font-bold bg-white/25 px-2 py-1 rounded-full">Multicaixa Express</span>
              <span className="text-white text-[9px] font-bold bg-white/25 px-2 py-1 rounded-full">Unitel Money</span>
            </div>
          </div>

          {/* Banner Direito - Tupuca & Mamboo */}
          <div className="relative overflow-hidden rounded-[14px] min-h-[145px] bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#10B981] p-5 flex flex-col justify-between">
            {/* Emoji decorativo */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[64px] opacity-20">
              🛵
            </div>

            {/* Conteúdo */}
            <div className="relative z-10">
              {/* Pill Badge */}
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-white text-[9px] uppercase font-bold">🛵 Serviço de Entrega</span>
              </div>

              {/* Título */}
              <h3 className="text-white font-black text-[17px] mb-2 leading-tight">
                Entrega via Tupuca & Mamboo
              </h3>

              {/* Subtítulo */}
              <p className="text-white/80 text-[11px] mb-3 leading-relaxed max-w-xs">
                Recebe os teus produtos em qualquer ponto de Luanda. Rápido, fiável e acessível.
              </p>


            </div>

            {/* Rodapé */}
            <div className="relative z-10 flex items-center gap-2 mt-3 pt-3 border-t border-white/20">
              <span className="text-white/70 text-[10px]">Parceiros de entrega</span>
              <span className="text-white text-[9px] font-bold bg-white/25 px-2 py-1 rounded-full">Tupuca</span>
              <span className="text-white text-[9px] font-bold bg-white/25 px-2 py-1 rounded-full">Mamboo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementBanners;
