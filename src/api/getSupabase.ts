import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.GATSBY_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
