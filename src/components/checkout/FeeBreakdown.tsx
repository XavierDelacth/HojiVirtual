import { FeeBreakdown as FeeBreakdownType, formatKz } from "@/lib/feeEngine";

interface FeeBreakdownProps {
  fees: FeeBreakdownType;
  className?: string;
}

const FeeBreakdown = ({ fees, className = "" }: FeeBreakdownProps) => {
  const rows: { label: string; value: number; showIf?: boolean }[] = [
    { label: "Subtotal", value: fees.subtotal },
    { label: "Taxa por item (5%)", value: fees.itemFee, showIf: fees.itemFee > 0 },
    { label: "Taxa de processamento (1,5%)", value: fees.processingFee, showIf: fees.processingFee > 0 },
    { label: "Taxa de entrega", value: fees.deliveryFee, showIf: fees.deliveryFee > 0 },
    { label: "Entrega urgente", value: fees.urgentFee, showIf: fees.urgentFee > 0 },
    { label: "Pedido mínimo", value: fees.smallOrderFee, showIf: fees.smallOrderFee > 0 },
    { label: "Embalagem", value: fees.packagingFee, showIf: fees.packagingFee > 0 },
    { label: "Saco para presente", value: fees.giftWrapFee, showIf: fees.giftWrapFee > 0 },
  ];

  return (
    <div className={`bg-orange-50 border border-orange-200 rounded-xl p-4 ${className}`}>
      <p className="font-semibold text-sm mb-3">Resumo do Pagamento</p>
      <div className="space-y-1.5">
        {rows.map(
          (row) =>
            (row.showIf === undefined || row.showIf) && (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium">{formatKz(row.value)}</span>
              </div>
            )
        )}
      </div>
      <hr className="my-2 border-orange-200" />
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total a pagar</span>
        <span className="font-bold text-orange-600">{formatKz(fees.buyerTotal)}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        O vendedor recebe {formatKz(fees.sellerReceives)} após deduções da plataforma.
      </p>
    </div>
  );
};

export default FeeBreakdown;
