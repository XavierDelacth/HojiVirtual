import { useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { products as initialProducts, Product } from "@/data/mockData";

const DashboardProducts = () => {
  const [products, setProducts] = useState(initialProducts.filter(p => p.storeId === "1"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      storeId: "1",
      storeName: "Boutique Kianda",
      category: "Roupas",
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"],
      rating: 0,
      reviewCount: 0,
      featured: false,
    };
    
    setProducts(prev => [...prev, newProduct]);
    setFormData({ name: "", description: "", price: "", stock: "" });
    setIsAddOpen(false);
    toast({
      title: "Produto adicionado!",
      description: "O seu produto foi adicionado com sucesso.",
    });
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Produto eliminado",
      description: "O produto foi removido da sua loja.",
    });
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
    });
  };

  const handleEdit = () => {
    if (!editingProduct) return;
    
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
        : p
    ));
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", stock: "" });
    toast({
      title: "Produto atualizado!",
      description: "As alterações foram guardadas.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader title="Produtos" />
        
        <main className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-muted-foreground">
                {products.length}/7 produtos usados (Plano Premium)
              </p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ex: Vestido Floral"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Descreva o seu produto..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (Kz)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Estoque</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
                  <Button variant="hero" onClick={handleAdd}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-3 right-3 ${
                        product.stock > 0 ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {product.stock > 0 ? 'Ativo' : 'Esgotado'}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                    <p className="text-primary font-bold text-lg mb-2">
                      {formatPrice(product.price)} Kz
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Estoque: {product.stock} unidades
                    </p>
                    <div className="flex gap-2">
                      <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(product)}>
                            <Pencil className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Produto</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Nome do Produto</Label>
                              <Input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Descrição</Label>
                              <Textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-price">Preço (Kz)</Label>
                                <Input
                                  id="edit-price"
                                  name="price"
                                  type="number"
                                  value={formData.price}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-stock">Estoque</Label>
                                <Input
                                  id="edit-stock"
                                  name="stock"
                                  type="number"
                                  value={formData.stock}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                            <Button variant="hero" onClick={handleEdit}>Guardar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ainda não tem produtos</h3>
              <p className="text-muted-foreground mb-6">
                Comece a adicionar produtos à sua loja agora!
              </p>
              <Button variant="hero" onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Produto
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardProducts;
