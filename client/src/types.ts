export type UserRole = 'visitor' | 'consumer' | 'promoter' | 'admin'
export type EventCategory = 'Música' | 'Cultura' | 'Gastronomia' | 'Natureza' | 'Esporte' | 'Família' | (string & {})
export type AccessTag = 'Acessível para cadeira de rodas' | 'Libras' | 'Audiodescrição' | 'Pet friendly' | 'Espaço família'
export type EventStatus = 'approved' | 'pending' | 'rejected'

export interface EventItem {
  id: string
  title: string
  category: EventCategory
  date: string
  time: string
  endTime: string
  venue: string
  address: string
  neighborhood: string
  description: string
  image: string
  price: string
  tags: AccessTag[]
  organizer: string
  status: EventStatus
  confirmations: number
  views: number
  ageRanges: { label: string; value: number }[]
  partners: { name: string; category: string; distance: string; detail: string }[]
  createdBy?: string
}

export interface TanagerUser {
  name: string
  email: string
  role: Exclude<UserRole, 'visitor'>
}

export interface NewsItem {
  id: string
  category: string
  minutes: number
  title: string
  excerpt: string
  date: string
  image: string
}
