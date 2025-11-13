import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDateToString(date: Date | string): string {
  return format(date, 'MMMM dd, yyyy', { locale: es })
}
