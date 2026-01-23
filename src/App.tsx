import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import ProductDetails from "./pages/ProductDetails";
import Comprovativo from "./pages/Comprovativo";
import Login from "./pages/Login";
import Registo from "./pages/Registo";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardGamification from "./pages/DashboardGamification";
import MinhaLoja from "./pages/MinhaLoja";
import QRCodes from "./pages/QRCodes";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardConfiguracoes from "./pages/DashboardConfiguracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/comprovativo/:id" element={<Comprovativo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registo" element={<Registo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/produtos" element={<DashboardProducts />} />
            <Route path="/dashboard/gamificacao" element={<DashboardGamification />} />
            <Route path="/dashboard/minha-loja" element={<MinhaLoja />} />
            <Route path="/dashboard/qrcodes" element={<QRCodes />} />
            <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
            <Route path="/dashboard/configuracoes" element={<DashboardConfiguracoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
