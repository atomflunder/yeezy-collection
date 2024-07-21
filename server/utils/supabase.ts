import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

/**
 * A new supabase client.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

