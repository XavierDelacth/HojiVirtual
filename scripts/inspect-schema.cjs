const { createClient } = require('@supabase/supabase-js');
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false }
});

(async () => {
  try {
    const { data, error } = await supabase.from('pg_catalog.pg_tables').select('schemaname,tablename').limit(200);
    console.log('PG TABLES ERROR', error);
    console.log('PG TABLES DATA', data);

    const { data: info, error: infoError } = await supabase.from('information_schema.tables').select('table_schema,table_name').limit(200);
    console.log('INFO SCHEMA ERROR', infoError);
    console.log('INFO SCHEMA DATA', info);
  } catch (err) {
    console.error('ERR', err);
  }
})();
