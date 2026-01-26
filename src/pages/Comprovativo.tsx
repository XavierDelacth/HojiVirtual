import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Loader2, AlertCircle, Download, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Purchase {
  id: string;
  buyer_name: string;
  buyer_phone: string | null;
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    if (!receiptRef.current || !purchase) return;
    
    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = (210 - imgWidth) / 2;
      
      pdf.addImage(imgData, "PNG", xOffset, 10, imgWidth, imgHeight);
      pdf.save(`comprovativo-${purchase.id.slice(0, 8).toUpperCase()}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!purchase) return;
    
    const receiptUrl = window.location.href;
    const message = `✅ *COMPROVATIVO DE COMPRA*

🛍️ *Produto:* ${purchase.product_name}
💰 *Valor:* ${formatPrice(purchase.product_price)} Kz
🏪 *Loja:* ${purchase.store_name}
👤 *Comprador:* ${purchase.buyer_name}
📅 *Data:* ${formatDate(purchase.created_at)}
🔢 *ID:* ${purchase.id.slice(0, 8).toUpperCase()}

📎 Ver comprovativo: ${receiptUrl}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

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
        {/* Printable Receipt Content */}
        <div ref={receiptRef} style={{ backgroundColor: "#ffffff" }}>
          <div className="p-6">
            {/* Receipt Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 bg-muted/50 font-medium text-sm text-muted-foreground w-2/5">
                      Nome do Produto
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {purchase.product_name}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 bg-muted/50 font-medium text-sm text-muted-foreground">
                      Nome do Comprador
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {purchase.buyer_name}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 bg-muted/50 font-medium text-sm text-muted-foreground">
                      Nome da Loja
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {purchase.store_name}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 bg-muted/50 font-medium text-sm text-muted-foreground">
                      Data da Compra
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {formatDate(purchase.created_at)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-muted/50 font-medium text-sm text-muted-foreground">
                      ID da Transação
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-primary">
                      {purchase.id.slice(0, 8).toUpperCase()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Success Message */}
            <div className="mt-6 text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-lg font-bold text-accent">
                Compra Com Sucesso!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Obrigado pela sua Compra
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Outside printable area */}
        <CardContent className="p-6 pt-0 space-y-3">
          <Button 
            variant="outline-hero" 
            className="w-full" 
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                A gerar PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Gerar PDF do Comprovativo
              </>
            )}
          </Button>
          <Button 
            variant="secondary" 
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
            onClick={handleShareWhatsApp}
          >
            <MessageCircle className="w-4 h-4" />
            Enviar via WhatsApp
          </Button>
          <Link to="/explorar" className="block">
            <Button variant="hero" className="w-full">
              Continuar a Comprar
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comprovativo;
