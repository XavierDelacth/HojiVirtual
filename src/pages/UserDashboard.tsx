import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, ShoppingCart, Clock, Star, ChevronRight, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UserSidebar from "@/components/dashboard/UserSidebar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { products as mockProducts } from "@/data/mockData";
import AddToCartButton from "@/components/products/AddToCartButton";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  stock: number;
  seller_id: string;
}

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentPurchasesCount, setRecentPurchasesCount] = useState(0);
  const [isLoadingRecentPurchases, setIsLoadingRecentPurchases] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  useEffect(() => {
    // Use mock products for local development/demo
    setIsLoading(true);
    const t = setTimeout(() => {
      setProducts(mockProducts.slice(0, 12) as Product[]);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!user) {
      setRecentPurchasesCount(0);
      setIsLoadingRecentPurchases(false);
      return;
    }

    const fetchRecentPurchasesCount = async () => {
      setIsLoadingRecentPurchases(true);

      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      const cutoffMs = tenDaysAgo.getTime();
      const seenIds = new Set<string>();
      let total = 0;

      const addPurchase = (id: string, createdAt?: string | null) => {
        const key = String(id);
        if (seenIds.has(key)) return;
        const ts = createdAt ? new Date(createdAt).getTime() : Date.now();
        if (ts < cutoffMs) return;
        seenIds.add(key);
        total += 1;
      };

      const { data, error } = await supabase
        .from("purchases")
        .select("id, created_at")
        .eq("buyer_id", user.id)
        .gte("created_at", tenDaysAgo.toISOString());

      if (error) {
        console.error("Erro ao contar compras recentes:", error);
      } else {
        data?.forEach((p) => addPurchase(p.id, p.created_at));
      }

      try {
        const localPurchases = JSON.parse(
          localStorage.getItem("hoji_purchases") || "[]"
        ) as Array<{ id: string; buyer_id?: string; created_at?: string }>;
        localPurchases
          .filter((p) => p.buyer_id === user.id)
          .forEach((p) => addPurchase(p.id, p.created_at));
      } catch (e) {
        console.error("Erro ao ler compras locais:", e);
      }

      setRecentPurchasesCount(total);
      setIsLoadingRecentPurchases(false);
    };

    fetchRecentPurchasesCount();

    const channel = supabase
      .channel(`recent-purchases-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "purchases",
          filter: `buyer_id=eq.${user.id}`,
        },
        () => {
          fetchRecentPurchasesCount();
        }
      )
      .subscribe();

    const onPurchaseCompleted = () => fetchRecentPurchasesCount();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "hoji_purchases") fetchRecentPurchasesCount();
    };
    const onFocus = () => fetchRecentPurchasesCount();

    window.addEventListener("hoji-purchase-completed", onPurchaseCompleted);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("hoji-purchase-completed", onPurchaseCompleted);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Utilizador';

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <div className="lg:ml-64">
        <main className="p-4 lg:p-8 container mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Olá, {userName.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Explore os melhores produtos do mercado Hoji Ya Henda
            </p>
          </div>
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center"
              onClick={async () => {
                try {
                  await signOut();
                } catch (e) {
                  console.error('Sign out error', e);
                }
                navigate('/');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produtos Disponíveis</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card onClick={() => navigate('/carrinho')} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carrinho</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compras Recentes</p>
                <p className="text-2xl font-bold">
                  {isLoadingRecentPurchases ? "..." : recentPurchasesCount}
                </p>
                <p className="text-xs text-muted-foreground">nos últimos 10 dias</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Produtos em Destaque</h2>
            <Link to="/explorar">
              <Button variant="ghost" className="gap-2">
                Ver Todos
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div
                    className="aspect-square relative overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/produto/${product.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/produto/${product.id}`)}
                  >
                      <img
                        src={product.images[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock < 5 && product.stock > 0 && (
                        <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                          Últimas unidades
                        </Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          Esgotado
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3
                        className="font-semibold mb-2 line-clamp-1 cursor-pointer hover:text-primary"
                        onClick={() => navigate(`/produto/${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-primary font-bold text-lg mb-3">
                        {formatPrice(product.price)} Kz
                      </p>
                      <AddToCartButton productId={product.id} fullWidth />
                    </CardContent>
                  </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Tente pesquisar por outro termo" 
                  : "Os vendedores ainda não adicionaram produtos"
                }
              </p>
              <Link to="/explorar">
                <Button variant="hero">Explorar Mercado</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Quer vender os seus produtos?</h2>
            <p className="mb-4 opacity-90">
              Torne-se vendedor e alcance milhares de clientes no HojiVirtual
            </p>
            <Link to="/registo">
              <Button variant="secondary" size="lg">
                Criar Conta de Vendedor
              </Button>
            </Link>
          </CardContent>
        </Card>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
