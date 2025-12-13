import { useState } from "react";
import { Percent, Shield, TrendingUp, CheckCircle, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PricingSection = () => {
  const navigate = useNavigate();
  const [saleValue, setSaleValue] = useState<string>("");

  const calculateCommission = (value: number): { rate: number; commission: number; netValue: number } => {
    let rate: number;
    if (value <= 10000) {
      rate = 12;
    } else if (value <= 50000) {
      rate = 11;
    } else {
      rate = 10;
    }
    const commission = (value * rate) / 100;
    const netValue = value - commission;
    return { rate, commission, netValue };
  };

  const numericValue = parseFloat(saleValue) || 0;
  const { rate, commission, netValue } = calculateCommission(numericValue);

  const benefits = [
    {
      icon: Shield,
      title: "Sem Custos Iniciais",
      description: "Comece a vender gratuitamente, só paga quando vende"
    },
    {
      icon: TrendingUp,
      title: "Comissão Justa",
      description: "Apenas 10% a 12% por transação concluída"
    },
    {
      icon: CheckCircle,
      title: "Pagamento Seguro",
      description: "Receba o valor directamente na sua conta"
    }
  ];

  return (
    <section id="modelo-comissoes" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modelo de <span className="text-gradient">Comissões</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Venda sem preocupações - só paga quando faz uma venda
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Commission Card */}
          <Card hover className="relative border-2 border-primary shadow-glow">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Percent className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Comissão por Venda</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gradient">10% - 12%</span>
                <span className="text-muted-foreground ml-2">por transação</span>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  A comissão varia conforme o valor da venda. Quanto mais vende, menor é a taxa!
                </p>
              </div>
              
              <div className="grid gap-3 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Vendas até 10.000 Kz: 12% de comissão</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Vendas de 10.001 a 50.000 Kz: 11% de comissão</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Vendas acima de 50.000 Kz: 10% de comissão</span>
                </div>
              </div>
              
              <Button 
                variant="hero" 
                className="w-full"
                onClick={() => navigate("/registo")}
              >
                Começar a Vender Agora
              </Button>
            </CardContent>
          </Card>

          {/* Commission Calculator */}
          <Card hover className="relative border-2 border-secondary">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl mb-2">Calculadora de Comissões</CardTitle>
              <p className="text-muted-foreground">
                Simule quanto irá receber em cada venda
              </p>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valor da Venda (Kz)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 25000"
                    value={saleValue}
                    onChange={(e) => setSaleValue(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                {numericValue > 0 && (
                  <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Taxa de Comissão</span>
                      <span className="font-bold text-lg">{rate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-lg bg-destructive/10">
                      <span className="text-muted-foreground">Comissão HojiVirtual</span>
                      <span className="font-bold text-lg text-destructive">
                        - {commission.toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-lg bg-accent/10 border-2 border-accent">
                      <span className="font-semibold">Você Recebe</span>
                      <span className="font-bold text-2xl text-accent">
                        {netValue.toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                  </div>
                )}

                {numericValue === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Digite um valor para simular</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} hover className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
