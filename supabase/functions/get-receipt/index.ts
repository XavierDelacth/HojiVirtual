import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const purchaseId = url.searchParams.get('id');
    const token = url.searchParams.get('token');

    console.log('Receipt request:', { purchaseId, hasToken: !!token });

    if (!purchaseId || !token) {
      console.error('Missing required parameters');
      return new Response(
        JSON.stringify({ error: 'ID da compra e token são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client with service role to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch purchase with matching ID AND token
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('id, buyer_name, buyer_phone, product_name, product_price, store_name, product_image, status, created_at, validated_at, expires_at')
      .eq('id', purchaseId)
      .eq('secure_token', token)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar comprovativo' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!purchase) {
      console.log('Purchase not found or token mismatch');
      return new Response(
        JSON.stringify({ error: 'Comprovativo não encontrado ou token inválido' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if purchase has expired
    if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
      console.log('Purchase expired:', purchase.id);
      return new Response(
        JSON.stringify({ error: 'Comprovativo expirado' }),
        { 
          status: 410, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Receipt found successfully');
    return new Response(
      JSON.stringify({ purchase }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});