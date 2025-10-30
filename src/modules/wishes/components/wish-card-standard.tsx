'use client'

import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { ExternalLink, Heart, Globe } from 'lucide-react'
import { Button } from '@components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'

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
  isFavorite = false
}: WishCardStandardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const needsTooltip = description && description.length > 80

  return (
    <Card className='group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1 overflow-hidden'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight'>
              {title}
            </h3>
            <div className='flex items-center gap-2 mt-2'>
              <Globe className='h-3.5 w-3.5 text-muted-foreground' />
              <Badge variant='outline' className='text-xs font-medium'>
                {getDomain(url)}
              </Badge>
            </div>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='h-9 w-9 p-0 shrink-0 hover:bg-transparent group/heart'
            onClick={onToggleFavorite}
          >
            <Heart
              className={`h-4 w-4 transition-all duration-200 ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-muted-foreground group-hover/heart:text-red-400 group-hover/heart:scale-105'
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='h-12 mb-4 flex items-start'>
          {description ? (
            needsTooltip ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className='text-sm text-muted-foreground leading-relaxed truncate cursor-help'>
                      {description}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>
                    <p className='text-sm'>{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                {description}
              </p>
            )
          ) : (
            <div className='h-full' />
          )}
        </div>
        <Button
          variant='secondary'
          size='sm'
          className='w-full transition-all'
          onClick={() => window.open(url, '_blank')}
        >
          <ExternalLink className='h-4 w-4 mr-2' />
          Ver sitio
        </Button>
      </CardContent>
    </Card>
  )
}
