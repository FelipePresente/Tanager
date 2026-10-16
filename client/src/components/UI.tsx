import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles, Star, Users } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import type { AccessTag, EventItem } from '../types'

export function PageTitle({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="page-title-row"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="page-description">{description}</p>}</div>{action && <div className="page-title-action">{action}</div>}</div>
}

const accessIcons: Record<AccessTag, string> = {
  'Acessível para cadeira de rodas': '♿',
  Libras: '🤟',
  Audiodescrição: '◉',
  'Pet friendly': '🐾',
  'Espaço família': '♡',
}

export function AccessPills({ tags, limit = 3 }: { tags: AccessTag[]; limit?: number }) {
  if (!tags.length) return null
  return <div className="access-pills">{tags.slice(0, limit).map((tag) => <span key={tag} className="access-pill" title={tag}><span aria-hidden="true">{accessIcons[tag]}</span>{tag}</span>)}{tags.length > limit && <span className="access-pill access-more">+{tags.length - limit}</span>}</div>
}

export function EventCard({ event, attending = false, onToggleAttendance, featured = false }: { event: EventItem; attending?: boolean; onToggleAttendance?: (id: string) => void; featured?: boolean }) {
  const date = parseISO(event.date)
  return (
    <article className={`event-card${featured ? ' event-card-featured' : ''}`}>
      <Link to={`/eventos/${event.id}`} className="event-image-link" aria-label={`Ver ${event.title}`}>
        <img className="event-image" src={event.image} alt="" loading="lazy" />
        <span className="event-category">{event.category}</span>
        {event.status === 'pending' && <span className="status-label">Em análise</span>}
      </Link>
      <div className="event-card-body">
        <div className="event-date-line"><CalendarDays size={14} /><span>{format(date, "EEE, d 'de' MMM", { locale: ptBR })}</span><span className="dot-separator">·</span><Clock3 size={14} /><span>{event.time}</span></div>
        <Link className="event-card-title" to={`/eventos/${event.id}`}><h3>{event.title}</h3></Link>
        <p className="event-venue"><MapPin size={14} />{event.venue} <span>· {event.neighborhood}</span></p>
        <AccessPills tags={event.tags} limit={2} />
        <div className="event-card-bottom"><span className="event-price">{event.price}</span>{onToggleAttendance && <button className={`attend-mini${attending ? ' attending' : ''}`} onClick={() => onToggleAttendance(event.id)} aria-label={attending ? 'Remover presença' : 'Confirmar presença'}><Sparkles size={15} />{attending ? 'Vou' : 'Eu vou'}</button>}</div>
      </div>
    </article>
  )
}

export function EmptyState({ icon = <CalendarDays size={23} />, title, description, action }: { icon?: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3><p>{description}</p>{action}</div>
}

export function RatingStars({ value = 0, onChange, label = 'Sua avaliação' }: { value?: number; onChange?: (rating: number) => void; label?: string }) {
  return <div className="rating-stars" role="group" aria-label={label}>{[1, 2, 3, 4, 5].map((star) => <button key={star} className={`star-button${star <= value ? ' selected' : ''}`} onClick={() => onChange?.(star)} disabled={!onChange} aria-label={`${star} ${star === 1 ? 'estrela' : 'estrelas'}`}><Star size={18} fill={star <= value ? 'currentColor' : 'none'} /></button>)}</div>
}

export function SectionHeading({ title, link, to }: { title: string; link?: string; to?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{link && to && <Link to={to}>{link}<ArrowRight size={15} /></Link>}</div>
}

export function AttendeeCount({ count }: { count: number }) {
  return <span className="attendee-count"><Users size={15} />{count.toLocaleString('pt-BR')} confirmados</span>
}
