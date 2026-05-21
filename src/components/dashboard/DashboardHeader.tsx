import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const [notifications] = useState(3);

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 lg:px-8">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden mr-2">
            
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full">
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient">HojiVirtual</span>
              </Link>
            </div>
            


            {/* Mobile Nav Links */}
            <nav className="p-4 space-y-1">
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                Dashboard
              </Link>
              <Link to="/dashboard/loja" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                Minha Loja
              </Link>
              <Link to="/dashboard/produtos" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                Produtos
              </Link>
              <Link to="/dashboard/qrcodes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                QR Codes
              </Link>
              <Link to="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                Analytics
              </Link>
              <Link to="/dashboard/gamificacao" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                Gamificação
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Title */}
      <h1 className="text-lg font-semibold flex-1">{title}</h1>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {notifications}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
