import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL belum diisi di .env.local"
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "SUPABASE_ANON_KEY atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diisi di .env.local"
    );
  }

  if (!supabaseUrl.startsWith("https://")) {
    throw new Error(
      "Format NEXT_PUBLIC_SUPABASE_URL salah. Contoh yang benar: https://xxxx.supabase.co"
    );
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}