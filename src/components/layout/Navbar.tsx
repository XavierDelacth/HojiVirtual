import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">HojiVirtual</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/explorar" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Explorar
            </Link>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Como Funciona
            </button>
            {/* <button
              onClick={() => scrollToSection("modelo-comissoes")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Modelo de Comissões
            </button> */}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/registo")}>
              Começar a Vender
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link
                to="/explorar"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Explorar
              </Link>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("modelo-comissoes")}
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left"
              >
                Modelo de Comissões
              </button>
              <div className="border-t border-border pt-3 mt-2 flex flex-col gap-2">
                <Button variant="ghost" className="w-full justify-center" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
                <Button variant="hero" className="w-full justify-center" onClick={() => navigate("/registo")}>
                  Começar a Vender
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
