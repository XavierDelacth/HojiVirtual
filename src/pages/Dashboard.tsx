import { Eye, ShoppingCart, DollarSign, Star, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser, vendorStats, products, reviews } from "@/data/mockData";

const Dashboard = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  const stats = [
    {
      title: "Visualizações",
      value: vendorStats.views.toLocaleString(),
      change: vendorStats.viewsChange,
      icon: Eye,
      color: "text-trust",
      bgColor: "bg-trust/10",
    },
    {
      title: "Vendas Este Mês",
      value: vendorStats.sales,
      change: vendorStats.salesChange,
      icon: ShoppingCart,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Receita",
      value: `${formatPrice(vendorStats.revenue)} Kz`,
      change: vendorStats.revenueChange,
      icon: DollarSign,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Avaliação Média",
      value: vendorStats.rating,
      change: vendorStats.ratingChange,
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const topProducts = products.slice(0, 5);
  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader title={`Olá, ${currentUser.name.split(' ')[0]}!`} />
        
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
                    <div className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {stat.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{stat.change >= 0 ? '+' : ''}{stat.change}%</span>
                    </div>
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
                <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorStats.weeklyData}>
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

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliações Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">{review.userName}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-secondary text-secondary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Produto</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Vendas</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Estoque</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={product.id} className="border-b border-border last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="font-medium text-sm">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right text-sm">{Math.floor(Math.random() * 50) + 10}</td>
                        <td className="py-4 text-right text-sm">
                          <span className={product.stock < 5 ? 'text-destructive' : ''}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 text-right text-sm font-medium text-primary">
                          {formatPrice(product.price * (Math.floor(Math.random() * 10) + 5))} Kz
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
