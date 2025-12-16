import { Helmet } from "react-helmet-async";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DashboardConfiguracoes = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    vendas: true,
    avaliacoes: true,
    marketing: false,
  });
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("pt");

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Configurações | HojiVirtual Dashboard</title>
        <meta name="description" content="Gerencie as configurações da sua conta e loja" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        
        <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground">Gerencie as preferências da sua conta</p>
            </div>

            <Tabs defaultValue="perfil" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="perfil" className="text-xs lg:text-sm">Perfil</TabsTrigger>
                <TabsTrigger value="notificacoes" className="text-xs lg:text-sm">Notificações</TabsTrigger>
                <TabsTrigger value="seguranca" className="text-xs lg:text-sm">Segurança</TabsTrigger>
                <TabsTrigger value="pagamentos" className="text-xs lg:text-sm">Pagamentos</TabsTrigger>
                <TabsTrigger value="preferencias" className="text-xs lg:text-sm">Preferências</TabsTrigger>
              </TabsList>

              {/* Perfil Tab */}
              <TabsContent value="perfil">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Informações Pessoais
                    </CardTitle>
                    <CardDescription>Atualize os seus dados pessoais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Alterar Foto</Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG até 2MB</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue="Wissel Filipe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="wissel.filipe@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue="+244 923 456 789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bi">Nº do BI</Label>
                        <Input id="bi" defaultValue="000123456LA789" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Endereço</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Morada</Label>
                          <Input id="address" defaultValue="Mercado Hoji Ya Henda, Box 12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" defaultValue="Luanda" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="province">Província</Label>
                          <Input id="province" defaultValue="Luanda" />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="w-full md:w-auto">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notificações Tab */}
              <TabsContent value="notificacoes">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Preferências de Notificação
                    </CardTitle>
                    <CardDescription>Escolha como quer ser notificado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Canais de Notificação</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                            </div>
                          </div>
                          <Switch 
                            checked={notifications.email} 
                            onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">SMS</p>
                              <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
                            </div>
                          </div>
                          <Switch 
                            checked={notifications.sms} 
                            onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Push</p>
                              <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                            </div>
                          </div>
                          <Switch 
                            checked={notifications.push} 
                            onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Tipos de Notificação</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Novas Vendas</p>
                            <p className="text-sm text-muted-foreground">Alertas quando realizar uma venda</p>
                          </div>
                          <Switch 
                            checked={notifications.vendas} 
                            onCheckedChange={(checked) => setNotifications({...notifications, vendas: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Novas Avaliações</p>
                            <p className="text-sm text-muted-foreground">Alertas quando receber uma avaliação</p>
                          </div>
                          <Switch 
                            checked={notifications.avaliacoes} 
                            onCheckedChange={(checked) => setNotifications({...notifications, avaliacoes: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing</p>
                            <p className="text-sm text-muted-foreground">Dicas e promoções do HojiVirtual</p>
                          </div>
                          <Switch 
                            checked={notifications.marketing} 
                            onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="w-full md:w-auto">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Preferências
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Segurança Tab */}
              <TabsContent value="seguranca">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Segurança da Conta
                    </CardTitle>
                    <CardDescription>Proteja a sua conta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Alterar Senha</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha Atual</Label>
                          <div className="relative">
                            <Input 
                              id="current-password" 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••"
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova Senha</Label>
                          <Input id="new-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                          <Input id="confirm-password" type="password" placeholder="••••••••" />
                        </div>
                      </div>
                      <Button variant="outline">
                        <Lock className="w-4 h-4 mr-2" />
                        Alterar Senha
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Sessões Ativas</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Chrome - Windows</p>
                              <p className="text-sm text-muted-foreground">Luanda, Angola • Ativa agora</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Atual</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Safari - iPhone</p>
                              <p className="text-sm text-muted-foreground">Luanda, Angola • Há 2 dias</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Terminar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold text-destructive">Zona de Perigo</h3>
                      <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Eliminar Conta</p>
                            <p className="text-sm text-muted-foreground">Esta ação é irreversível</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pagamentos Tab */}
              <TabsContent value="pagamentos">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Métodos de Pagamento
                    </CardTitle>
                    <CardDescription>Gerencie os seus métodos de pagamento e recebimento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Métodos Configurados</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <span className="text-lg">💳</span>
                            </div>
                            <div>
                              <p className="font-medium">Multicaixa Express</p>
                              <p className="text-sm text-muted-foreground">**** **** **** 4521</p>
                            </div>
                          </div>
                          <Badge>Principal</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <span className="text-lg">📱</span>
                            </div>
                            <div>
                              <p className="font-medium">Unitel Money</p>
                              <p className="text-sm text-muted-foreground">+244 923 456 789</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      </div>
                      <Button variant="outline">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Adicionar Método
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Conta para Recebimento</h3>
                      <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Banco</span>
                          <span className="font-medium">BAI - Banco Angolano de Investimentos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">IBAN</span>
                          <span className="font-medium">AO06 0040 0000 1234 5678 9012 3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Titular</span>
                          <span className="font-medium">Wissel Filipe</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Alterar Conta</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferências Tab */}
              <TabsContent value="preferencias">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Preferências Gerais
                    </CardTitle>
                    <CardDescription>Personalize a sua experiência</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Idioma</p>
                          <p className="text-sm text-muted-foreground">Selecione o idioma da interface</p>
                        </div>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt">Português</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Tema</p>
                          <p className="text-sm text-muted-foreground">Escolha a aparência da aplicação</p>
                        </div>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4" />
                                Claro
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4" />
                                Escuro
                              </div>
                            </SelectItem>
                            <SelectItem value="system">Sistema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Moeda</p>
                          <p className="text-sm text-muted-foreground">Moeda para exibição de preços</p>
                        </div>
                        <Select defaultValue="kz">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kz">Kwanza (Kz)</SelectItem>
                            <SelectItem value="usd">Dólar (USD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="w-full md:w-auto">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Preferências
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardConfiguracoes;
