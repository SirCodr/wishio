'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Globe, MoreVertical, Pencil, Trash2 } from 'lucide-react'
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

  const needsTooltip = wish.description && wish.description.length > 80

  const handleFormSubmit = () => {
    setCurrentModal(null)
  }

  return (
    <>
      <Card className='group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1 overflow-hidden'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight'>
                {wish.title}
              </h3>
              <div className='flex items-center gap-2 mt-2'>
                <Globe className='h-3.5 w-3.5 text-muted-foreground' />
                <Badge variant='outline' className='text-xs font-medium'>
                  {getDomain(wish.url)}
                </Badge>
              </div>
            </div>
            <div className='flex items-center gap-1 shrink-0'>
              {/*
              //TODO: Re-add favorite functionality
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
            </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-9 w-9 p-0 hover:bg-transparent'
                  >
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
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='h-12 mb-4 flex items-start'>
            {wish.description ? (
              needsTooltip ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className='text-sm text-muted-foreground leading-relaxed truncate cursor-help'>
                        {wish.description}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className='max-w-xs'>
                      <p className='text-sm'>{wish.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                  {wish.description}
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
            onClick={() => window.open(wish.url, '_blank')}
          >
            <ExternalLink className='h-4 w-4 mr-2' />
            Ver sitio
          </Button>
        </CardContent>
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
