import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { products as mockProducts } from "@/data/mockData";
import { useProducts } from "@/hooks/useProducts";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

const categories = [
  "Roupas",
  "Eletrônicos",
  "Acessórios",
  "Calçado",
  "Beleza",
  "Casa",
  "Alimentação",
  "Artesanato",
  "Livros",
  "Desporto",
  "Outros"
];

const Explorar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // 🎯 Usar hook de produtos para combinar mockados + dinâmicos
  const { allProducts } = useProducts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  useEffect(() => {
    // 🔄 Atualizar produtos sempre que allProducts mudar
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(allProducts);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [allProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Explorar <span className="text-gradient">Produtos</span>
            </h1>
            <p className="text-muted-foreground">
              Descubra os melhores produtos do mercado Hoji Ya Henda
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Busque por produtos ou categorias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1 px-3 py-1">
                  {category}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleCategory(category)} 
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCategories([])}
                className="text-destructive hover:text-destructive"
              >
                Limpar filtros
              </Button>
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                <h3 className="font-semibold mb-4">Categorias</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="cursor-pointer text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 animate-slide-up max-h-[70vh] overflow-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Filtros</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <h4 className="font-medium mb-3">Categorias</h4>
                  <div className="space-y-3 mb-6">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`mobile-${category}`} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button variant="hero" className="w-full" onClick={() => setShowFilters(false)}>
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredProducts.length} produtos
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                          <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
                            {product.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
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
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || selectedCategories.length > 0
                      ? "Tente ajustar os filtros ou buscar por outro termo"
                      : "Os vendedores ainda não adicionaram produtos"
                    }
                  </p>
                  {(searchQuery || selectedCategories.length > 0) && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategories([]);
                      }}
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explorar;
