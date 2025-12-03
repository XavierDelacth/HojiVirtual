const partners = [
  { name: "PREI", logo: "🏛️" },
  { name: "BAI", logo: "🏦" },
  { name: "BPC", logo: "💳" },
  { name: "Unitel Money", logo: "📱" },
  { name: "Multicaixa", logo: "💰" },
  { name: "Tupuca", logo: "🚗" },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-muted-foreground font-medium">
            Apoiado por instituições que promovem a formalização económica
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-6 py-3 bg-card rounded-xl shadow-sm hover:shadow-card transition-shadow"
            >
              <span className="text-2xl">{partner.logo}</span>
              <span className="font-semibold text-muted-foreground">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
