'use client'

import { useSession } from "@clerk/nextjs";
import { DotsLoader } from "@components/ui/loader/dots-loader";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SupabaseContext = {
  supabase: SupabaseClient | null
  isLoaded: boolean
}

const Context = createContext<SupabaseContext>({
  supabase: null,
  isLoaded: false
})

export default function SupabaseProvider( { children }: { children: React.ReactNode } ) {
  const { session } = useSession()
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!session) return

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        accessToken: () => session.getToken({ template: "supabase" })
      }
    )

    setSupabase(client)
    setLoaded(true)
  }, [session])

  return (
    <Context.Provider value={{ supabase, isLoaded }}>
      {!isLoaded ? <DotsLoader /> : children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }

  return {
    supabase: context.supabase,
    isLoaded: context.isLoaded
  }
}