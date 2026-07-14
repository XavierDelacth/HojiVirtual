import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSidebar from '@/components/dashboard/UserSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Download, Receipt } from 'lucide-react';

interface ReceiptRecord {
  id: string;
  secure_token: string | null;
  product_name: string;
  product_price: number;
  store_name: string;
  buyer_name: string;
  status: string;
  created_at: string;
  payment_method: string | null;
  buyer_total: number | null;
  transaction_id: string | null;
}

const paymentMethodLabel = (method: string | null) => {
  if (!method) return '—';
  if (method === 'multicaixa_express') return 'Multicaixa Express';
  if (method === 'unitel_money') return 'Unitel Money';
  if (method === 'bank_transfer') return 'Transferência Bancária';
  return method;
};

const DashboardComprovativos: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [receipts, setReceipts] = useState<ReceiptRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReceipts = async () => {
      setIsLoading(true);
      try {
        if (!user) {
          setReceipts([]);
          return;
        }

        const { data, error } = await supabase
          .from('purchases')
          .select('id, secure_token, product_name, product_price, store_name, buyer_name, status, created_at, payment_method, buyer_total, transaction_id')
          .eq('buyer_id', user.id)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar comprovativos:', error);
          setReceipts([]);
        } else {
          setReceipts(data || []);
        }
      } catch (e) {
        console.error('Erro ao carregar comprovativos:', e);
        setReceipts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadReceipts();
  }, [user]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-AO').format(price);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        <UserSidebar />
        <div className="lg:ml-64 flex-1">
          <main className="p-4 lg:p-8 container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Comprovativos</h1>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Comprovativos</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                  </div>
                ) : receipts.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Receipt className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    Ainda não tem comprovativos.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {receipts.map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-muted/30 rounded-lg border border-border"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{r.product_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {r.created_at
                              ? new Date(r.created_at).toLocaleDateString('pt-AO')
                              : '—'}{' '}
                            — {r.id.slice(0, 8).toUpperCase()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {paymentMethodLabel(r.payment_method)}
                            {r.buyer_total != null && r.buyer_total > 0 && (
                              <> — Total: {formatPrice(r.buyer_total)} Kz</>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="font-semibold text-sm">
                            {formatPrice(r.product_price)} Kz
                          </div>
                          {r.secure_token ? (
                            <Link to={`/comprovativo/${r.id}?token=${r.secure_token}`}>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                                Ver
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              title="Comprovativo sem token de acesso"
                            >
                              Indisponível
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardComprovativos;
