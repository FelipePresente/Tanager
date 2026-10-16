import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { categories as defaultCategories, mockEvents } from '../data/mockData'
import type { EventItem, TanagerUser } from '../types'

const STORAGE_KEYS = { events: 'tanager.events.v1', attendance: 'tanager.attendance.v1', ratings: 'tanager.ratings.v1', user: 'tanager.user.v1', categories: 'tanager.categories.v1' }

function stored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

interface TanagerContextValue {
  events: EventItem[]
  eventCategories: string[]
  attendanceIds: string[]
  ratings: Record<string, number>
  user: TanagerUser | null
  toggleAttendance: (id: string) => void
  rateEvent: (id: string, rating: number) => void
  saveEvent: (event: EventItem) => void
  moderateEvent: (id: string, status: 'approved' | 'rejected') => void
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
  signIn: (user: TanagerUser) => void
  signOut: () => void
}

const TanagerContext = createContext<TanagerContextValue | null>(null)

export function TanagerProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventItem[]>(() => stored(STORAGE_KEYS.events, mockEvents))
  const [attendanceIds, setAttendanceIds] = useState<string[]>(() => stored(STORAGE_KEYS.attendance, ['festival-mar', 'memoria-caiçara']))
  const [ratings, setRatings] = useState<Record<string, number>>(() => stored(STORAGE_KEYS.ratings, { 'memoria-caiçara': 5 }))
  const [user, setUser] = useState<TanagerUser | null>(() => stored<TanagerUser | null>(STORAGE_KEYS.user, null))
  const [customCategories, setCustomCategories] = useState<string[]>(() => stored(STORAGE_KEYS.categories, []))

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events)) }, [events])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.attendance, JSON.stringify(attendanceIds)) }, [attendanceIds])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ratings, JSON.stringify(ratings)) }, [ratings])
  useEffect(() => { if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user)); else localStorage.removeItem(STORAGE_KEYS.user) }, [user])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(customCategories)) }, [customCategories])

  const toggleAttendance = useCallback((id: string) => {
    setAttendanceIds((current) => current.includes(id) ? current.filter((eventId) => eventId !== id) : [...current, id])
  }, [])
  const rateEvent = useCallback((id: string, rating: number) => setRatings((current) => ({ ...current, [id]: rating })), [])
  const saveEvent = useCallback((event: EventItem) => setEvents((current) => [event, ...current]), [])
  const moderateEvent = useCallback((id: string, status: 'approved' | 'rejected') => setEvents((current) => current.map((event) => event.id === id ? { ...event, status } : event)), [])
  const addCategory = useCallback((category: string) => setCustomCategories((current) => current.some((item) => item.toLocaleLowerCase('pt-BR') === category.toLocaleLowerCase('pt-BR')) || defaultCategories.includes(category as typeof defaultCategories[number]) ? current : [...current, category]), [])
  const removeCategory = useCallback((category: string) => setCustomCategories((current) => current.filter((item) => item !== category)), [])
  const signIn = useCallback((nextUser: TanagerUser) => setUser(nextUser), [])
  const signOut = useCallback(() => setUser(null), [])

  const eventCategories = useMemo(() => [...defaultCategories, ...customCategories], [customCategories])
  const value = useMemo(() => ({ events, eventCategories, attendanceIds, ratings, user, toggleAttendance, rateEvent, saveEvent, moderateEvent, addCategory, removeCategory, signIn, signOut }), [events, eventCategories, attendanceIds, ratings, user, toggleAttendance, rateEvent, saveEvent, moderateEvent, addCategory, removeCategory, signIn, signOut])
  return <TanagerContext.Provider value={value}>{children}</TanagerContext.Provider>
}

export function useTanager() {
  const context = useContext(TanagerContext)
  if (!context) throw new Error('useTanager precisa estar dentro de TanagerProvider')
  return context
}
