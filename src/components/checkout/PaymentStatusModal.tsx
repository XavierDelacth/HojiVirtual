import { useEffect, useState, useRef } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  PaymentRequest,
  PaymentStatus,
  PaymentStatusUpdate,
  streamPaymentStatus,
} from "@/lib/paymentSimulator";
import { formatKz } from "@/lib/feeEngine";

interface PaymentStatusModalProps {
  isOpen: boolean;
  paymentRequest: PaymentRequest | null;
  onSuccess: (transactionId: string) => void;
  onFailure: (reason: string) => void;
  onClose: () => void;
}

const PaymentStatusModal = ({
  isOpen,
  paymentRequest,
  onSuccess,
  onFailure,
  onClose,
}: PaymentStatusModalProps) => {
  const [currentStatus, setCurrentStatus] = useState<PaymentStatusUpdate | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [showFailureActions, setShowFailureActions] = useState(false);
  const generatorRef = useRef<AsyncGenerator<PaymentStatusUpdate> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !paymentRequest) return;

    cancelledRef.current = false;
    setShowFailureActions(false);

    const run = async () => {
      generatorRef.current = streamPaymentStatus(paymentRequest);
      for await (const update of generatorRef.current) {
        if (cancelledRef.current) break;
        setCurrentStatus(update);
        setStatus(update.status);

        if (update.status === "approved") {
          await new Promise((resolve) => setTimeout(resolve, 800));
          if (!cancelledRef.current) {
            onSuccess(update.transactionId!);
          }
        }

        if (update.status === "failed") {
          setTimeout(() => {
            if (!cancelledRef.current) {
              setShowFailureActions(true);
            }
          }, 1500);
        }
      }
    };

    run();

    return () => {
      cancelledRef.current = true;
    };
  }, [isOpen, paymentRequest, onSuccess, onFailure]);

  const handleClose = () => {
    cancelledRef.current = true;
    setStatus("idle");
    setCurrentStatus(null);
    setShowFailureActions(false);
    onClose();
  };

  const preventClose = status === "processing";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !preventClose) handleClose();
    }}>
      <DialogContent
        className="sm:max-w-sm"
        onPointerDownOutside={preventClose ? (e) => e.preventDefault() : undefined}
        onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Pagamento</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          {status === "pending" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="font-medium">{currentStatus?.message}</p>
            </>
          )}

          {status === "processing" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
              <p className="font-medium">{currentStatus?.message}</p>
              <p className="text-xs text-muted-foreground">Por favor não feches esta janela</p>
            </>
          )}

          {status === "approved" && (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="font-semibold text-lg">Pagamento confirmado!</p>
              {paymentRequest && (
                <p className="text-lg font-bold">{formatKz(paymentRequest.amount)}</p>
              )}
              {currentStatus?.transactionId && (
                <p className="text-xs text-muted-foreground font-mono">
                  ID: {currentStatus.transactionId}
                </p>
              )}
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="w-16 h-16 text-red-500" />
              <p className="font-semibold text-lg">Pagamento falhado</p>
              <p className="text-sm text-muted-foreground text-center">
                {currentStatus?.message}
              </p>
              {showFailureActions && (
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="hero" onClick={() => {
                    setStatus("idle");
                    setCurrentStatus(null);
                    setShowFailureActions(false);
                    onClose();
                  }}>
                    Tentar novamente
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusModal;
