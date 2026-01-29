import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSidebar from '@/components/dashboard/UserSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const DashboardComprovativos: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReceipts = () => {
      setIsLoading(true);
      try {
        const all = JSON.parse(localStorage.getItem('hoji_purchases') || '[]');
        if (user) {
          setReceipts(all.filter((r: any) => r.buyer_id === user.id));
        } else {
          // fallback: try to match by stored userEmail
          const email = localStorage.getItem('userEmail');
          if (email) setReceipts(all.filter((r: any) => r.buyer_id === email));
          else setReceipts(all);
        }
      } catch (e) {
        console.error('Erro ao carregar comprovativos locais:', e);
        setReceipts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadReceipts();

    // listen to storage changes (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'hoji_purchases') loadReceipts();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [user]);

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
                  <div className="p-8 text-center text-muted-foreground">Ainda não tem comprovativos gerados.</div>
                ) : (
                  <ul className="space-y-4">
                    {receipts.map((r) => (
                      <li key={r.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{r.product_name}</div>
                          <div className="text-sm text-muted-foreground">{r.created_at ? new Date(r.created_at).toLocaleDateString('pt-AO') : '—'} — {r.id?.slice(0,8).toUpperCase()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{Number(r.product_price).toLocaleString('pt-AO')} Kz</div>
                          <Button variant="outline" onClick={async () => {
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
                                <div style="padding:20px;">
                                  <div><strong>Referência:</strong> ${r.id}</div>
                                  <div><strong>Produto:</strong> ${r.product_name}</div>
                                  <div><strong>Valor:</strong> ${Number(r.product_price).toLocaleString('pt-AO')} Kz</div>
                                  <div><strong>Loja:</strong> ${r.store_name}</div>
                                  <div><strong>Comprador:</strong> ${r.buyer_name}</div>
                                  <div><strong>Data:</strong> ${r.created_at ? new Date(r.created_at).toLocaleString('pt-AO') : ''}</div>
                                </div>
                              `;

                              document.body.appendChild(element);
                              const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff', useCORS: true, windowWidth: 800 });
                              document.body.removeChild(element);
                              const imgData = canvas.toDataURL('image/png');
                              const pdf = new jsPDF('p', 'mm', 'a4');
                              const imgWidth = 200;
                              const imgHeight = (canvas.height * imgWidth) / canvas.width;
                              pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
                              pdf.save(`comprovativo_${r.id}.pdf`);
                              toast({ title: 'PDF gerado', description: `comprovativo_${r.id}.pdf` });
                            } catch (e) {
                              console.error('Erro ao gerar PDF do comprovativo:', e);
                              toast({ title: 'Erro', description: 'Não foi possível gerar o PDF.', variant: 'destructive' });
                            }
                          }}>
                            Download
                          </Button>
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
