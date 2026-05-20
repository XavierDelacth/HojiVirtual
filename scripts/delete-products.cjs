const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase admin credentials. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const args = process.argv.slice(2);
const idArgs = args.filter((arg) => !arg.startsWith('--'));
const sellerIdArg = args.find((arg) => arg.startsWith('--seller-id='));
const allArg = args.includes('--all');
const confirmArg = args.includes('--yes');

if (!idArgs.length && !sellerIdArg && !allArg) {
  console.error('Usage: node scripts/delete-products.js <product-id-1> <product-id-2> ... [--seller-id=<seller_id>] [--all] [--yes]');
  console.error('Example: node scripts/delete-products.js 123e4567-e89b-12d3-a456-426614174000 --yes');
  console.error('Example: node scripts/delete-products.js --seller-id=84f3d91f-... --yes');
  console.error('Example: node scripts/delete-products.js --all --yes');
  process.exit(1);
}

if (!confirmArg) {
  console.error('Dangerous operation. Add --yes to confirm deletion.');
  process.exit(1);
}

(async () => {
  try {
    if (!idArgs.length && !sellerIdArg && !allArg) {
      console.error('No deletion filter provided. Use product IDs, --seller-id, or --all.');
      process.exit(1);
    }

    const query = supabase.from('products').delete();
    if (idArgs.length) {
      query.in('id', idArgs);
    }
    if (sellerIdArg) {
      const sellerId = sellerIdArg.split('=')[1];
      query.eq('seller_id', sellerId);
    }
    if (allArg) {
      // no filters; delete all rows
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error deleting products:', error);
      process.exit(1);
    }

    console.log(`Deleted ${Array.isArray(data) ? data.length : 0} product(s).`);
    console.log(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
