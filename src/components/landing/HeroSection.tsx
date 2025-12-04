import { useNavigate } from "react-router-dom";
import { ArrowRight, Store, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient">HojiVirtual</span>
            <br />
            <span className="text-foreground">O Seu Mercado Agora Online!</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Compre produtos locais de forma segura ou venda os seus produtos para toda Luanda. 
            Digitalizamos o mercado Hoji Ya Henda para si.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" onClick={() => navigate("/registo")} className="group">
              <Store className="w-5 h-5 mr-2" />
              Começar a Vender
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-hero" size="xl" onClick={() => navigate("/explorar")}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Explorar Produtos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Vendedores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">2.5k+</div>
              <div className="text-sm text-muted-foreground">Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">10k+</div>
              <div className="text-sm text-muted-foreground">Compradores</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="hidden lg:block absolute -bottom-10 left-10 animate-float">
          <div className="w-20 h-20 bg-card rounded-2xl shadow-card-hover flex items-center justify-center">
            <span className="text-4xl">🛍️</span>
          </div>
        </div>
        <div className="hidden lg:block absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 bg-card rounded-2xl shadow-card-hover flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-40 right-40 animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-14 h-14 bg-card rounded-2xl shadow-card-hover flex items-center justify-center">
            <span className="text-2xl">🏪</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
