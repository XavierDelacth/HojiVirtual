import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cartMessage = (location.state as { message?: string })?.message;

  const redirectBasedOnRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
    
    if (from && from !== '/login' && from !== '/registo') {
      navigate(from, { replace: true });
      return;
    }

    if (data?.role === 'seller') {
      navigate("/dashboard/vendedor", { replace: true });
    } else {
      navigate("/dashboard/utilizador", { replace: true });
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        redirectBasedOnRole(session.user.id);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Defer to prevent deadlock
        setTimeout(() => {
          redirectBasedOnRole(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    setIsLoading(false);

    if (error) {
      let errorMessage = "Ocorreu um erro ao fazer login.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou palavra-passe incorretos.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme o seu email antes de fazer login.";
      }

      toast({
        title: "Erro de autenticação",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Login bem-sucedido!",
      description: "Bem-vindo de volta ao HojiVirtual",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200"
          alt="Mercado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-background">
          <h2 className="text-4xl font-bold mb-4">
            Bem-vindo ao HojiVirtual
          </h2>
          <p className="text-lg text-background/80 max-w-md">
            A plataforma que está a transformar o comércio informal em Angola.
            Junte-se a milhares de vendedores e compradores.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">HojiVirtual</span>
          </Link>

          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
              <CardDescription>
                Insira os seus dados para aceder à plataforma
              </CardDescription>
              {cartMessage && (
                <p className="mt-3 text-sm text-primary font-medium bg-primary/10 rounded-lg px-4 py-3">
                  {cartMessage}
                </p>
              )}
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
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
                  <Label htmlFor="password">Palavra-passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-12"
                      required
                      autoComplete="current-password"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      Lembrar-me
                    </Label>
                  </div>
                  <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
                    Esqueceu a palavra-passe?
                  </Link>
                </div>

                <Button variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "A entrar..." : "Entrar"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Não tem conta?{" "}
                  <Link to="/registo" className="text-primary font-semibold hover:underline">
                    Criar conta
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

export default Login;