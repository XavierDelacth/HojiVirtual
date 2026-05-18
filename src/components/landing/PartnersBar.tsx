const partners = [
  { name: "PREI", icon: "🏛️" },
  { name: "BAI", icon: "🏦" },
  { name: "BPC", icon: "💳" },
  { name: "Unitel Money", icon: "📱" },
  { name: "Multicaixa", icon: "💰" },
  { name: "Tupuca", icon: "🚗" },
];

const PartnersBar = () => {
  return (
    <section className="bg-[#f8f7f4] py-6 px-7 mt-6">
      <div className="container mx-auto">
        {/* Texto */}
        <div className="text-center mb-4">
          <p className="text-[11px] text-[#aaa] font-medium">
            Apoiado por instituições que promovem a formalização económica
          </p>
        </div>

        {/* Badges de parceiros */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white border border-[#f0ede8] rounded-lg px-4 py-2 flex items-center gap-2 hover:border-[#F97316] transition-colors"
            >
              <span className="text-[14px]">{partner.icon}</span>
              <span className="text-[11px] font-bold text-[#555]">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBar;
