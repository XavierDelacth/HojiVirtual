import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const Registo = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, type: 'vendor' | 'buyer') => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As palavras-passe não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Erro",
        description: "Deve aceitar os termos de uso",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso!",
        description: type === 'vendor' 
          ? "Bem-vindo ao HojiVirtual! Configure a sua loja." 
          : "Bem-vindo ao HojiVirtual!",
      });
      navigate(type === 'vendor' ? "/dashboard" : "/explorar");
    }, 1000);
  };

  const FormFields = ({ type }: { type: 'vendor' | 'buyer' }) => (
    <form onSubmit={(e) => handleSubmit(e, type)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${type}-name`}>Nome Completo</Label>
        <Input
          id={`${type}-name`}
          name="name"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={handleChange}
          className="h-12"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-email`}>Email</Label>
        <Input
          id={`${type}-email`}
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          className="h-12"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-phone`}>Telefone</Label>
        <div className="flex gap-2">
          <div className="w-24 h-12 border rounded-lg flex items-center justify-center bg-muted text-sm font-medium">
            +244
          </div>
          <Input
            id={`${type}-phone`}
            name="phone"
            type="tel"
            placeholder="923 456 789"
            value={formData.phone}
            onChange={handleChange}
            className="h-12 flex-1"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-password`}>Palavra-passe</Label>
        <div className="relative">
          <Input
            id={`${type}-password`}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="h-12 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-confirmPassword`}>Confirmar Palavra-passe</Label>
        <div className="relative">
          <Input
            id={`${type}-confirmPassword`}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="h-12 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox 
          id={`${type}-terms`}
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
        />
        <Label htmlFor={`${type}-terms`} className="text-sm cursor-pointer leading-relaxed">
          Aceito os{" "}
          <a href="#" className="text-primary hover:underline">Termos de Uso</a>
          {" "}e a{" "}
          <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
        </Label>
      </div>

      <Button variant="hero" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "A criar conta..." : `Criar Conta de ${type === 'vendor' ? 'Vendedor' : 'Comprador'}`}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
          alt="Mercado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-background">
          <h2 className="text-4xl font-bold mb-4">
            Junte-se ao HojiVirtual
          </h2>
          <p className="text-lg text-background/80 max-w-md">
            Crie a sua conta e comece a vender ou comprar os melhores produtos
            do mercado Hoji Ya Henda.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">HojiVirtual</span>
          </Link>

          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">Criar uma conta</CardTitle>
              <CardDescription>
                Escolha o tipo de conta que deseja criar
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Tabs defaultValue="vendor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="vendor" className="gap-2">
                    <Store className="w-4 h-4" />
                    Vendedor
                  </TabsTrigger>
                  <TabsTrigger value="buyer" className="gap-2">
                    <User className="w-4 h-4" />
                    Comprador
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="vendor">
                  <FormFields type="vendor" />
                </TabsContent>
                <TabsContent value="buyer">
                  <FormFields type="buyer" />
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Já tem conta?{" "}
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    Entrar
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registo;
