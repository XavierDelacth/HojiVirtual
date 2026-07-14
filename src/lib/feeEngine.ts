export const FEE_CONFIG = {
  itemFeePercent: 0.05,
  processingFeePercent: 0.015,
  deliveryFees: {
    zona1: 1000,
    zona2: 4000,
    zona3: 2000,
  } as const,
  urgentDeliveryFee: 1000,
  smallOrderThreshold: 2000,
  smallOrderFee: 300,
  packagingFeePerItem: 150,
  giftWrapFee: 1500,
  rescheduleFee: 400,
  cancellationFee: 500,
  exchangeFee: 350,
};

export type DeliveryZone = keyof typeof FEE_CONFIG.deliveryFees;

export interface FeeCalculationParams {
  subtotal: number;
  itemCount: number;
  deliveryZone?: DeliveryZone;
  isUrgent?: boolean;
  withPackaging?: boolean;
  withGiftWrap?: boolean;
}

export interface FeeBreakdown {
  subtotal: number;
  itemFee: number;
  processingFee: number;
  deliveryFee: number;
  urgentFee: number;
  smallOrderFee: number;
  packagingFee: number;
  giftWrapFee: number;
  platformRevenue: number;
  sellerReceives: number;
  buyerTotal: number;
}

export function calculateFees(params: FeeCalculationParams): FeeBreakdown {
  const {
    subtotal,
    itemCount,
    deliveryZone,
    isUrgent,
    withPackaging,
    withGiftWrap,
  } = params;

  const itemFee = +(subtotal * FEE_CONFIG.itemFeePercent * itemCount).toFixed(2);
  const processingFee = +(subtotal * FEE_CONFIG.processingFeePercent).toFixed(2);
  const deliveryFee = deliveryZone ? FEE_CONFIG.deliveryFees[deliveryZone] : 0;
  const urgentFee = isUrgent ? FEE_CONFIG.urgentDeliveryFee : 0;
  const smallOrderFee = subtotal < FEE_CONFIG.smallOrderThreshold ? FEE_CONFIG.smallOrderFee : 0;
  const packagingFee = withPackaging ? FEE_CONFIG.packagingFeePerItem * itemCount : 0;
  const giftWrapFee = withGiftWrap ? FEE_CONFIG.giftWrapFee : 0;
  const platformRevenue = +(itemFee + processingFee + deliveryFee + urgentFee + smallOrderFee + packagingFee + giftWrapFee).toFixed(2);
  const sellerReceives = +(subtotal - itemFee - processingFee).toFixed(2);
  const buyerTotal = +(subtotal + platformRevenue).toFixed(2);

  return {
    subtotal,
    itemFee,
    processingFee,
    deliveryFee,
    urgentFee,
    smallOrderFee,
    packagingFee,
    giftWrapFee,
    platformRevenue,
    sellerReceives,
    buyerTotal,
  };
}

export function formatKz(value: number): string {
  return `${value.toLocaleString('pt-AO')} Kz`;
}
