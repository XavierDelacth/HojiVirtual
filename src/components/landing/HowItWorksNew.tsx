const steps = [
  {
    emoji: "📱",
    title: "Crie a Sua Loja",
    description: "Registe-se gratuitamente e configure a sua loja virtual em poucos minutos. Sem complicações!"
  },
  {
    emoji: "🛍️",
    title: "Adicione Produtos",
    description: "Tire fotos dos seus produtos, defina preços e escreva descrições simples. Tudo muito fácil!"
  },
  {
    emoji: "📊",
    title: "Venda e Cresça",
    description: "Receba pagamentos digitais, acompanhe as suas vendas e veja o seu negócio crescer."
  }
];

const HowItWorksNew = () => {
  return (
    <section className="bg-white py-6 px-7 mt-6">
      <div className="container mx-auto">
        {/* Título */}
        <div className="text-center mb-6">
          <h2 className="text-[17px] font-black text-gray-900">
            Como <span className="text-[#F97316]">Funciona</span>
          </h2>
          <p className="text-[12px] text-[#999] mt-1">
            Comece a vender online em 3 passos simples
          </p>
        </div>

        {/* Grid de passos */}
        <div className="grid grid-cols-3 gap-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative border border-[#f0ede8] rounded-[12px] p-5 pt-8 text-center bg-white"
            >
              {/* Número badge - position absolute no topo */}
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center text-[13px] font-bold">
                {index + 1}
              </div>

              {/* Ícone */}
              <div className="w-[54px] h-[54px] mx-auto mb-3 rounded-[12px] bg-[#FFF7ED] flex items-center justify-center text-[26px]">
                {step.emoji}
              </div>

              {/* Título */}
              <h3 className="text-[13px] font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Descrição */}
              <p className="text-[11px] text-[#888] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksNew;
