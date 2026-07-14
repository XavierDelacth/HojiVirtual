import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, BadgeCheck, ArrowLeft, MessageCircle, ShoppingBag, Copy, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { stores, reviews, paymentMethods } from "@/data/mockData";
import { resolveBankData } from '@/lib/resolveBankData';
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddToCartButton from "@/components/products/AddToCartButton";
import {
  DeliveryZone,
  FeeBreakdown as FeeBreakdownType,
  calculateFees,
  formatKz,
} from "@/lib/feeEngine";
import { PaymentMethod, PaymentRequest } from "@/lib/paymentSimulator";
import FeeBreakdown from "@/components/checkout/FeeBreakdown";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import PaymentStatusModal from "@/components/checkout/PaymentStatusModal";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any | null>(null);
  const [isCreatingPurchase, setIsCreatingPurchase] = useState(false);
  const [copiedIBAN, setCopiedIBAN] = useState(false);
  const [buyerName, setBuyerName] = useState("");

  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | undefined>(undefined);
  const [isUrgent, setIsUrgent] = useState(false);
  const [withPackaging, setWithPackaging] = useState(false);
  const [withGiftWrap, setWithGiftWrap] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | undefined>(undefined);
  const [payerPhone, setPayerPhone] = useState("");
  const [fees, setFees] = useState<FeeBreakdownType | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const { allProducts } = useProducts();
  const product = allProducts.find(p => String(p.id) === String(id));
  const [storeData, setStoreData] = useState<any | null>(null);
  const sellerId = product?.sellerId || (String(product?.storeId || '').startsWith('store_') ? String(product?.storeId).replace(/^store_/, '') : undefined);

  useEffect(() => {
    if (!product) {
      setStoreData(null);
      return;
    }

    let mounted = true;
    resolveBankData(product)
      .then((res) => {
        if (mounted) setStoreData(res);
      })
      .catch((e) => {
        console.error('Erro ao resolver dados bancários:', e);
      });

    return () => {
      mounted = false;
    };
  }, [product]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setBuyerName(user.email.split('@')[0]);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!product) return;
    const subtotal = product.price;
    setFees(calculateFees({ subtotal, itemCount: 1, deliveryZone, isUrgent, withPackaging, withGiftWrap }));
  }, [product, deliveryZone, isUrgent, withPackaging, withGiftWrap]);

  const productReviews = reviews.filter(r => r.productId === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  const generateNumericReference = (): string => {
    return Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIBAN(true);
    setTimeout(() => setCopiedIBAN(false), 2000);
    toast({
      title: "IBAN copiado!",
      description: "Pode agora efetuar a transferência bancária.",
    });
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod || !fees || !product) return;
    if (!buyerName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insere o teu nome.",
        variant: "destructive",
      });
      return;
    }
    setPaymentRequest({
      purchaseId: `PROD-${Date.now()}`,
      amount: fees.buyerTotal,
      method: selectedPaymentMethod,
      phone: payerPhone || undefined,
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    if (!product || !storeData || !fees || !selectedPaymentMethod) return;

    setIsCreatingPurchase(true);

    try {
      const { data: authData } = await supabase.auth.getUser();
      const supabaseUser = authData?.user ?? null;
      let user: any = supabaseUser;

      if (!user) {
        const userEmail = localStorage.getItem("userEmail");
        const userName = localStorage.getItem("userName");
        if (userEmail && userName) {
          user = { id: userEmail, email: userEmail, name: userName };
        }
      }

      if (!user) {
        toast({
          title: "Autenticação necessária",
          description: "Por favor, faça login para realizar uma compra.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const numericRef = generateNumericReference();

      const purchase = {
        id: numericRef,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        store_name: storeData.storeName || storeData.name || product.storeName || "Loja não identificada",
        store_id: storeData.storeId || product.storeId,
        buyer_id: user.id,
        buyer_name: buyerName,
        product_image: product.images[0],
        status: "approved",
        iban: storeData.iban,
        bank: storeData.bank,
        seller_name: storeData.owner || storeData.storeName || storeData.name || "Vendedor",
        created_at: new Date().toISOString(),
      };

      const insertPayload: Record<string, any> = {
        buyer_id: user.id,
        buyer_name: buyerName,
        product_name: product.name,
        product_price: product.price,
        store_name: storeData.storeName || storeData.name || product.storeName || "Loja não identificada",
        store_id: storeData.storeId || product.storeId,
        product_id: product.id,
        product_image: product.images[0],
        status: "approved",
      };

      const newFields: Record<string, any> = {
        item_fee: fees.itemFee,
        processing_fee: fees.processingFee,
        delivery_fee: deliveryZone ? fees.deliveryFee : 0,
        urgent_fee: isUrgent ? fees.urgentFee : 0,
        small_order_fee: fees.smallOrderFee,
        packaging_fee: withPackaging ? fees.packagingFee : 0,
        gift_wrap_fee: withGiftWrap ? fees.giftWrapFee : 0,
        platform_revenue: fees.platformRevenue,
        seller_receives: fees.sellerReceives,
        buyer_total: fees.buyerTotal,
        payment_method: selectedPaymentMethod,
        transaction_id: transactionId,
        payment_status: "approved",
        paid_at: new Date().toISOString(),
        delivery_zone: deliveryZone ?? null,
        is_urgent: isUrgent,
        with_packaging: withPackaging,
        with_gift_wrap: withGiftWrap,
      };

      let insertedId = numericRef;
      let insertedToken: string | null = null;

      const { data: insertedRow, error: insertError } = await supabase
        .from("purchases")
        .insert({ ...insertPayload, ...newFields })
        .select("id, secure_token")
        .single();

      if (insertError) {
        console.error("Erro ao guardar compra no Supabase (pode ser migration em falta):", insertError);
        const { data: fallbackRow, error: fallbackError } = await supabase
          .from("purchases")
          .insert(insertPayload)
          .select("id, secure_token")
          .single();
        if (fallbackError) {
          console.error("Erro tambem no fallback:", fallbackError);
        } else if (fallbackRow) {
          insertedId = fallbackRow.id;
          insertedToken = fallbackRow.secure_token;
        }
      } else if (insertedRow) {
        insertedId = insertedRow.id;
        insertedToken = insertedRow.secure_token;
      }

      const url = `/comprovativo/${insertedId}?token=${insertedToken}`;
      setReceiptUrl(url);

      try {
        const purchases = JSON.parse(localStorage.getItem('hoji_purchases') || '[]');
        purchases.push({ ...purchase, id: insertedId, secure_token: insertedToken });
        localStorage.setItem('hoji_purchases', JSON.stringify(purchases));
        window.dispatchEvent(new CustomEvent("hoji-purchase-completed"));
      } catch (e) {
        console.error('Erro ao guardar compra em localStorage:', e);
      }

      setPurchaseData({ ...purchase, id: insertedId, secure_token: insertedToken });

      toast({
        title: "Compra concluída com sucesso!",
        description: `Referência: ${insertedId}. O teu comprovativo está pronto.`,
      });
    } catch (error) {
      console.error('Erro ao registar compra:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registar a compra. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingPurchase(false);
      setIsPaymentModalOpen(false);
    }
  };

  const handlePaymentFailure = (reason: string) => {
    toast({
      title: "Pagamento falhado",
      description: reason,
      variant: "destructive",
    });
  };

  const handleGenerateReceipt = async () => {
    if (!purchaseData) return;

    try {
      const existing = JSON.parse(localStorage.getItem('hoji_purchases') || '[]');
      if (!existing.find((p: any) => p.id === purchaseData.id)) {
        existing.push(purchaseData);
        localStorage.setItem('hoji_purchases', JSON.stringify(existing));
      }
    } catch (e) {
      console.error('Erro ao guardar comprovativo localmente antes do PDF:', e);
    }

    if (!purchaseData.iban) {
      toast({
        title: 'Dados bancários em falta',
        description: 'O vendedor ainda não configurou os dados bancários.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '-9999px';
      element.style.width = '800px';
      element.style.background = 'white';
      element.style.padding = '40px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.color = '#333';

      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #E67E22; margin: 0; font-size: 28px; font-weight: bold;">COMPROVATIVO DE COMPRA</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; margin-bottom: 30px; border-left: 5px solid #E67E22; border-radius: 4px;">
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">Número de Referência</div>
          <div style="font-size: 24px; color: #E67E22; font-weight: bold; letter-spacing: 2px; font-family: 'Courier New', monospace;">
            ${purchaseData.id}
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #E67E22; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase;">PRODUTO</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Nome:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${purchaseData.product_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Valor:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${purchaseData.product_price.toLocaleString('pt-AO')} Kz</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #E67E22; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase;">VENDEDOR</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Loja:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${purchaseData.store_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Vendedor:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${purchaseData.seller_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">IBAN:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-family: 'Courier New', monospace; font-weight: bold;">${purchaseData.iban || 'N/A'}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #E67E22; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase;">COMPRADOR</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Nome:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${purchaseData.buyer_name}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #E67E22; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase;">DATA E HORA</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Data:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${new Date(purchaseData.created_at).toLocaleDateString('pt-AO')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Hora:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${new Date(purchaseData.created_at).toLocaleTimeString('pt-AO')}</td>
            </tr>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #2ED573 0%, #27AE60 100%); color: white; padding: 25px; text-align: center; border-radius: 4px; margin-bottom: 30px;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">✅ COMPRA REALIZADA COM SUCESSO</div>
          <div style="font-size: 14px;">Obrigado por comprar na Hoji Virtual Hub</div>
        </div>

        <div style="text-align: center; color: #999; font-size: 11px; border-top: 1px solid #eee; padding-top: 20px;">
          <p style="margin: 0;">Gerado em: ${new Date().toLocaleString('pt-AO')}</p>
          <p style="margin: 5px 0 0 0;">Este é um comprovativo automático. Guarde-o para seus registos.</p>
        </div>
      `;

      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: 800,
      });

      document.body.removeChild(element);

      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save(`comprovativo_${purchaseData.id}.pdf`);

      toast({
        title: "PDF descarregado com sucesso!",
        description: `Ficheiro: comprovativo_${purchaseData.id}.pdf`,
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao descarregar",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-6">Desculpe, este produto não existe ou foi removido.</p>
          <Button onClick={() => navigate("/explorar")}>Voltar aos Produtos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-secondary text-secondary" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">
                      ({product.reviewCount} avaliações)
                    </span>
                  </div>
                  {product.stock < 5 && product.stock > 0 && (
                    <Badge variant="destructive">Últimas {product.stock} unidades!</Badge>
                  )}
                  {product.stock >= 5 && (
                    <Badge variant="outline" className="text-accent border-accent">
                      {product.stock} disponíveis
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-muted-foreground ml-2">Kz</span>
              </div>

              {storeData && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={storeData.image}
                        alt={storeData.storeName}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{storeData.storeName}</h3>
                          {storeData.verified && (
                            <BadgeCheck className="w-4 h-4 text-trust" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                          <span>{storeData.rating}</span>
                          <span>•</span>
                          <span>{storeData.reviewCount} avaliações</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Ver Loja</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-sm text-muted-foreground">{storeData?.location}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Métodos de Pagamento</h3>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <Badge key={method.id} variant="secondary" className="px-3 py-1.5">
                      <span className="mr-1.5">{method.icon}</span>
                      {method.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <AddToCartButton productId={product.id} size="lg" fullWidth />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" className="flex-1" onClick={() => setShowPurchaseModal(true)}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Adquira Já
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contactar Vendedor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="mt-10">
                <h2 className="text-xl font-bold mb-6">
                  Avaliações ({product.reviewCount})
                </h2>
                
                {productReviews.length > 0 ? (
                  <div className="space-y-4">
                    {productReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.userName}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs">
                                    Compra Verificada
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-secondary text-secondary"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {review.date}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Este produto ainda não possui avaliações.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent className="h-[90vh] max-h-[90vh] overflow-hidden w-full max-w-md mx-4 sm:mx-0">
          <div className="flex h-full min-h-0 flex-col">
            <DialogHeader className="sticky top-0 z-10 flex-shrink-0 px-5 pt-5 bg-white">
              <DialogTitle className="text-center">Confirmar Compra</DialogTitle>
              <DialogDescription className="text-center">
                Escolhe as opções de entrega e método de pagamento
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-5">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{product?.name}</h4>
                  <p className="text-xs text-muted-foreground">{storeData?.storeName || product?.storeName || "Loja"}</p>
                  <p className="text-primary font-bold mt-1">
                    {product && formatPrice(product.price)} Kz
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="buyerName" className="text-sm font-medium">
                  O teu nome
                </Label>
                <Input
                  id="buyerName"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="O teu nome"
                  className="mt-1"
                />
              </div>

              <DeliveryOptions
                selectedZone={deliveryZone}
                onZoneChange={setDeliveryZone}
                isUrgent={isUrgent}
                onUrgentChange={setIsUrgent}
                withPackaging={withPackaging}
                onPackagingChange={setWithPackaging}
                withGiftWrap={withGiftWrap}
                onGiftWrapChange={setWithGiftWrap}
              />

              {fees && <FeeBreakdown fees={fees} />}

              <PaymentMethodSelector
                selected={selectedPaymentMethod}
                onSelect={setSelectedPaymentMethod}
                phone={payerPhone}
                onPhoneChange={setPayerPhone}
              />

              {storeData && (
                <div className="space-y-4 bg-primary/5 p-4 rounded-xl border border-primary/20">
                  <h3 className="font-semibold text-base">Dados Bancários do Vendedor</h3>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Titular da Conta</p>
                    <p className="font-medium">{storeData.owner || storeData.storeName || "Vendedor não identificado"}</p>
                  </div>

                  {(storeData as any).bank && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Banco</p>
                      <p className="font-medium">{(storeData as any).bank}</p>
                    </div>
                  )}

                  {(storeData as any).iban && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">IBAN</p>
                      <div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                        <code className="font-mono text-sm font-bold flex-1 break-all">
                          {(storeData as any).iban}
                        </code>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard((storeData as any).iban!)}
                          className="flex-shrink-0"
                        >
                          {copiedIBAN ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex-shrink-0 px-5 pb-5 pt-4 border-t border-gray-100 bg-white space-y-3">
              <Button
                variant="hero"
                className="w-full"
                disabled={!selectedPaymentMethod || !buyerName.trim()}
                onClick={handleConfirmPayment}
              >
                Confirmar e Pagar
              </Button>

              {purchaseData && (
                <div className="space-y-2">
                  <p className="text-sm text-green-600 font-medium text-center">
                    ✓ Compra registada! Referência: {purchaseData.id}
                  </p>
                  {receiptUrl && (
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => navigate(receiptUrl)}
                    >
                      Ver Comprovativo
                    </Button>
                  )}
                  <Button
                    variant="hero"
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleGenerateReceipt}
                  >
                    Descarregar PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPurchaseModal(false)}
                  >
                    Fechar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentStatusModal
        isOpen={isPaymentModalOpen}
        paymentRequest={paymentRequest}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ProductDetails;
