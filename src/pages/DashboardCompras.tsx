import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserSidebar from '@/components/dashboard/UserSidebar';
import Footer from '@/components/layout/Footer';

const DashboardCompras: React.FC = () => {
  // Mocked empty state for now
  const totalSpent = 0;
  const purchases: any[] = [];

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
              <CardContent className="text-3xl font-bold">{totalSpent} Kz</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Número de Compras</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{purchases.length}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Última Compra</CardTitle>
              </CardHeader>
              <CardContent>{purchases.length === 0 ? 'Nenhuma compra' : '—'}</CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Ainda não tem compras.</div>
              ) : (
                <ul>
                  {purchases.map((p, i) => (
                    <li key={i}>{/* render purchase */}</li>
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

export default DashboardCompras;
