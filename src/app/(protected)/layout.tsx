import SupabaseProvider from "@lib/supabase/client-provider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) redirect('/sign-in')

  return (
    <SupabaseProvider>
      {children}
    </SupabaseProvider>
  )
}