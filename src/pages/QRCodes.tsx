import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { 
  QrCode, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  User, 
  Package,
  AlertCircle
} from "lucide-react";

interface QRCodeData {
  id: string;
  code: string;
  buyer: string;
  product: string;
  amount: number;
  createdAt: Date;
  expiresAt: Date;
  status: "active" | "validated" | "expired";
  validatedAt?: Date;
}

const mockQRCodes: QRCodeData[] = [
  {
    id: "1",
    code: "HV-2024-001234",
    buyer: "João Silva",
    product: "Vestido Tradicional",
    amount: 15000,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    expiresAt: new Date(Date.now() + 1000 * 60 * 150),
    status: "active"
  },
  {
    id: "2",
    code: "HV-2024-001235",
    buyer: "Maria Santos",
    product: "Cesto Artesanal",
    amount: 8500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    expiresAt: new Date(Date.now() + 1000 * 60 * 120),
    status: "active"
  },
  {
    id: "3",
    code: "HV-2024-001230",
    buyer: "Pedro Costa",
    product: "Óleo de Palma 5L",
    amount: 4500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "validated",
    validatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3)
  },
  {
    id: "4",
    code: "HV-2024-001228",
    buyer: "Ana Ferreira",
    product: "Pano Tradicional",
    amount: 12000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: "expired"
  }
];

const QRCodes = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>(mockQRCodes);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [validationModal, setValidationModal] = useState(false);
  const [, setTick] = useState(0);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    if (diff <= 0) return "Expirado";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleValidate = (qr: QRCodeData) => {
    setSelectedQR(qr);
    setValidationModal(true);
  };

  const confirmValidation = () => {
    if (selectedQR) {
      setQrCodes(prev => prev.map(qr => 
        qr.id === selectedQR.id 
          ? { ...qr, status: "validated" as const, validatedAt: new Date() }
          : qr
      ));
      setValidationModal(false);
      setSelectedQR(null);
    }
  };

  const activeQRs = qrCodes.filter(qr => qr.status === "active");
  const validatedQRs = qrCodes.filter(qr => qr.status === "validated");
  const expiredQRs = qrCodes.filter(qr => qr.status === "expired");

  const QRCodeCard = ({ qr }: { qr: QRCodeData }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-mono font-bold text-sm">{qr.code}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <User className="w-3 h-3" />
                <span>{qr.buyer}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Package className="w-3 h-3" />
                <span>{qr.product}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-primary">{qr.amount.toLocaleString('pt-AO')} Kz</p>
            {qr.status === "active" && (
              <div className="flex items-center gap-1 mt-1 text-sm">
                <Clock className="w-3 h-3 text-orange-500" />
                <span className="font-mono text-orange-500">{getTimeRemaining(qr.expiresAt)}</span>
              </div>
            )}
            {qr.status === "validated" && (
              <Badge className="mt-1 bg-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Validado
              </Badge>
            )}
            {qr.status === "expired" && (
              <Badge variant="destructive" className="mt-1">
                <XCircle className="w-3 h-3 mr-1" />
                Expirado
              </Badge>
            )}
          </div>
        </div>
        
        {qr.status === "active" && (
          <Button 
            className="w-full mt-4" 
            onClick={() => handleValidate(qr)}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Validar QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Helmet>
        <title>QR Codes | HojiVirtual</title>
        <meta name="description" content="Gerencie e valide QR Codes de transações no HojiVirtual" />
      </Helmet>

      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 p-6 lg:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">QR Codes</h1>
            <p className="text-muted-foreground">Gerencie e valide os QR Codes das suas transações</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-orange-500/10 rounded-full w-fit mx-auto mb-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl font-bold">{activeQRs.length}</p>
                <p className="text-sm text-muted-foreground">Ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-green-500/10 rounded-full w-fit mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold">{validatedQRs.length}</p>
                <p className="text-sm text-muted-foreground">Validados</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-destructive/10 rounded-full w-fit mx-auto mb-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-2xl font-bold">{expiredQRs.length}</p>
                <p className="text-sm text-muted-foreground">Expirados</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="ativos" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ativos">Ativos ({activeQRs.length})</TabsTrigger>
              <TabsTrigger value="validados">Validados ({validatedQRs.length})</TabsTrigger>
              <TabsTrigger value="expirados">Expirados ({expiredQRs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="ativos" className="space-y-4">
              {activeQRs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum QR Code ativo no momento</p>
                  </CardContent>
                </Card>
              ) : (
                activeQRs.map(qr => <QRCodeCard key={qr.id} qr={qr} />)
              )}
            </TabsContent>

            <TabsContent value="validados" className="space-y-4">
              {validatedQRs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum QR Code validado ainda</p>
                  </CardContent>
                </Card>
              ) : (
                validatedQRs.map(qr => <QRCodeCard key={qr.id} qr={qr} />)
              )}
            </TabsContent>

            <TabsContent value="expirados" className="space-y-4">
              {expiredQRs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <XCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum QR Code expirado</p>
                  </CardContent>
                </Card>
              ) : (
                expiredQRs.map(qr => <QRCodeCard key={qr.id} qr={qr} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Validation Modal */}
      <Dialog open={validationModal} onOpenChange={setValidationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Validação</DialogTitle>
          </DialogHeader>
          {selectedQR && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <QrCode className="w-16 h-16 mx-auto text-primary mb-2" />
                <p className="font-mono font-bold">{selectedQR.code}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comprador:</span>
                  <span className="font-medium">{selectedQR.buyer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produto:</span>
                  <span className="font-medium">{selectedQR.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-bold text-primary">{selectedQR.amount.toLocaleString('pt-AO')} Kz</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setValidationModal(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={confirmValidation}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodes;
