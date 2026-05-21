// Este script é deprecated: a lógica de hide dos produtos foi integrada no App.tsx
// durante a inicialização do app. Mantém-se por referência histórica.

import { supabase } from '@/integrations/supabase/client';

export async function hideTestProducts() {
  const productIds = [
    '7293fee2-9339-419b-bb0a-3c2462202779',
    '9f00790e-86df-48c4-8252-732b882a684c',
    '7c94008e-5822-481a-b0f3-7768387c8a50',
    '5cbb73d1-c3eb-45e6-a835-94a4c489d706'
  ];

  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .in('id', productIds);

    if (error) {
      console.error('❌ Erro ao desativar produtos:', error);
      return false;
    } else {
      console.log('✅ 4 produtos desativados com sucesso');
      return true;
    }
  } catch (err) {
    console.error('❌ Erro ao executar script:', err);
    return false;
  }
}
