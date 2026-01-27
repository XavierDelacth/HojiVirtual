import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import ProductDetails from "./pages/ProductDetails";
import Comprovativo from "./pages/Comprovativo";
import Login from "./pages/Login";
import Registo from "./pages/Registo";
import UserDashboard from "./pages/UserDashboard";
import SellerDashboard from "./pages/SellerDashboard";
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
        <AuthProvider>
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
              
              {/* User dashboard (normal users) */}
              <Route path="/dashboard/utilizador" element={
                <RoleBasedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </RoleBasedRoute>
              } />
              
              {/* Seller dashboard routes */}
              <Route path="/dashboard/vendedor" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <SellerDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <Dashboard />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/produtos" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <DashboardProducts />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/gamificacao" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <DashboardGamification />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/minha-loja" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <MinhaLoja />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/qrcodes" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <QRCodes />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <DashboardAnalytics />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/configuracoes" element={
                <RoleBasedRoute allowedRoles={['seller']}>
                  <DashboardConfiguracoes />
                </RoleBasedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
