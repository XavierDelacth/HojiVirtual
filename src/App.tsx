import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/comprovativo/:id" element={<Comprovativo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registo" element={<Registo />} />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/produtos" element={<ProtectedRoute><DashboardProducts /></ProtectedRoute>} />
            <Route path="/dashboard/gamificacao" element={<ProtectedRoute><DashboardGamification /></ProtectedRoute>} />
            <Route path="/dashboard/minha-loja" element={<ProtectedRoute><MinhaLoja /></ProtectedRoute>} />
            <Route path="/dashboard/qrcodes" element={<ProtectedRoute><QRCodes /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
            <Route path="/dashboard/configuracoes" element={<ProtectedRoute><DashboardConfiguracoes /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;