"use client"

import { ShoppingBag, Star, Plus } from "lucide-react"
import { Button } from "@components/ui/button"

interface IllustratedEmptyProps {
  onAddWish?: () => void
}

export function EmptyWishes({ onAddWish }: IllustratedEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-8">
        <div className="w-32 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
          <ShoppingBag className="h-12 w-12 text-primary/60" />

          <div className="absolute top-2 right-2">
            <Star className="h-4 w-4 text-primary/40" />
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1">
            <div className="w-1 h-1 bg-primary/20 rounded-full"></div>
          </div>
        </div>

        {/* Líneas decorativas */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1">
            <div className="w-8 h-0.5 bg-primary/20 rounded-full"></div>
            <div className="w-4 h-0.5 bg-primary/10 rounded-full"></div>
            <div className="w-6 h-0.5 bg-primary/15 rounded-full"></div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-3 text-balance">Crea tu primera lista de deseos</h3>

      <p className="text-muted-foreground text-center mb-8 max-w-md text-pretty">
        Guarda productos de cualquier tienda online y mantén organizados todos tus deseos de compra.
      </p>

      <Button onClick={onAddWish} className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
        <Plus className="h-5 w-5 mr-2" />
        Comenzar ahora
      </Button>
    </div>
  )
}
