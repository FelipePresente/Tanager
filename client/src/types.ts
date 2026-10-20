export type UserRole = 'visitor' | 'consumer' | 'promoter' | 'admin'

export type EventCategory =
  | 'Música'
  | 'Cultura'
  | 'Gastronomia'
  | 'Natureza'
  | 'Esporte'
  | 'Família'
  | (string & {})

export type AccessTag =
  | 'Acessível para cadeira de rodas'
  | 'Libras'
  | 'Audiodescrição'
  | 'Pet friendly'
  | 'Espaço família'

export type EventStatus = 'approved' | 'pending' | 'rejected'

export interface EventAgeRange {
  label: string
  value: number
}

export interface EventPartner {
  name: string
  category: string
  distance: string
  detail: string
}

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
  latitude: number
  longitude: number
  description: string
  image: string
  price: string
  tags: AccessTag[]
  organizer: string
  status: EventStatus
  confirmations: number
  views: number
  ageRanges: EventAgeRange[]
  partners: EventPartner[]
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
