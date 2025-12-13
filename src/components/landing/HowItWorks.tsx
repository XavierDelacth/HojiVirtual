import { Store, Package, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Store,
    emoji: "📱",
    title: "Crie a Sua Loja",
    description: "Registe-se gratuitamente e configure a sua loja virtual em poucos minutos. Sem complicações!",
    color: "primary"
  },
  {
    icon: Package,
    emoji: "🛍️",
    title: "Adicione Produtos",
    description: "Tire fotos dos seus produtos, defina preços e escreva descrições simples. Tudo muito fácil!",
    color: "secondary"
  },
  {
    icon: TrendingUp,
    emoji: "📊",
    title: "Venda e Cresça",
    description: "Receba pagamentos digitais, acompanhe as suas vendas e veja o seu negócio crescer.",
    color: "accent"
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comece a vender online em 3 passos simples
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <Card hover className="text-center h-full">
                <CardContent className="pt-8 pb-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-md">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-5xl">{step.emoji}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
