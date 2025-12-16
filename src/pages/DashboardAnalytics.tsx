import { Helmet } from "react-helmet-async";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Eye, ShoppingCart, DollarSign, Users, Package, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const salesData = [
  { month: "Jan", vendas: 12, receita: 85000 },
  { month: "Fev", vendas: 19, receita: 125000 },
  { month: "Mar", vendas: 15, receita: 98000 },
  { month: "Abr", vendas: 28, receita: 178000 },
  { month: "Mai", vendas: 35, receita: 235000 },
  { month: "Jun", vendas: 42, receita: 298000 },
  { month: "Jul", vendas: 38, receita: 268000 },
  { month: "Ago", vendas: 45, receita: 320000 },
  { month: "Set", vendas: 52, receita: 385000 },
  { month: "Out", vendas: 48, receita: 345000 },
  { month: "Nov", vendas: 55, receita: 420000 },
  { month: "Dez", vendas: 62, receita: 485000 },
];

const categoryData = [
  { name: "Roupas", value: 35, color: "hsl(var(--primary))" },
  { name: "Eletrónicos", value: 25, color: "hsl(var(--secondary))" },
  { name: "Alimentos", value: 20, color: "hsl(var(--accent))" },
  { name: "Beleza", value: 12, color: "hsl(var(--muted))" },
  { name: "Artesanato", value: 8, color: "hsl(var(--destructive))" },
];

const topProducts = [
  { name: "Vestido Floral Vermelho", vendas: 45, receita: 382500 },
  { name: "Samsung Galaxy A14", vendas: 28, receita: 2380000 },
  { name: "Kit Maquilhagem Completo", vendas: 34, receita: 510000 },
  { name: "Power Bank 10.000mAh", vendas: 52, receita: 390000 },
  { name: "Máscara Africana Decorativa", vendas: 12, receita: 144000 },
];

const DashboardAnalytics = () => {
  const [period, setPeriod] = useState("year");

  const stats = [
    { 
      title: "Visualizações Totais", 
      value: "12.458", 
      change: "+18%", 
      positive: true, 
      icon: Eye,
      description: "vs. período anterior"
    },
    { 
      title: "Vendas Realizadas", 
      value: "451", 
      change: "+24%", 
      positive: true, 
      icon: ShoppingCart,
      description: "vs. período anterior"
    },
    { 
      title: "Receita Total", 
      value: "3.242.000 Kz", 
      change: "+32%", 
      positive: true, 
      icon: DollarSign,
      description: "vs. período anterior"
    },
    { 
      title: "Clientes Únicos", 
      value: "324", 
      change: "+12%", 
      positive: true, 
      icon: Users,
      description: "vs. período anterior"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics | HojiVirtual Dashboard</title>
        <meta name="description" content="Análise detalhada de vendas e desempenho da sua loja" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        
        <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analytics</h1>
                <p className="text-muted-foreground">Acompanhe o desempenho da sua loja</p>
              </div>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
                        {stat.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Vendas ao Longo do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="vendas" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary) / 0.2)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Receita Mensal (Kz)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                          formatter={(value: number) => [`${value.toLocaleString()} Kz`, "Receita"]}
                        />
                        <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.vendas} vendas</p>
                          </div>
                        </div>
                        <p className="font-semibold text-foreground">{product.receita.toLocaleString()} Kz</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Métricas de Desempenho
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold text-primary">4.8</p>
                    <p className="text-sm text-muted-foreground">Avaliação Média</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold text-primary">98%</p>
                    <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold text-primary">2.3h</p>
                    <p className="text-sm text-muted-foreground">Tempo Médio de Resposta</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold text-primary">89%</p>
                    <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardAnalytics;
