import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Package, Upload, X } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  stock: number;
  is_active: boolean;
  seller_id: string;
  created_at: string;
}

const categories = [
  "Roupas",
  "Eletrônicos",
  "Acessórios",
  "Calçado",
  "Beleza",
  "Casa",
  "Alimentação",
  "Outros"
];

const DashboardProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Outros",
    images: [] as string[],
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

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
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "Outros",
      images: [],
    });
  };

  const handleAdd = async () => {
    if (!user) return;

    if (!formData.name.trim() || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        seller_id: user.id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
        category: formData.category,
        images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto.",
        variant: "destructive",
      });
      return;
    }

    setProducts(prev => [data, ...prev]);
    resetForm();
    setIsAddOpen(false);
    toast({
      title: "Produto adicionado!",
      description: "O seu produto foi adicionado e já está visível na página Explorar.",
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Erro",
        description: "Não foi possível eliminar o produto.",
        variant: "destructive",
      });
      return;
    }

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
      description: product.description || "",
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      images: product.images || [],
    });
  };

  const handleEdit = async () => {
    if (!editingProduct) return;
    
    const { data, error } = await supabase
      .from('products')
      .update({
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        images: formData.images.length > 0 ? formData.images : editingProduct.images,
      })
      .eq('id', editingProduct.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o produto.",
        variant: "destructive",
      });
      return;
    }

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? data : p));
    setEditingProduct(null);
    resetForm();
    toast({
      title: "Produto atualizado!",
      description: "As alterações foram guardadas.",
    });
  };

  const addImageUrl = () => {
    const url = prompt("Introduza o URL da imagem:");
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url.trim()]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const ProductForm = ({ onSubmit, submitLabel }: { onSubmit: () => void, submitLabel: string }) => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto *</Label>
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
      <div className="space-y-2">
        <Label>Categoria *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (Kz) *</Label>
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
      <div className="space-y-2">
        <Label>Imagens</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.images.map((img, index) => (
            <div key={index} className="relative group">
              <img src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
          <Upload className="w-4 h-4 mr-2" />
          Adicionar Imagem (URL)
        </Button>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => {
          setIsAddOpen(false);
          setEditingProduct(null);
          resetForm();
        }}>
          Cancelar
        </Button>
        <Button variant="hero" onClick={onSubmit}>{submitLabel}</Button>
      </DialogFooter>
    </div>
  );

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
                {products.length} produtos na sua loja
              </p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                </DialogHeader>
                <ProductForm onSubmit={handleAdd} submitLabel="Adicionar" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'}
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
                    <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
                      {product.category}
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
                      <Dialog 
                        open={editingProduct?.id === product.id} 
                        onOpenChange={(open) => !open && setEditingProduct(null)}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(product)}>
                            <Pencil className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Editar Produto</DialogTitle>
                          </DialogHeader>
                          <ProductForm onSubmit={handleEdit} submitLabel="Guardar" />
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
