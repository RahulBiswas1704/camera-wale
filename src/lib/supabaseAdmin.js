import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

// Create a supabase client with the service_role key to bypass RLS policies
// This should ONLY be used in Server Actions or API routes, NEVER exposed to the client.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
