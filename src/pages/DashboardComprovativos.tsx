import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSidebar from '@/components/dashboard/UserSidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const DashboardComprovativos: React.FC = () => {
  // Mocked list empty for now
  const receipts: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <div className="lg:ml-64">
        <main className="p-4 lg:p-8 container mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Comprovativos</h1>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Comprovativos</CardTitle>
            </CardHeader>
            <CardContent>
              {receipts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Ainda não tem comprovativos gerados.
                </div>
              ) : (
                <ul className="space-y-4">
                  {receipts.map((r, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.productName}</div>
                        <div className="text-sm text-muted-foreground">{r.date} — {r.reference}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{r.value} Kz</div>
                        <Button variant="outline">Download</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardComprovativos;
