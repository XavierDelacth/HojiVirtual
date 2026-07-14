import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DeliveryZone, FEE_CONFIG, formatKz } from "@/lib/feeEngine";

interface DeliveryOptionsProps {
  selectedZone: DeliveryZone | undefined;
  onZoneChange: (zone: DeliveryZone | undefined) => void;
  isUrgent: boolean;
  onUrgentChange: (val: boolean) => void;
  withPackaging: boolean;
  onPackagingChange: (val: boolean) => void;
  withGiftWrap: boolean;
  onGiftWrapChange: (val: boolean) => void;
}

const zones: { value: string; label: string; fee: number }[] = [
  { value: "none", label: "Sem entrega (levantamento)", fee: 0 },
  { value: "zona1", label: `Zona 1 — Luanda Centro (${formatKz(FEE_CONFIG.deliveryFees.zona1)})`, fee: FEE_CONFIG.deliveryFees.zona1 },
  { value: "zona2", label: `Zona 2 — Viana / Kilamba (${formatKz(FEE_CONFIG.deliveryFees.zona2)})`, fee: FEE_CONFIG.deliveryFees.zona2 },
  { value: "zona3", label: `Zona 3 — Talatona / Belas (${formatKz(FEE_CONFIG.deliveryFees.zona3)})`, fee: FEE_CONFIG.deliveryFees.zona3 },
];

const DeliveryOptions = ({
  selectedZone,
  onZoneChange,
  isUrgent,
  onUrgentChange,
  withPackaging,
  onPackagingChange,
  withGiftWrap,
  onGiftWrapChange,
}: DeliveryOptionsProps) => {
  const currentValue = selectedZone ?? "none";
  const hasZone = selectedZone !== undefined;

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-sm mb-2">Entrega</p>
        <RadioGroup
          value={currentValue}
          onValueChange={(val) => onZoneChange(val === "none" ? undefined : (val as DeliveryZone))}
        >
          {zones.map((zone) => (
            <div key={zone.value} className="flex items-center gap-2">
              <RadioGroupItem value={zone.value} id={`zone-${zone.value}`} />
              <Label htmlFor={`zone-${zone.value}`} className="text-sm cursor-pointer">
                {zone.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-sm mb-2">Opções adicionais</p>
        {hasZone && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="urgent"
              checked={isUrgent}
              onCheckedChange={(val) => onUrgentChange(val === true)}
            />
            <Label htmlFor="urgent" className="text-sm cursor-pointer">
              Entrega urgente (+{formatKz(FEE_CONFIG.urgentDeliveryFee)})
            </Label>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Checkbox
            id="packaging"
            checked={withPackaging}
            onCheckedChange={(val) => onPackagingChange(val === true)}
          />
          <Label htmlFor="packaging" className="text-sm cursor-pointer">
            Embalagem protegida (+{formatKz(FEE_CONFIG.packagingFeePerItem)}/item)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="giftwrap"
            checked={withGiftWrap}
            onCheckedChange={(val) => onGiftWrapChange(val === true)}
          />
          <Label htmlFor="giftwrap" className="text-sm cursor-pointer">
            Saco para presente (+{formatKz(FEE_CONFIG.giftWrapFee)})
          </Label>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
