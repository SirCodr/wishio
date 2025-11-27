import { OPTIONS_TYPE } from '@/types/types'
import { WISH_PRIORITY, WISH_STATUS } from '../types/wish'

export const WISH_STATUSES: WISH_STATUS[] = [
  'wishlist',
  'purchased',
  'discarded'
]
export const WISH_PRIORITIES: WISH_PRIORITY[] = ['low', 'medium', 'high']

export const PRIORITY_CONFIG: Record<WISH_PRIORITY, OPTIONS_TYPE> = {
  high: {
    label: 'Alta',
    color: 'bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20',
    activeColor: 'bg-red-500 text-white border-red-500'
  },
  medium: {
    label: 'Media',
    color:
      'bg-yellow-500/10 text-yellow-600 border-yellow-200 hover:bg-yellow-500/20',
    activeColor: 'bg-yellow-500 text-white border-yellow-500'
  },
  low: {
    label: 'Baja',
    color: 'bg-muted/50 text-muted-foreground border-muted hover:bg-muted',
    activeColor: 'bg-muted text-muted-foreground border-muted'
  }
}

export const STATUS_CONFIG: Record<WISH_STATUS, OPTIONS_TYPE> = {
  wishlist: {
    label: 'En Lista',
    color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
    activeColor: 'bg-primary text-primary-foreground border-primary'
  },
  purchased: {
    label: 'Comprado',
    color:
      'bg-yellow-500/10 text-yellow-600 border-yellow-200 hover:bg-yellow-500/20',
    activeColor: 'bg-yellow-500 text-white border-yellow-500'
  },
  discarded: {
    label: 'Descartado',
    color: 'bg-muted/50 text-muted-foreground border-muted hover:bg-muted',
    activeColor: 'bg-muted text-muted-foreground border-muted'
  }
}
