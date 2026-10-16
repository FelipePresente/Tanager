import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Heart, MapPin, Share2, Sparkles, Ticket, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useTanager } from '../hooks/useTanager'
import { AccessPills, AttendeeCount, EventCard } from '../components/UI'

export default function EventDetails() {
  const { id = '' } = useParams()
  const { events, attendanceIds, toggleAttendance } = useTanager()
  const [copied, setCopied] = useState(false)
  const event = events.find((item) => item.id === id)
  if (!event) return <div className="not-found panel"><span className="empty-icon"><Sparkles size={23} /></span><h1>Não encontramos esse evento.</h1><p>Talvez ele tenha mudado de endereço. Explore a agenda para descobrir outro programa.</p><Link className="button button-primary" to="/explorar">Voltar para explorar</Link></div>
  const attending = attendanceIds.includes(event.id)
  const related = events.filter((item) => item.id !== event.id && item.status === 'approved' && item.category === event.category && item.date >= new Date().toLocaleDateString('sv-SE')).slice(0, 3)

  return <>
    <Link className="back-link" to="/"><ArrowLeft size={16} /> Voltar para a agenda</Link>
    {event.status === 'pending' && <div className="pending-notice"><Clock3 size={17} /> Este evento está aguardando aprovação da equipe Tanager. Só ficará público quando for validado.</div>}
    <div className="event-detail-hero"><img src={event.image} alt="" /><div className="detail-image-shade" /><div className="detail-hero-copy"><span className="event-category detail-category">{event.category}</span><p className="eyebrow eyebrow-light">{event.organizer} apresenta</p><h1>{event.title}</h1><div className="detail-hero-meta"><span><CalendarDays size={16} />{format(parseISO(event.date), "EEEE, d 'de' MMMM", { locale: ptBR })}</span><span><Clock3 size={16} />{event.time} – {event.endTime}</span><span><MapPin size={16} />{event.venue}</span></div></div></div>
    <div className="event-detail-layout">
      <div className="event-detail-main">
        <section className="detail-section"><div className="section-heading"><h2>Sobre o evento</h2><button className="icon-button share-button" onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(true); setTimeout(() => setCopied(false), 1800) } }} aria-label="Compartilhar evento"><Share2 size={17} /></button></div><p className="detail-description">{event.description}</p><div className="event-facts"><div><span>Quando</span><strong>{format(parseISO(event.date), "d 'de' MMMM", { locale: ptBR })}</strong><small>{event.time} – {event.endTime}</small></div><div><span>Quanto</span><strong>{event.price}</strong><small>Consulte a organização</small></div><div><span>Quem organiza</span><strong>{event.organizer}</strong><small>Promotor local</small></div></div>{copied && <span className="copy-feedback"><Check size={14} /> Link copiado</span>}</section>
        <section className="detail-section"><div className="detail-section-heading"><span className="detail-icon"><Heart size={18} /></span><div><h2>Acessibilidade e inclusão</h2><p>Informações declaradas pela organização do evento.</p></div></div>{event.tags.length ? <AccessPills tags={event.tags} limit={5} /> : <p className="muted-copy">A organização ainda não informou recursos de acessibilidade.</p>}</section>
        <section className="detail-section"><div className="section-heading"><div><p className="eyebrow">Como chegar</p><h2>{event.venue}</h2></div><span className="neighborhood-label"><MapPin size={14} />{event.neighborhood}</span></div><p className="address-line">{event.address}, Caraguatatuba – SP</p><div className="mini-map map-placeholder" role="img" aria-label="Espaço reservado para o mapa do evento" /><Link className="text-link" to="/mapa">Ver outros eventos no mapa <ArrowRight size={15} /></Link></section>
        <section className="detail-section"><div className="detail-section-heading"><span className="detail-icon partner-icon">✳</span><div><h2>Complete seu passeio</h2><p>Parceiros locais pertinho do evento.</p></div></div>{event.partners.length ? <div className="partner-list">{event.partners.map((partner) => <article key={partner.name} className="partner-card"><span className="partner-symbol">{partner.name.charAt(0)}</span><span className="partner-copy"><strong>{partner.name}</strong><small>{partner.category} · {partner.distance}</small><span>{partner.detail}</span></span><ArrowRight size={16} /></article>)}</div> : <p className="muted-copy">Em breve, mais dicas locais perto deste evento.</p>}</section>
      </div>
      <aside className="detail-side"><div className="detail-ticket panel"><span className="eyebrow">Garanta seu lugar</span><h2>{event.price}</h2><AttendeeCount count={event.confirmations + (attending ? 1 : 0)} /><button className={`button ${attending ? 'button-confirmed' : 'button-primary'} attend-large`} onClick={() => toggleAttendance(event.id)}>{attending ? <><Check size={17} /> Presença confirmada</> : <><Sparkles size={17} /> Eu vou!</>}</button><p className="ticket-note"><Users size={14} /> Sua presença ajuda o evento a crescer.</p><div className="ticket-divider" /><p><Ticket size={15} /> Informação de lotação aproximada</p></div><div className="inclusive-note"><span>♡</span><div><strong>Caraguá é de todo mundo.</strong><p>Se precisar, fale com a organização antes de ir para confirmar os recursos de acessibilidade.</p></div></div></aside>
    </div>
    {related.length > 0 && <section className="content-section related-events"><div className="section-heading"><h2>Mais eventos de {event.category.toLocaleLowerCase('pt-BR')}</h2><Link to="/explorar">Ver todos <ArrowRight size={15} /></Link></div><div className="event-grid">{related.map((item) => <EventCard key={item.id} event={item} attending={attendanceIds.includes(item.id)} onToggleAttendance={toggleAttendance} />)}</div></section>}
  </>
}
