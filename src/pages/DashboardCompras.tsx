import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSidebar from '@/components/dashboard/UserSidebar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Purchase {
  id: string;
  product_name: string;
  product_price: number;
  store_name: string;
  buyer_name: string;
  created_at?: string;
  product_image?: string;
}

const DashboardCompras: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      try {
        let userPurchases: Purchase[] = [];

        // Buscar compras do Supabase se utilizador autenticado
        if (user) {
          const { data, error } = await supabase
            .from('purchases')
            .select('*')
            .eq('buyer_id', user.id)
            .order('created_at', { ascending: false });

          if (!error && data) {
            userPurchases = data as Purchase[];
          }
        }

        // Buscar compras locais também (para compatibilidade)
        try {
          const localPurchases = JSON.parse(localStorage.getItem('hoji_purchases') || '[]');
          // Filtrar apenas compras do utilizador atual
          if (user) {
            const userLocalPurchases = localPurchases.filter((p: any) => p.buyer_id === user.id);
            // Combinar e remover duplicatas baseado no ID
            const combined = [...userPurchases];
            userLocalPurchases.forEach((local: Purchase) => {
              if (!combined.find(p => p.id === local.id)) {
                combined.push(local);
              }
            });
            userPurchases = combined;
          }
        } catch (e) {
          console.log('Erro ao buscar compras locais:', e);
        }

        setPurchases(userPurchases);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const totalSpent = purchases.reduce((sum, p) => sum + p.product_price, 0);
  const totalPurchases = purchases.length;
  const lastPurchaseDate = purchases.length > 0 
    ? new Date(purchases[0].created_at || '').toLocaleDateString('pt-AO')
    : 'Nenhuma compra';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO').format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <div className="lg:ml-64">
        <main className="p-4 lg:p-8 container mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Minhas Compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Valor Total Gasto</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{formatPrice(totalSpent)} Kz</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Número de Compras</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{totalPurchases}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Última Compra</CardTitle>
              </CardHeader>
              <CardContent>{lastPurchaseDate}</CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                </div>
              ) : purchases.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Ainda não tem compras.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Produto</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Loja</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Valor</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase) => (
                        <tr key={purchase.id} className="border-b border-border last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {purchase.product_image && (
                                <img
                                  src={purchase.product_image}
                                  alt={purchase.product_name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              )}
                              <span className="font-medium text-sm">{purchase.product_name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{purchase.store_name}</td>
                          <td className="py-4 text-right text-sm font-medium text-primary">
                            {formatPrice(purchase.product_price)} Kz
                          </td>
                          <td className="py-4 text-right text-sm text-muted-foreground">
                            {purchase.created_at 
                              ? new Date(purchase.created_at).toLocaleDateString('pt-AO')
                              : '—'
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardCompras;
