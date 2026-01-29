import { stores as mockStores } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';

export interface ResolvedBankData {
  storeId: string;
  storeName: string;
  owner?: string;
  location?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  iban?: string | null;
  bank?: string | null;
}

/**
 * Resolve bank/store data for a product.
 * Priority:
 * 1) mock stores from `mockData`
 * 2) vendor profile in Supabase by sellerId
 * 3) vendor profile in localStorage fallback
 */
export const resolveBankData = async (product: any): Promise<ResolvedBankData | null> => {
  if (!product) return null;

  // Try mock stores first
  const mock = mockStores.find((s) => String(s.id) === String(product.storeId));
  if (mock) {
    return {
      storeId: String(mock.id),
      storeName: mock.name,
      owner: mock.owner,
      location: mock.location,
      image: mock.image,
      rating: mock.rating,
      reviewCount: mock.reviewCount,
      iban: (mock as any).iban || null,
      bank: (mock as any).bank || null,
    };
  }

  // If dynamic product, check sellerId or storeId pattern
  const sellerId = product.sellerId || (String(product.storeId).startsWith('store_') ? String(product.storeId).replace(/^store_/, '') : undefined);

  if (sellerId) {
    // Try Supabase first
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', sellerId)
        .maybeSingle();

      if (!error && profile) {
        // If Supabase has IBAN, return immediately
        if (profile.iban) {
          return {
            storeId: `store_${sellerId}`,
            storeName: profile.store_name || `Loja de ${profile.name || 'Vendedor'}`,
            owner: profile.name,
            location: profile.location,
            image: profile.avatar_url || undefined,
            rating: profile.rating || 0,
            reviewCount: profile.reviewCount || 0,
            iban: profile.iban || null,
            bank: profile.bankName || profile.bank || null,
          };
        }
        
        // If Supabase doesn't have IBAN, try localStorage fallback
        try {
          const rawLocal = localStorage.getItem(`hoji_profile_${sellerId}`);
          if (rawLocal) {
            const pLocal = JSON.parse(rawLocal);
            if (pLocal.iban) {
              return {
                storeId: `store_${sellerId}`,
                storeName: profile.store_name || `Loja de ${profile.name || 'Vendedor'}`,
                owner: profile.name,
                location: profile.location,
                image: profile.avatar_url || undefined,
                rating: profile.rating || 0,
                reviewCount: profile.reviewCount || 0,
                iban: pLocal.iban || null,
                bank: pLocal.bankName || pLocal.bank || null,
              };
            }
          }
        } catch (e) {
          // ignore localStorage errors
        }
        
        // If neither Supabase nor localStorage have IBAN, return Supabase data
        return {
          storeId: `store_${sellerId}`,
          storeName: profile.store_name || `Loja de ${profile.name || 'Vendedor'}`,
          owner: profile.name,
          location: profile.location,
          image: profile.avatar_url || undefined,
          rating: profile.rating || 0,
          reviewCount: profile.reviewCount || 0,
          iban: null,
          bank: null,
        };
      }
    } catch (e) {
      // ignore Supabase errors and try localStorage
    }

    // Fallback to localStorage (only if Supabase didn't return profile)
    try {
      const raw = localStorage.getItem(`hoji_profile_${sellerId}`);
      if (raw) {
        const p = JSON.parse(raw);
        return {
          storeId: `store_${sellerId}`,
          storeName: p.store_name || `Loja de ${p.name || 'Vendedor'}`,
          owner: p.name,
          location: p.location,
          image: p.avatar_url && p.avatar_url.length > 0 ? p.avatar_url : undefined,
          rating: 0,
          reviewCount: 0,
          iban: p.iban || null,
          bank: p.bankName || p.bank || null,
        };
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }

  return null;
};
