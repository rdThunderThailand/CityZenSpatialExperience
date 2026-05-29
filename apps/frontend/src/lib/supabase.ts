import { createClient } from '@supabase/supabase-js';

// We will use the environment variables once connected to thunder_core_prj or our dedicated DB.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
