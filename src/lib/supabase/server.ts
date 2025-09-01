// lib/supabase/server.ts
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";

export async function createServerClient() {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: "supabase" }); // 👈 Clerk template para Supabase
  
  const cookieStore = await cookies();

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`, // 👈 mandas el token de Clerk
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // silencioso en RSC
          }
        },
      },
    }
  );
}
