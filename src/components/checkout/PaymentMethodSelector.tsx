import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/lib/paymentSimulator";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | undefined;
  onSelect: (method: PaymentMethod) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
}

const methods: {
  id: PaymentMethod;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: "multicaixa_express",
    icon: <CreditCard className="w-5 h-5" />,
    title: "Multicaixa Express",
    description: "Pagamento instantâneo via rede Multicaixa",
  },
  {
    id: "unitel_money",
    icon: <Smartphone className="w-5 h-5" />,
    title: "Unitel Money",
    description: "Carteira digital da operadora Unitel",
  },
  {
    id: "bank_transfer",
    icon: <Building2 className="w-5 h-5" />,
    title: "Transferência Bancária (IBAN)",
    description: "Transferência directa para a conta do vendedor",
  },
];

const PaymentMethodSelector = ({
  selected,
  onSelect,
  phone,
  onPhoneChange,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-3">
      <p className="font-semibold text-sm">Método de Pagamento</p>
      {methods.map((method) => {
        const isSelected = selected === method.id;
        return (
          <div key={method.id}>
            <div
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                isSelected
                  ? "border-orange-500 bg-orange-50"
                  : "border-border hover:border-orange-300"
              }`}
              onClick={() => onSelect(method.id)}
            >
              <div className="text-primary">{method.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{method.title}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </div>
            {isSelected && method.id !== "bank_transfer" && (
              <div className="mt-2 pl-2">
                <Label htmlFor={`phone-${method.id}`} className="text-xs text-muted-foreground">
                  Número de telefone (9XX XXX XXX)
                </Label>
                <Input
                  id={`phone-${method.id}`}
                  type="tel"
                  placeholder="923 456 789"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            {isSelected && method.id === "bank_transfer" && (
              <p className="text-xs text-muted-foreground mt-2 pl-2">
                O IBAN do vendedor será exibido no comprovativo.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
