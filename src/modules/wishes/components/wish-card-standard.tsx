'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  DollarSign,
  ExternalLink,
  Globe,
  Heart,
  MoreVertical,
  Pencil,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import WishForm from './wish-form'
import { DeleteWishDialog } from './delete-wish-form'
import { Tables } from '@/lib/supabase/database.types'
import WishCardImagePlaceHolder from './wish-card-image-place-holder'
import { formatDateToString } from '@/lib/dateFormat'

const MODALS = {
  EDIT: 'edit',
  DELETE: 'delete'
} as const

interface WishCardStandardProps {
  wish: Tables<'wishes'>
  onToggleFavorite?: () => void
  isFavorite?: boolean
}

export function WishCardStandard({ wish }: WishCardStandardProps) {
  const {
    title,
    url,
    description,
    image_url,
    created_at,
    is_favorite,
    status,
    priority,
    price
  } = wish
  const [currentModal, setCurrentModal] = useState<
    (typeof MODALS)[keyof typeof MODALS] | null
  >(null)
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const handleFormSubmit = () => {
    setCurrentModal(null)
  }

  const onToggleFavorite = () => {
    // Placeholder for favorite toggle functionality
  }

  const formatPrice = (price?: string) => {
    if (!price) return null
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(price))
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    wishlist: {
      label: 'En Lista',
      color: 'bg-blue-500/10 text-blue-700 border-blue-200'
    },
    purchased: {
      label: 'Comprado',
      color: 'bg-green-500/10 text-green-700 border-green-200'
    },
    discarded: {
      label: 'Descartado',
      color: 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

  const priorityConfig: Record<string, { label: string; color: string }> = {
    high: {
      label: 'Prioridad Alta',
      color: 'bg-red-500/10 text-red-700 border-red-200'
    },
    medium: {
      label: 'Prioridad Media',
      color: 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
    },
    low: {
      label: 'Prioridad Baja',
      color: 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

  return (
    <>
      <Card className='group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden relative'>
        <div className='flex flex-col md:flex-row gap-4 p-4'>
          <div className='relative w-full md:w-32 h-48 md:h-32 shrink-0 bg-muted rounded-lg overflow-hidden'>
            {image_url ? (
              <img
                src={image_url}
                alt={title}
                className='w-full h-full object-cover'
                loading='lazy'
              />
            ) : (
              <WishCardImagePlaceHolder title={title} />
            )}
            <Button
              variant='ghost'
              size='sm'
              className='absolute top-2 right-2 h-8 w-8 md:h-7 md:w-7 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90'
              onClick={onToggleFavorite}
            >
              <Heart
                className={`h-4 md:h-3.5 w-4 md:w-3.5 transition-all ${
                  is_favorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-muted-foreground'
                }`}
              />
            </Button>
          </div>

          <div className='flex-1 min-w-0 flex flex-col'>
            <div className='flex items-start justify-between gap-2 mb-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className='font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight flex-1 cursor-default capitalize'>
                      {title}
                    </h3>
                  </TooltipTrigger>
                  {title.length > 50 && (
                    <TooltipContent className='max-w-xs'>
                      <p className='text-sm'>{title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <div className='flex items-center gap-1 shrink-0'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-primary hover:bg-primary/10'
                  title='Ver producto'
                  onClick={() => window.open(url, '_blank')}
                >
                  <ExternalLink className='h-4 w-4' />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                      <MoreVertical className='h-4 w-4 text-muted-foreground' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-40'>
                    <DropdownMenuItem
                      onClick={() => setCurrentModal(MODALS.EDIT)}
                      className='cursor-pointer'
                    >
                      <Pencil className='h-4 w-4 mr-2' />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setCurrentModal(MODALS.DELETE)}
                      className='cursor-pointer text-destructive focus:text-destructive'
                    >
                      <Trash2 className='h-4 w-4 mr-2' />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className='flex items-center gap-2 mb-2 flex-wrap'>
              <Badge variant='outline' className='text-xs'>
                {getDomain(url)}
              </Badge>
              {statusConfig[status] && (
                <Badge
                  variant='outline'
                  className={`text-xs ${statusConfig[status].color}`}
                >
                  {statusConfig[status].label}
                </Badge>
              )}
              {priorityConfig[priority] && (
                <Badge
                  variant='outline'
                  className={`text-xs ${priorityConfig[priority].color}`}
                >
                  {priorityConfig[priority].label}
                </Badge>
              )}
            </div>

            <div className='h-10 mb-2'>
              {description && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2 cursor-default'>
                        {description}
                      </p>
                    </TooltipTrigger>
                    {description.length > 80 && (
                      <TooltipContent className='max-w-xs'>
                        <p className='text-sm'>{description}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <div className='flex items-center gap-3 mt-auto'>
              {price && (
                <div className='flex items-center text-foreground'>
                  <DollarSign className='h-3.5 w-3.5 text-primary' />
                  <span className='text-sm font-medium'>
                    {formatPrice(price)}
                  </span>
                </div>
              )}
              <div className='flex items-center gap-1 text-muted-foreground'>
                <Calendar className='h-3.5 w-3.5' />
                <span className='text-xs capitalize'>
                  {formatDateToString(created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {currentModal === MODALS.EDIT && (
        <WishForm
          key={MODALS.EDIT + wish.id}
          isOpen={true}
          setOpen={(isOpen: boolean) => {
            if (isOpen) setCurrentModal(MODALS.EDIT)
            else setCurrentModal(null)
          }}
          onSubmit={handleFormSubmit}
          wish={wish}
        />
      )}

      {currentModal === MODALS.DELETE && (
        <DeleteWishDialog
          open={true}
          onOpenChange={(isOpen: boolean) => {
            if (isOpen) setCurrentModal(MODALS.DELETE)
            else setCurrentModal(null)
          }}
          wish={wish}
        />
      )}
    </>
  )
}
