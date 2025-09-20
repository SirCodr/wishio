"use client"

import { Card, CardContent, CardHeader } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { ExternalLink, Heart, Globe } from "lucide-react"
import { Button } from "@components/ui/button"

interface WishCardStandardProps {
  title: string
  url: string
  description?: string
  onToggleFavorite?: () => void
  isFavorite?: boolean
}

export function WishCardStandard({
  title,
  url,
  description,
  onToggleFavorite,
  isFavorite = false,
}: WishCardStandardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <Badge variant="outline" className="text-xs font-medium">
                {getDomain(url)}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-accent shrink-0" onClick={onToggleFavorite}>
            <Heart
              className={`h-4 w-4 transition-all ${
                isFavorite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-muted-foreground hover:text-red-500 hover:scale-110"
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">{description}</p>
        <Button
          variant="secondary"
          size="sm"
          className="w-full transition-all"
          onClick={() => window.open(url, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver producto
        </Button>
      </CardContent>
    </Card>
  )
}
