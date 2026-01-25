import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, BadgeCheck, ArrowLeft, MessageCircle, ShoppingBag, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { products, stores, reviews, paymentMethods } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [purchaseToken, setPurchaseToken] = useState<string | null>(null);
  const [isCreatingPurchase, setIsCreatingPurchase] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("3h 00min");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  const product = products.find(p => p.id === id);
  const store = stores.find(s => s.id === product?.storeId);
  const productReviews = reviews.filter(r => r.productId === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  // Timer countdown
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Expirado");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes.toString().padStart(2, '0')}min`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handlePurchase = async () => {
    if (!product || !store) return;

    setIsCreatingPurchase(true);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Autenticação necessária",
          description: "Por favor, faça login para realizar uma compra.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Get user profile for buyer name
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", user.id)
        .maybeSingle();

      const buyerName = profile?.name || user.email?.split('@')[0] || "Comprador";

      // Create purchase record with secure token
      const { data: purchase, error } = await supabase
        .from("purchases")
        .insert({
          buyer_id: user.id,
          buyer_name: buyerName,
          product_name: product.name,
          product_price: product.price,
          store_name: store.name,
          store_id: store.id,
          product_id: product.id,
          product_image: product.images[0],
          status: "pending",
        })
        .select('id, expires_at, secure_token')
        .single();

      if (error) {
        console.error("Error creating purchase:", error);
        toast({
          title: "Erro",
          description: "Não foi possível processar a compra. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      setPurchaseId(purchase.id);
      setPurchaseToken(purchase.secure_token);
      setExpiresAt(new Date(purchase.expires_at));
      setShowPurchaseModal(true);

      toast({
        title: "Compra iniciada!",
        description: "Apresente o QR Code ao vendedor para validar.",
      });
    } catch (err) {
      console.error("Purchase error:", err);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingPurchase(false);
    }
  };

  const getQRCodeUrl = () => {
    if (!purchaseId || !purchaseToken) return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/comprovativo/${purchaseId}?token=${encodeURIComponent(purchaseToken)}`;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
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
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
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

              {/* Price */}
              <div className="bg-muted/50 rounded-xl p-6">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-muted-foreground ml-2">Kz</span>
              </div>

              {/* Store Card */}
              {store && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{store.name}</h3>
                          {store.verified && (
                            <BadgeCheck className="w-4 h-4 text-trust" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                          <span>{store.rating}</span>
                          <span>•</span>
                          <span>{store.reviewCount} avaliações</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Ver Loja</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Location */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-sm text-muted-foreground">{store?.location}</p>
                </div>
              </div>

              {/* Payment Methods */}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1" 
                  onClick={handlePurchase}
                  disabled={isCreatingPurchase}
                >
                  {isCreatingPurchase ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 mr-2" />
                  )}
                  {isCreatingPurchase ? "A processar..." : "Comprar Agora"}
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar Vendedor
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Reviews */}
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

      {/* Purchase Modal with Real QR Code */}
      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Complete a Sua Compra</DialogTitle>
            <DialogDescription className="text-center">
              Apresente este QR Code ao vendedor
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Product Summary */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-xs text-muted-foreground">{product.storeName}</p>
                <p className="text-primary font-bold mt-1">
                  {formatPrice(product.price)} Kz
                </p>
              </div>
            </div>

            {/* Real QR Code */}
            <div className="text-center">
              <div className="w-52 h-52 mx-auto bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg">
                {purchaseId && (
                  <QRCodeSVG
                    value={getQRCodeUrl()}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-4 mb-2">
                Escaneie o QR Code para ver o comprovativo
              </p>
              <div className="flex items-center justify-center gap-2 text-secondary">
                <span className="text-lg">⏰</span>
                <span className="text-sm font-medium">Válido por: {timeRemaining}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                <span>Mostre este QR Code ao vendedor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                <span>O vendedor irá validar a compra</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
                <span>Após validação, avalie a sua experiência</span>
              </div>
            </div>

            <Button variant="hero" className="w-full" onClick={() => setShowPurchaseModal(false)}>
              Concluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProductDetails;
