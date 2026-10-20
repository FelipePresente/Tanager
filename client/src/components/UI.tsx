import type { ReactNode } from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles, Star, Users } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import type { AccessTag, EventItem } from '../types'

interface PageTitleProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps) {
  return (
    <div className="page-title-row">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action && <div className="page-title-action">{action}</div>}
    </div>
  )
}

const accessIcons: Record<AccessTag, string> = {
  'Acessível para cadeira de rodas': '♿',
  Libras: '🤟',
  Audiodescrição: '◉',
  'Pet friendly': '🐾',
  'Espaço família': '♡',
}

interface AccessPillsProps {
  tags: AccessTag[]
  limit?: number
}

export function AccessPills({ tags, limit = 3 }: AccessPillsProps) {
  if (!tags.length) {
    return null
  }

  const visibleTags = tags.slice(0, limit)
  const remainingCount = tags.length - limit

  return (
    <div className="access-pills">
      {visibleTags.map((tag) => (
        <span key={tag} className="access-pill" title={tag}>
          <span aria-hidden="true">{accessIcons[tag]}</span>
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="access-pill access-more">+{remainingCount}</span>
      )}
    </div>
  )
}

interface EventCardProps {
  event: EventItem
  attending?: boolean
  onToggleAttendance?: (id: string) => void
  featured?: boolean
}

export function EventCard({
  event,
  attending = false,
  onToggleAttendance,
  featured = false,
}: EventCardProps) {
  const date = parseISO(event.date)

  return (
    <article className={`event-card${featured ? ' event-card-featured' : ''}`}>
      <Link
        to={`/eventos/${event.id}`}
        className="event-image-link"
        aria-label={`Ver ${event.title}`}
      >
        <img className="event-image" src={event.image} alt="" loading="lazy" />
        <span className="event-category">{event.category}</span>
        {event.status === 'pending' && <span className="status-label">Em análise</span>}
      </Link>

      <div className="event-card-body">
        <div className="event-date-line">
          <CalendarDays size={14} />
          <span>{format(date, "EEE, d 'de' MMM", { locale: ptBR })}</span>
          <span className="dot-separator">·</span>
          <Clock3 size={14} />
          <span>{event.time}</span>
        </div>

        <Link className="event-card-title" to={`/eventos/${event.id}`}>
          <h3>{event.title}</h3>
        </Link>

        <p className="event-venue">
          <MapPin size={14} />
          {event.venue} <span>· {event.neighborhood}</span>
        </p>

        <AccessPills tags={event.tags} limit={2} />

        <div className="event-card-bottom">
          <span className="event-price">{event.price}</span>
          {onToggleAttendance && (
            <button
              className={`attend-mini${attending ? ' attending' : ''}`}
              onClick={() => onToggleAttendance(event.id)}
              aria-label={attending ? 'Remover presença' : 'Confirmar presença'}
            >
              <Sparkles size={15} />
              {attending ? 'Vou' : 'Eu vou'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({
  icon = <CalendarDays size={23} />,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

interface RatingStarsProps {
  value?: number
  onChange?: (rating: number) => void
  label?: string
}

export function RatingStars({
  value = 0,
  onChange,
  label = 'Sua avaliação',
}: RatingStarsProps) {
  const starValues = [1, 2, 3, 4, 5]

  return (
    <div className="rating-stars" role="group" aria-label={label}>
      {starValues.map((star) => (
        <button
          key={star}
          className={`star-button${star <= value ? ' selected' : ''}`}
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          aria-label={`${star} ${star === 1 ? 'estrela' : 'estrelas'}`}
        >
          <Star size={18} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  )
}

interface SectionHeadingProps {
  title: string
  link?: string
  to?: string
}

export function SectionHeading({ title, link, to }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {link && to && (
        <Link to={to}>
          {link}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}

export function AttendeeCount({ count }: { count: number }) {
  return (
    <span className="attendee-count">
      <Users size={15} />
      {count.toLocaleString('pt-BR')} confirmados
    </span>
  )
}
