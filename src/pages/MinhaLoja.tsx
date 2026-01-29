import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import EditProfileModal from "@/components/dashboard/EditProfileModal";
import AddProductModal from "@/components/dashboard/AddProductModal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { 
  Store, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  Package, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  Edit,
  Plus,
  Loader2
} from "lucide-react";
import { products } from "@/data/mockData";

interface ProfileData {
  name: string | null;
  store_name: string | null;
  store_description: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  accountHolder?: string | null;
  bankName?: string | null;
  iban?: string | null;
}

interface ProductStoreData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isDynamic: true;
  sellerId?: string;
}

const MinhaLinha = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [storeProducts, setStoreProducts] = useState<ProductStoreData[]>([]);

  // 🎯 Usar hooks para autenticação e produtos globais
  const { user } = useAuth();
  const { getStoreProducts, addProduct, removeProduct } = useProducts();

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erro ao carregar perfil');
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🎯 Carregar produtos da loja quando profile mudar
  useEffect(() => {
    if (user && profile) {
      // Gerar storeId baseado no user ID completo (consistente com handleAddProduct)
      const storeId = `store_${user.id}`;
      
      // Obter produtos da loja do contexto global
      const storeProds = getStoreProducts(storeId) as ProductStoreData[];
      setStoreProducts(storeProds);
      
      console.log(`📦 Carregados ${storeProds.length} produtos da loja ${storeId}`);
    }
  }, [user, profile, getStoreProducts]);

  // 🛍️ Handler para adicionar novo produto
  const handleAddProduct = (formData: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }) => {
    if (!user || !profile) {
      toast.error('Erro: Não foi possível identificar o utilizador');
      return;
    }
    const storeId = `store_${user.id}`;
    const storeName = profile.store_name || "Minha Loja";

    // Criar novo produto com ID único
    const newProduct: ProductStoreData = {
      id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      category: formData.category,
      // Imagens placeholder - pode ser melhorado depois
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
      ],
      storeId: storeId,
      storeName: storeName,
      sellerId: user.id,
      rating: 5,
      reviewCount: 0,
      featured: false,
      isDynamic: true
    };

    // Adicionar ao contexto global
    addProduct(newProduct);

    // Atualizar lista local
    setStoreProducts([...storeProducts, newProduct]);

    toast.success(`✅ Produto "${formData.name}" criado com sucesso!`);
    console.log(`✅ Novo produto adicionado: ${newProduct.id}`);
  };

  // Use profile data or fallback to defaults
  const storeData = {
    name: profile?.store_name || "Minha Loja",
    description: profile?.store_description || profile?.bio || "Adicione uma descrição para sua loja.",
    location: profile?.location || "Adicione sua localização",
    phone: profile?.phone || "Adicione seu telefone",
    email: profile?.email || "Adicione seu email",
    hours: "08:00 - 18:00",
    rating: 4.8,
    totalSales: 0,
    totalRevenue: 0,
    verified: false,
    avatar_url: profile?.avatar_url
  };

  // Mock statistics (can be replaced with real data later)
  const stats = {
    totalProducts: storeProducts.length,
    activeSales: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    avgRating: 0,
    totalCustomers: 0
  };

  // Mock sales data for chart representation
  const recentSales = [
    { month: "Jan", value: 0 },
    { month: "Fev", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Abr", value: 0 },
    { month: "Mai", value: 0 },
    { month: "Jun", value: 0 }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Helmet>
        <title>Minha Linha | HojiVirtual</title>
        <meta name="description" content="Gerencie sua loja, produtos e estatísticas de vendas no HojiVirtual" />
      </Helmet>

      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 lg:ml-64 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Minha Linha</h1>
              <p className="text-muted-foreground">Gerencie sua loja, produtos e acompanhe suas vendas</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setEditProfileOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>

          <Tabs defaultValue="perfil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="perfil">Perfil da Loja</TabsTrigger>
              <TabsTrigger value="produtos">Linha de Produtos</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            </TabsList>

            {/* Perfil da Loja */}
            <TabsContent value="perfil" className="space-y-6 animate-fade-in">
              {isLoading ? (
                <Card className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </Card>
              ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {storeData.avatar_url ? (
                        <img 
                          src={storeData.avatar_url} 
                          alt={storeData.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Store className="w-10 h-10 text-primary" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{storeData.name}</CardTitle>
                          {storeData.verified && (
                            <Badge className="bg-green-500 hover:bg-green-600">Verificado</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{storeData.rating}</span>
                          <span className="text-muted-foreground">({storeData.totalSales} vendas)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{storeData.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Localização</p>
                        <p className="font-medium">{storeData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Horário</p>
                        <p className="font-medium">{storeData.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{storeData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{storeData.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{stats.totalProducts}</p>
                      <p className="text-sm text-muted-foreground">Produtos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{storeData.totalSales}</p>
                      <p className="text-sm text-muted-foreground">Vendas Totais</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-500">{stats.totalCustomers}</p>
                      <p className="text-sm text-muted-foreground">Clientes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-500">{storeData.rating}</p>
                      <p className="text-sm text-muted-foreground">Avaliação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              )}
            </TabsContent>

            {/* Linha de Produtos */}
            <TabsContent value="produtos" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Meus Produtos ({storeProducts.length})</h2>
                <Button variant="outline" onClick={() => setAddProductOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {storeProducts.length > 0 ? (
                  storeProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-muted relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                        {product.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      <p className="text-lg font-bold text-primary mt-1">
                        {product.price.toLocaleString('pt-AO')} Kz
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviewCount} avaliações)</span>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                ) : (
                  <Card className="col-span-full flex items-center justify-center py-12">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">Ainda não tem produtos. Adicione o primeiro!</p>
                      <Button onClick={() => setAddProductOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Produto
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Estatísticas */}
            <TabsContent value="estatisticas" className="space-y-6 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Mensal</p>
                        <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString('pt-AO')} Kz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/10 rounded-full">
                        <ShoppingCart className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pedidos do Mês</p>
                        <p className="text-2xl font-bold">{stats.monthlyOrders}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-full">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Clientes</p>
                        <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-yellow-500/10 rounded-full">
                        <Star className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avaliação Média</p>
                        <p className="text-2xl font-bold">{stats.avgRating}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Evolução de Vendas (Últimos 6 meses)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {recentSales.map((sale, index) => {
                      const maxValue = Math.max(...recentSales.map(s => s.value));
                      const height = (sale.value / maxValue) * 100;
                      return (
                        <div key={sale.month} className="flex-1 flex flex-col items-center gap-2">
                          <div 
                            className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-muted-foreground">{sale.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {storeProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <span className="text-lg font-bold text-muted-foreground w-6">#{index + 1}</span>
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{product.price.toLocaleString('pt-AO')} Kz</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 10} vendas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modals */}
      <EditProfileModal
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        onSave={() => {
          fetchProfile();
          toast.success("Perfil atualizado com sucesso!");
        }}
      />

      <AddProductModal
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default MinhaLinha;
