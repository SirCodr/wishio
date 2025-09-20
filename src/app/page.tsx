import { WishCardStandard } from "@modules/wishes/components/wish-card-standard"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { Heart, Plus } from "lucide-react"
import { Tables } from "@lib/supabase/database.types"
import { createServerClient } from "@lib/supabase/server"

export default async function Home() {
  const supabase = await createServerClient()
  const { data: wishes } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false })
    .overrideTypes<Tables<'wishes'>>()

  return (
    <div className="min-h-screen bg-background transition-all duration-500 theme-modern">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Wishio</h1>
          <p className="text-muted-foreground text-lg">Centraliza todos tus deseos de compra en un solo lugar</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">Mis Wishes</h2>
            <Badge variant="secondary" className="text-sm">
              {wishes.length} productos
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>{wishes.filter((w) => w.isFavorite).length} favoritos</span>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Agregar wish
          </Button>
        </div>

        {/* Wishes Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {wishes.map((wish) => (
            <WishCardStandard
              key={wish.id}
              title={wish.title}
              url={wish.url}
              description={wish.description}
              isFavorite={wish.isFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
