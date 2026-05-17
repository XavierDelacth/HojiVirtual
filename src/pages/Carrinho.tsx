import { useState } from "react";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { paymentMethods } from "@/data/mockData";

const Carrinho = () => {
  const navigate = useNavigate();
  const { items, isLoading, removeFromCart, updateQuantity } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-AO").format(price);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const acceptedPayments = paymentMethods.filter(
    (m) => m.id === "unitel" || m.id === "multicaixa"
  );

  const handleRemove = async (cartItemId: string) => {
    setRemovingId(cartItemId);
    await removeFromCart(cartItemId);
    setRemovingId(null);
  };

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

                      <div className="flex justify-between text-sm border-t border-border pt-4">
                        <span className="text-muted-foreground">Entrega</span>
                        <span className="text-right text-sm">
                          A combinar com o vendedor
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-t border-border pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
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

                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center mb-3">
                          Pagamentos aceites
                        </p>
                        <div className="flex justify-center gap-4">
                          {acceptedPayments.map((method) => (
                              <div
                                key={method.id}
                                className="flex flex-col items-center gap-1 text-xs text-muted-foreground"
                              >
                                <span className="text-2xl">{method.icon}</span>
                                <span className="text-center max-w-[80px]">
                                  {method.name}
                                </span>
                              </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
      </main>

      <Footer />

      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Pedido Recebido</DialogTitle>
            <DialogDescription className="text-center text-base">
              Entraremos em contacto em breve para confirmar a sua encomenda!
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="hero"
            className="w-full mt-4"
            onClick={() => setShowCheckoutModal(false)}
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Carrinho;
