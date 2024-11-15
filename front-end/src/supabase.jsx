/* global process */

// Vite example
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Supabase = createClient(supabaseUrl, supabaseAnonKey);

export default Supabase;
