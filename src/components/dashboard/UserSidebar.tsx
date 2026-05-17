import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Home, ClipboardList, FileText, Settings, LogOut, Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard/utilizador" },
  { icon: ClipboardList, label: "Minhas Compras", path: "/dashboard/compras" },
  { icon: ShoppingCart, label: "Carrinho", path: "/carrinho", emoji: "🛒" },
  { icon: FileText, label: "Comprovativos", path: "/dashboard/comprovativos" },
];

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
      toast({ title: 'Sessão terminada', description: 'Você saiu com sucesso.' });
    } catch (err) {
      console.error('Logout error:', err);
      toast({ title: 'Erro ao sair', description: 'Ocorreu um erro inesperado.', variant: 'destructive' });
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HojiVirtual</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              {"emoji" in item && item.emoji ? (
                <span className="text-lg w-5 text-center">{item.emoji}</span>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <Link to="/dashboard/configuracoes" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full text-left">
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HojiVirtual</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-foreground/50 z-40" onClick={() => setMobileOpen(false)} />}

      <aside className={cn("lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300", mobileOpen ? "translate-x-0" : "-translate-x-full") }>
        <SidebarContent />
      </aside>

      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:flex flex-col z-40">
        <SidebarContent />
      </aside>

      <div className="lg:hidden h-16" />
    </>
  );
};

export default UserSidebar;
