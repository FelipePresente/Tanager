import { useMemo, useState } from 'react'
import { CalendarDays, Heart, History, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTanager } from '../hooks/useTanager'
import { EmptyState, EventCard, PageTitle, RatingStars } from '../components/UI'

export default function MyEvents() {
  const { events, attendanceIds, toggleAttendance, ratings, rateEvent } = useTanager()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const today = new Date().toLocaleDateString('sv-SE')
  const savedEvents = useMemo(() => events.filter((event) => attendanceIds.includes(event.id)).sort((a, b) => a.date.localeCompare(b.date)), [events, attendanceIds])
  const upcoming = savedEvents.filter((event) => event.date >= today)
  const past = savedEvents.filter((event) => event.date < today).reverse()
  const visible = tab === 'upcoming' ? upcoming : past

  return <>
    <PageTitle eyebrow="Seu espaço" title="Meus eventos" description="Guarde os planos que vêm aí e revisite os bons momentos que já passaram." action={<span className="personal-count"><Heart size={16} />{savedEvents.length} salvos</span>} />
    <div className="my-events-tabs" role="tablist"><button role="tab" aria-selected={tab === 'upcoming'} className={tab === 'upcoming' ? 'active' : ''} onClick={() => setTab('upcoming')}><CalendarDays size={16} /> A caminho <span>{upcoming.length}</span></button><button role="tab" aria-selected={tab === 'past'} className={tab === 'past' ? 'active' : ''} onClick={() => setTab('past')}><History size={16} /> Memórias <span>{past.length}</span></button></div>
    {visible.length === 0 ? <EmptyState icon={tab === 'upcoming' ? <Sparkles size={23} /> : <History size={23} />} title={tab === 'upcoming' ? 'Seus próximos momentos começam aqui' : 'Seu diário ainda está começando'} description={tab === 'upcoming' ? 'Explore a agenda e confirme presença nos eventos que chamarem sua atenção.' : 'Quando você participar de um evento, ele aparece aqui para virar lembrança.'} action={<Link to="/explorar" className="button button-primary">Descobrir eventos</Link>} /> : tab === 'upcoming' ? <div className="event-grid my-events-grid">{visible.map((event) => <EventCard key={event.id} event={event} attending onToggleAttendance={toggleAttendance} />)}</div> : <div className="memory-list">{visible.map((event) => <article key={event.id} className="memory-card"><img src={event.image} alt="" /><div className="memory-copy"><span className="eyebrow">{event.category} · {new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR')}</span><h3>{event.title}</h3><p>{event.venue}</p><div className="memory-rating"><span>Como foi sua experiência?</span><RatingStars value={ratings[event.id] ?? 0} onChange={(rating) => rateEvent(event.id, rating)} /></div></div><button className="memory-save" onClick={() => toggleAttendance(event.id)} title="Remover do diário"><Heart size={18} fill="currentColor" /></button></article>)}</div>}
    <aside className="journal-note"><span className="journal-note-icon"><History size={19} /></span><div><strong>Um diário feito de bons encontros.</strong><p>Eventos encerrados ficam guardados aqui. Avalie sua experiência e monte seu próprio acervo cultural.</p></div></aside>
  </>
}
