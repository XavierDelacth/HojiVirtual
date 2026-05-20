import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

interface UserMenuProps {
  user: any;
  role?: string | null;
  onLogout: () => Promise<void>;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const UserMenu = ({ user, role, onLogout }: UserMenuProps) => {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fechar = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setAberto(false);
      }
    };

    document.addEventListener("mousedown", fechar);
    return () => document.removeEventListener("mousedown", fechar);
  }, []);

  const name =
    (user.user_metadata as any)?.name || user.email?.split("@")[0] || "Utilizador";
  const initials = getInitials(name);
  const email = user.email || "sem email";
  const avatarSrc =
    (user.user_metadata as any)?.avatar_url ||
    (user.user_metadata as any)?.picture ||
    (user as any).avatar ||
    (user as any).photoURL ||
    null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
        onClick={() => setAberto(!aberto)}
        aria-label="Abrir menu do utilizador"
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </button>

      {aberto && (
        <div className="absolute right-0 top-12 z-50 min-w-[200px] overflow-hidden rounded-xl border border-[#f0ede8] bg-white shadow-lg">
          <div className="border-b border-[#f0ede8] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center overflow-hidden">
                {avatarSrc ? (
                  <img src={avatarSrc} alt={name} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{name}</p>
                <p className="text-xs text-[#999] truncate">{email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Links de navegação */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 cursor-pointer text-left"
              onClick={() => {
                setAberto(false);
                navigate("/dashboard");
              }}
            >
              <span>🏪</span>
              O meu Dashboard
            </button>

            {role === "user" && (
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 cursor-pointer text-left"
                onClick={() => {
                  setAberto(false);
                  window.location.pathname = "/dashboard/compras";
                }}
              >
                <span>📦</span>
                Os meus Pedidos
              </button>
            )}

            <div className="border-t border-[#f0ede8] my-1" />

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer w-full text-left"
              onClick={async () => {
                setAberto(false);
                await onLogout();
              }}
            >
              <span>🚪</span>
              Terminar Sessão
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, signOut } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

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

  const showCartBadge = user && totalItems > 0;

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
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/explorar" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Explorar
            </Link>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Como Funciona
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserMenu user={user} role={role} onLogout={handleLogout} />
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}> 
                Entrar
              </Button>
            )}

            <button
              type="button"
              onClick={() => navigate("/carrinho")}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Carrinho"
            >
                <span className="text-xl">🛒</span>
                {showCartBadge && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

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
                to="/"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
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
                {user ? (
                  <>
                    <button
                      type="button"
                      className="text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      🏪 O meu Dashboard
                    </button>
                    {role === "user" && (
                      <button
                        type="button"
                        className="text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg"
                        onClick={() => {
                          navigate("/dashboard/compras");
                          setIsOpen(false);
                        }}
                      >
                        📦 Os meus Pedidos
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={async () => {
                        await handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      🚪 Terminar Sessão
                    </button>
                  </>
                ) : (
                  <Button variant="ghost" className="w-full justify-center" onClick={() => { navigate("/login"); setIsOpen(false); }}>
                    Entrar
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={() => {
                    navigate("/carrinho");
                    setIsOpen(false);
                  }}
                >
                  🛒 Carrinho
                  {showCartBadge && (
                    <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
                <Button variant="hero" className="w-full justify-center" onClick={() => { navigate("/registo"); setIsOpen(false); }}>
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
