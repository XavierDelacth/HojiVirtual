import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Store, User, Package, Calendar, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Purchase {
  id: string;
  buyer_name: string;
  product_name: string;
  product_price: number;
  store_name: string;
  product_image: string | null;
  status: string;
  created_at: string;
  validated_at: string | null;
}

const Comprovativo = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      if (!id) {
        setError("ID de compra não fornecido");
        setIsLoading(false);
        return;
      }

      if (!token) {
        setError("Token de acesso não fornecido");
        setIsLoading(false);
        return;
      }

      try {
        // Use edge function to fetch receipt with token validation
        const { data, error: fetchError } = await supabase.functions.invoke('get-receipt', {
          body: null,
          headers: {},
        });

        // Use URL params for the edge function
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-receipt?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Comprovativo não encontrado");
          return;
        }

        if (result.purchase) {
          setPurchase(result.purchase);
        } else {
          setError("Comprovativo não encontrado");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Erro ao carregar comprovativo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchase();
  }, [id, token]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">A carregar comprovativo...</p>
        </div>
      </div>
    );
  }

  if (error || !purchase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-6 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Comprovativo Inválido</h1>
            <p className="text-muted-foreground mb-6">
              {error || "Este comprovativo não existe ou expirou."}
            </p>
            <Link to="/explorar">
              <Button variant="hero">Explorar Produtos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-md w-full overflow-hidden shadow-2xl">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-6 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-3" />
          <h1 className="text-2xl font-bold">Compra com Sucesso!</h1>
          <p className="text-accent-foreground/80 mt-1">Obrigado pela sua compra</p>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Product Image & Name */}
          {purchase.product_image && (
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <img
                src={purchase.product_image}
                alt={purchase.product_name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg">{purchase.product_name}</h2>
                <p className="text-2xl font-bold text-primary mt-1">
                  {formatPrice(purchase.product_price)} Kz
                </p>
              </div>
            </div>
          )}

          {!purchase.product_image && (
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Produto</span>
              </div>
              <h2 className="font-bold text-lg">{purchase.product_name}</h2>
              <p className="text-2xl font-bold text-primary mt-1">
                {formatPrice(purchase.product_price)} Kz
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Store className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Loja</p>
                <p className="font-medium">{purchase.store_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <User className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Comprador</p>
                <p className="font-medium">{purchase.buyer_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Data da Compra</p>
                <p className="font-medium">{formatDate(purchase.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">ID da Transação</p>
            <p className="font-mono text-sm text-primary">{purchase.id.slice(0, 8).toUpperCase()}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link to="/explorar" className="block">
              <Button variant="hero" className="w-full">
                Continuar a Comprar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comprovativo;