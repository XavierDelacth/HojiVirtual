import { useState, useEffect } from "react";
import { Eye, ShoppingCart, DollarSign, Star, TrendingUp, TrendingDown, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  created_at: string;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [user]);

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Vendedor';

  // Mock weekly data (will be replaced with real data later)
  const weeklyData = [
    { day: 'Seg', vendas: 4 },
    { day: 'Ter', vendas: 3 },
    { day: 'Qua', vendas: 6 },
    { day: 'Qui', vendas: 8 },
    { day: 'Sex', vendas: 5 },
    { day: 'Sáb', vendas: 9 },
    { day: 'Dom', vendas: 7 },
  ];

  const stats = [
    {
      title: "Total de Produtos",
      value: products.length.toString(),
      change: 0,
      icon: Package,
      color: "text-trust",
      bgColor: "bg-trust/10",
    },
    {
      title: "Produtos Ativos",
      value: products.filter(p => p.stock > 0).length.toString(),
      change: 0,
      icon: ShoppingCart,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Em Estoque",
      value: products.reduce((acc, p) => acc + p.stock, 0).toString(),
      change: 0,
      icon: DollarSign,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Valor Total",
      value: `${formatPrice(products.reduce((acc, p) => acc + p.price * p.stock, 0))} Kz`,
      change: 0,
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const topProducts = products.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader title={`Olá, ${userName.split(' ')[0]}!`} />
        
        <main className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    {stat.change !== 0 && (
                      <div className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                        {stat.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{stat.change >= 0 ? '+' : ''}{stat.change}%</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sales Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Atividade dos Últimos 7 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar 
                        dataKey="vendas" 
                        fill="hsl(var(--primary))" 
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Produtos sem estoque</p>
                  <p className="text-2xl font-bold text-destructive">
                    {products.filter(p => p.stock === 0).length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Estoque baixo (&lt; 5)</p>
                  <p className="text-2xl font-bold text-secondary">
                    {products.filter(p => p.stock > 0 && p.stock < 5).length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Última atualização</p>
                  <p className="text-sm font-medium">
                    {products.length > 0 
                      ? new Date(products[0].created_at).toLocaleDateString('pt-AO')
                      : 'Nenhum produto'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Os Seus Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                </div>
              ) : topProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Produto</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Preço</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Estoque</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <span className="font-medium text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right text-sm">{formatPrice(product.price)} Kz</td>
                          <td className="py-4 text-right text-sm">
                            <span className={product.stock < 5 ? 'text-destructive' : ''}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-4 text-right text-sm font-medium text-primary">
                            {formatPrice(product.price * product.stock)} Kz
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Ainda não tem produtos adicionados.</p>
                  <p className="text-sm text-muted-foreground">Vá a "Produtos" para adicionar o seu primeiro produto.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
