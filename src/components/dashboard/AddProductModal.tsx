import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus } from "lucide-react";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: ProductFormData) => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

const categories = [
  "Vestuário",
  "Alimentação",
  "Electrónicos",
  "Beleza",
  "Casa & Jardim",
  "Outros"
];

const AddProductModal = ({ open, onOpenChange, onAdd }: AddProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", description: "", price: 0, category: "", stock: 1 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Placeholder */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <ImagePlus className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Clique para adicionar imagens</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input
              id="productName"
              placeholder="Ex: Vestido Tradicional Angolano"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Descrição</Label>
            <Textarea
              id="productDescription"
              placeholder="Descreva o seu produto..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productPrice">Preço (Kz)</Label>
              <Input
                id="productPrice"
                type="number"
                min="0"
                placeholder="0"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productStock">Stock</Label>
              <Input
                id="productStock"
                type="number"
                min="1"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCategory">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Produto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
