import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Registo = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent, type: 'vendor' | 'buyer') => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As palavras-passe não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A palavra-passe deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Erro",
        description: "Deve aceitar os termos de uso",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name.trim(),
          phone: phone.trim() ? `+244${phone.trim()}` : null,
          account_type: type,
        }
      }
    });

    setIsLoading(false);

    if (error) {
      let errorMessage = "Ocorreu um erro ao criar a conta.";
      
      if (error.message.includes("already registered")) {
        errorMessage = "Este email já está registado. Tente fazer login.";
      } else if (error.message.includes("Password")) {
        errorMessage = "A palavra-passe não cumpre os requisitos de segurança.";
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique o seu email para confirmar a conta.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: type === 'vendor' 
          ? "Bem-vindo ao HojiVirtual! Configure a sua loja." 
          : "Bem-vindo ao HojiVirtual!",
      });
    }
  };

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
                  <form onSubmit={(e) => handleSubmit(e, 'vendor')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">Nome Completo</Label>
                      <Input
                        id="vendor-name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-email">Email</Label>
                      <Input
                        id="vendor-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-phone">Telefone</Label>
                      <div className="flex gap-2">
                        <div className="w-24 h-12 border rounded-lg flex items-center justify-center bg-muted text-sm font-medium">
                          +244
                        </div>
                        <Input
                          id="vendor-phone"
                          type="tel"
                          placeholder="923 456 789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 flex-1"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-password">Palavra-passe</Label>
                      <div className="relative">
                        <Input
                          id="vendor-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pr-12"
                          required
                          autoComplete="new-password"
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
                      <Label htmlFor="vendor-confirmPassword">Confirmar Palavra-passe</Label>
                      <div className="relative">
                        <Input
                          id="vendor-confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-12 pr-12"
                          required
                          autoComplete="new-password"
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
                        id="vendor-terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <Label htmlFor="vendor-terms" className="text-sm cursor-pointer leading-relaxed">
                        Aceito os{" "}
                        <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                        {" "}e a{" "}
                        <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                      </Label>
                    </div>

                    <Button variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "A criar conta..." : "Criar Conta de Vendedor"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="buyer">
                  <form onSubmit={(e) => handleSubmit(e, 'buyer')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyer-name">Nome Completo</Label>
                      <Input
                        id="buyer-name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buyer-email">Email</Label>
                      <Input
                        id="buyer-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buyer-phone">Telefone</Label>
                      <div className="flex gap-2">
                        <div className="w-24 h-12 border rounded-lg flex items-center justify-center bg-muted text-sm font-medium">
                          +244
                        </div>
                        <Input
                          id="buyer-phone"
                          type="tel"
                          placeholder="923 456 789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 flex-1"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buyer-password">Palavra-passe</Label>
                      <div className="relative">
                        <Input
                          id="buyer-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pr-12"
                          required
                          autoComplete="new-password"
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
                      <Label htmlFor="buyer-confirmPassword">Confirmar Palavra-passe</Label>
                      <div className="relative">
                        <Input
                          id="buyer-confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-12 pr-12"
                          required
                          autoComplete="new-password"
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
                        id="buyer-terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <Label htmlFor="buyer-terms" className="text-sm cursor-pointer leading-relaxed">
                        Aceito os{" "}
                        <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                        {" "}e a{" "}
                        <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                      </Label>
                    </div>

                    <Button variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "A criar conta..." : "Criar Conta de Comprador"}
                    </Button>
                  </form>
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