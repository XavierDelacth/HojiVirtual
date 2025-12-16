import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  QrCode, 
  BarChart3, 
  Trophy, 
  Settings, 
  LogOut,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Store, label: "Minha Loja", path: "/dashboard/minha-loja" },
  { icon: Package, label: "Produtos", path: "/dashboard/produtos" },
  { icon: QrCode, label: "QR Codes", path: "/dashboard/qrcodes" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Trophy, label: "Gamificação", path: "/dashboard/gamificacao" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HojiVirtual</span>
        </Link>
      </div>

      {/* Plan Badge */}
      <div className="p-4">
        <Badge className="w-full justify-center py-1.5 gradient-primary text-primary-foreground">
          Plano Premium
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          to="/dashboard/configuracoes"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </Link>
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HojiVirtual</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:flex flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default DashboardSidebar;
