import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DeliveryZone,
  FeeBreakdown as FeeBreakdownType,
  calculateFees,
} from "@/lib/feeEngine";
import { PaymentMethod, PaymentRequest } from "@/lib/paymentSimulator";
import FeeBreakdown from "@/components/checkout/FeeBreakdown";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import PaymentStatusModal from "@/components/checkout/PaymentStatusModal";

const Carrinho = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, isLoading, removeFromCart, updateQuantity } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
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
  const [purchaseRef, setPurchaseRef] = useState<string | null>(null);
  const [firstReceiptUrl, setFirstReceiptUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setBuyerName(user.email.split('@')[0]);
      }
    };
    fetchUser();
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (items.length === 0) {
      setFees(null);
      return;
    }
    setFees(calculateFees({ subtotal, itemCount, deliveryZone, isUrgent, withPackaging, withGiftWrap }));
  }, [items, subtotal, itemCount, deliveryZone, isUrgent, withPackaging, withGiftWrap]);

  const handleRemove = async (cartItemId: string) => {
    setRemovingId(cartItemId);
    await removeFromCart(cartItemId);
    setRemovingId(null);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod || !fees) return;
    if (!buyerName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insere o teu nome.",
        variant: "destructive",
      });
      return;
    }
    setPaymentRequest({
      purchaseId: `CART-${Date.now()}`,
      amount: fees.buyerTotal,
      method: selectedPaymentMethod,
      phone: payerPhone || undefined,
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    if (!fees || !selectedPaymentMethod) return;

    const ref = `CART-${Date.now()}`;
    setPurchaseRef(ref);

    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id || "unknown";

    const coreFields = {
      buyer_id: userId,
      buyer_name: buyerName,
      buyer_phone: payerPhone || null,
      status: "approved",
    };

    const newFields = {
      item_fee: 0,
      processing_fee: 0,
      delivery_fee: 0,
      urgent_fee: 0,
      small_order_fee: 0,
      packaging_fee: 0,
      gift_wrap_fee: 0,
      platform_revenue: 0,
      seller_receives: 0,
      buyer_total: 0,
      payment_method: selectedPaymentMethod,
      transaction_id: transactionId,
      payment_status: "approved",
      paid_at: new Date().toISOString(),
      delivery_zone: deliveryZone ?? null,
      is_urgent: isUrgent,
      with_packaging: withPackaging,
      with_gift_wrap: withGiftWrap,
    };

    let firstInsertedId: string | null = null;
    let firstInsertedToken: string | null = null;

    for (const item of items) {
      const itemFeeShare = fees.itemFee / items.length;
      const procFeeShare = fees.processingFee / items.length;
      const delFeeShare = deliveryZone ? fees.deliveryFee / items.length : 0;
      const urgFeeShare = isUrgent ? fees.urgentFee / items.length : 0;
      const smoFeeShare = fees.smallOrderFee / items.length;
      const pkgFeeShare = withPackaging ? fees.packagingFee / items.length : 0;
      const giftFeeShare = withGiftWrap ? fees.giftWrapFee / items.length : 0;

      const itemNewFields = {
        ...newFields,
        item_fee: itemFeeShare,
        processing_fee: procFeeShare,
        delivery_fee: delFeeShare,
        urgent_fee: urgFeeShare,
        small_order_fee: smoFeeShare,
        packaging_fee: pkgFeeShare,
        gift_wrap_fee: giftFeeShare,
        platform_revenue: +(itemFeeShare + procFeeShare + delFeeShare + urgFeeShare + smoFeeShare + pkgFeeShare + giftFeeShare).toFixed(2),
        seller_receives: +(fees.sellerReceives / items.length).toFixed(2),
        buyer_total: +(fees.buyerTotal / items.length).toFixed(2),
      };

      const fullInsert = {
        ...coreFields,
        product_name: item.product.name,
        product_price: item.product.price,
        store_name: item.product.storeName,
        store_id: item.product.storeId,
        product_id: item.product.id,
        product_image: item.product.images[0],
        ...itemNewFields,
      };

      const { data: insertedRow, error } = await supabase
        .from("purchases")
        .insert(fullInsert)
        .select("id, secure_token")
        .single();

      if (error) {
        console.error("Erro ao guardar compra (tentar sem campos novos):", error);
        const { data: fallbackRow, error: fallbackError } = await supabase
          .from("purchases")
          .insert({
            ...coreFields,
            product_name: item.product.name,
            product_price: item.product.price,
            store_name: item.product.storeName,
            store_id: item.product.storeId,
            product_id: item.product.id,
            product_image: item.product.images[0],
          })
          .select("id, secure_token")
          .single();
        if (fallbackError) {
          console.error("Erro no fallback:", fallbackError);
        } else if (fallbackRow && !firstInsertedId) {
          firstInsertedId = fallbackRow.id;
          firstInsertedToken = fallbackRow.secure_token;
        }
      } else if (insertedRow && !firstInsertedId) {
        firstInsertedId = insertedRow.id;
        firstInsertedToken = insertedRow.secure_token;
      }
    }

    if (firstInsertedId && firstInsertedToken) {
      setFirstReceiptUrl(`/comprovativo/${firstInsertedId}?token=${firstInsertedToken}`);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('hoji_purchases') || '[]');
      existing.push({
        id: ref,
        product_name: `${items.length} item(ns)`,
        product_price: fees.buyerTotal,
        store_name: "HojiVirtual",
        buyer_name,
        status: "approved",
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('hoji_purchases', JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent("hoji-purchase-completed"));
    } catch (e) {
      console.error("Erro ao guardar em localStorage:", e);
    }

    setIsPaymentModalOpen(false);

    toast({
      title: "Compra concluída com sucesso!",
      description: firstReceiptUrl
        ? "Podes ver o teu comprovativo agora."
        : "Podes descarregar o teu comprovativo no histórico de compras.",
    });
  };

  const handlePaymentFailure = (reason: string) => {
    toast({
      title: "Pagamento falhado",
      description: reason,
      variant: "destructive",
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-AO").format(price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              O Meu <span className="text-gradient">Carrinho</span>
            </h1>

            {isLoading ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6 flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded-lg" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-muted rounded w-3/4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : items.length === 0 ? (
              <Card className="p-12 text-center max-w-lg mx-auto">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  O seu carrinho está vazio 🛒
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore o mercado e adicione produtos ao seu carrinho
                </p>
                <Button variant="hero" onClick={() => navigate("/explorar")}>
                  Explorar Produtos →
                </Button>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex gap-4">
                          <Link
                            to={`/produto/${item.product.id}`}
                            className="flex-shrink-0"
                          >
                            <img
                              src={
                                item.product.images[0] ||
                                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200"
                              }
                              alt={item.product.name}
                              className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/produto/${item.product.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              <h3 className="font-semibold line-clamp-2 mb-1">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              Vendedor: {item.product.storeName}
                            </p>
                            <p className="text-lg font-bold text-primary mb-3">
                              {formatPrice(item.product.price)} Kz
                            </p>

                              <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center border border-border rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-10 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>

                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemove(item.id)}
                                  disabled={removingId === item.id}
                                >
                                  {removingId === item.id
                                    ? "A remover..."
                                    : "Remover"}
                                </Button>
                              </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Resumo do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          {formatPrice(subtotal)} Kz
                        </span>
                      </div>

                      <Button
                        variant="hero"
                        size="lg"
                        className="w-full"
                        onClick={() => setShowCheckoutModal(true)}
                      >
                        Finalizar Pedido
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
      </main>

      <Footer />

      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogContent className="h-[90vh] max-h-[90vh] overflow-hidden w-full max-w-md mx-4 sm:mx-0">
          <div className="flex h-full min-h-0 flex-col">
            <DialogHeader className="sticky top-0 z-10 flex-shrink-0 px-5 pt-5 bg-white">
              <DialogTitle className="text-center">Finalizar Pedido</DialogTitle>
            </DialogHeader>

            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-5">
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
            </div>

            <div className="flex-shrink-0 px-5 pb-5 pt-4 border-t border-gray-100 bg-white">
              {firstReceiptUrl ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-600 font-medium text-center">
                    ✓ Compra realizada com sucesso!
                  </p>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => navigate(firstReceiptUrl)}
                  >
                    Ver Comprovativo
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowCheckoutModal(false);
                      setFirstReceiptUrl(null);
                    }}
                  >
                    Fechar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="hero"
                  className="w-full"
                  disabled={!selectedPaymentMethod || !buyerName.trim()}
                  onClick={handleConfirmPayment}
                >
                  Confirmar e Pagar
                </Button>
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
    </div>
  );
};

export default Carrinho;
