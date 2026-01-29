import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, Clock, Star, ChevronRight, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UserSidebar from "@/components/dashboard/UserSidebar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { products as mockProducts } from "@/data/mockData";

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
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favoritos</p>
                <p className="text-2xl font-bold">0</p>
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
                <p className="text-2xl font-bold">0</p>
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
                <Link to={`/produto/${product.id}`} key={product.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="aspect-square relative overflow-hidden">
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
                      <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-bold text-lg">
                          {formatPrice(product.price)} Kz
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span>Novo</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
