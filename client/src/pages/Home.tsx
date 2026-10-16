import { useMemo, useState } from 'react'
import { addMonths, format, getDate, getDay, isSameDay, isToday, startOfMonth, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Compass, Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { accessTags } from '../data/mockData'
import { useTanager } from '../hooks/useTanager'
import type { AccessTag, EventCategory } from '../types'
import { EventCard, PageTitle, SectionHeading } from '../components/UI'

const keyFor = (date: Date) => format(date, 'yyyy-MM-dd')
const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export default function Home() {
  const { events, eventCategories, attendanceIds, toggleAttendance } = useTanager()
  const [month, setMonth] = useState(startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([])
  const [selectedAccess, setSelectedAccess] = useState<AccessTag[]>([])
  const [search, setSearch] = useState('')

  const filteredEvents = useMemo(() => events.filter((event) => event.status === 'approved' && event.date >= keyFor(new Date()))
    .filter((event) => !selectedCategories.length || selectedCategories.includes(event.category))
    .filter((event) => selectedAccess.every((tag) => event.tags.includes(tag)))
    .filter((event) => !search || `${event.title} ${event.venue} ${event.neighborhood}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))), [events, selectedCategories, selectedAccess, search])
  const selectedEvents = filteredEvents.filter((event) => event.date === keyFor(selectedDate))
  const upcoming = filteredEvents.slice().sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  const grid = useMemo(() => {
    const monthStart = startOfMonth(month)
    const mondayOffset = (getDay(monthStart) + 6) % 7
    const start = new Date(monthStart)
    start.setDate(start.getDate() - mondayOffset)
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start)
      date.setDate(start.getDate() + index)
      return date
    })
  }, [month])

  const toggleCategory = (category: EventCategory) => setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])
  const toggleAccess = (tag: AccessTag) => setSelectedAccess((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])

  return (
    <>
      <section className="welcome-row">
        <PageTitle eyebrow="A agenda viva de Caraguá" title="Tem sempre algo acontecendo." description="Encontre seu próximo programa, com informação clara para aproveitar do seu jeito." />
        <Link className="button button-primary welcome-action" to="/explorar"><Compass size={17} /> Descobrir eventos <ArrowRight size={16} /></Link>
      </section>

      <section className="calendar-panel panel">
        <div className="calendar-panel-head">
          <div><p className="eyebrow">Planeje sua semana</p><h2>Agenda de eventos</h2></div>
          <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar eventos ou lugares" aria-label="Buscar eventos ou lugares" />{search && <button onClick={() => setSearch('')} aria-label="Limpar busca">×</button>}</label>
        </div>
        <div className="filter-toolbar"><span className="filter-label"><SlidersHorizontal size={15} /> Filtrar por</span><div className="filter-chips">{eventCategories.map((category) => <button key={category} className={`filter-chip${selectedCategories.includes(category) ? ' active' : ''}`} onClick={() => toggleCategory(category)}>{category}</button>)}</div></div>
        <div className="filter-toolbar access-filter-row"><span className="filter-label"><Filter size={15} /> Inclusão</span><div className="filter-chips">{accessTags.map((tag) => <button key={tag} className={`filter-chip access-filter-chip${selectedAccess.includes(tag) ? ' active' : ''}`} onClick={() => toggleAccess(tag)}>{tag}</button>)}</div></div>

        <div className="calendar-content">
          <div className="month-calendar">
            <div className="calendar-month-head"><div><h3>{format(month, 'MMMM yyyy', { locale: ptBR })}</h3><span>Toque em um dia para ver a programação</span></div><div className="calendar-nav"><button onClick={() => setMonth((value) => subMonths(value, 1))} aria-label="Mês anterior"><ChevronLeft size={18} /></button><button className="today-button" onClick={() => { setMonth(startOfMonth(new Date())); setSelectedDate(new Date()) }}>Hoje</button><button onClick={() => setMonth((value) => addMonths(value, 1))} aria-label="Próximo mês"><ChevronRight size={18} /></button></div></div>
            <div className="calendar-grid" role="grid" aria-label="Calendário mensal">
              {weekDays.map((label) => <span key={label} className="calendar-weekday" role="columnheader">{label}</span>)}
              {grid.map((date) => {
                const dayEvents = filteredEvents.filter((event) => event.date === keyFor(date))
                const inMonth = date.getMonth() === month.getMonth()
                const selected = isSameDay(date, selectedDate)
                const personalEvent = dayEvents.some((event) => attendanceIds.includes(event.id))
                return <button key={keyFor(date)} onClick={() => { setSelectedDate(date); if (!inMonth) setMonth(startOfMonth(date)) }} className={`calendar-day${inMonth ? '' : ' outside-month'}${selected ? ' selected' : ''}${isToday(date) ? ' today' : ''}${personalEvent ? ' has-personal' : ''}`} aria-pressed={selected} aria-label={`${format(date, 'd MMMM', { locale: ptBR })}${dayEvents.length ? `, ${dayEvents.length} eventos` : ''}${personalEvent ? ', evento salvo' : ''}`}>
                  <span>{getDate(date)}</span>{dayEvents.length > 0 && <span className="calendar-dots" aria-label={`${dayEvents.length} eventos`}>{dayEvents.slice(0, 3).map((event) => <i key={event.id} className={`calendar-dot category-${event.category.toLowerCase()}${attendanceIds.includes(event.id) ? ' personal-dot' : ''}`} />)}</span>}
                </button>
              })}
            </div>
            <div className="calendar-legend"><span><i className="calendar-dot category-música" /> Música</span><span><i className="calendar-dot category-cultura" /> Cultura</span><span><i className="calendar-dot category-natureza" /> Natureza</span><span><i className="calendar-dot personal-dot" /> Você vai</span><span className="legend-note">Os dias se atualizam com seus filtros</span></div>
          </div>
          <aside className="day-agenda">
            <div className="day-agenda-heading"><div><p className="eyebrow">Programação do dia</p><h3>{format(selectedDate, "d 'de' MMMM", { locale: ptBR })}</h3><span>{format(selectedDate, 'EEEE', { locale: ptBR })}</span></div><CalendarDays size={22} /></div>
            {selectedEvents.length ? <div className="day-event-list">{selectedEvents.map((event) => <Link key={event.id} to={`/eventos/${event.id}`} className="day-event-item"><img src={event.image} alt="" /><span className="day-event-copy"><strong>{event.title}</strong><small>{event.time} · {event.venue}</small></span><ArrowRight size={16} /></Link>)}</div> : <div className="calendar-empty"><div className="empty-icon"><Sparkles size={20} /></div><strong>Nenhum evento por aqui</strong><span>{selectedCategories.length || selectedAccess.length || search ? 'Experimente ajustar os filtros.' : 'Que tal explorar outras datas?'}</span><button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1))}>Ver próximo dia <ArrowRight size={14} /></button></div>}
            <Link className="text-link day-all-link" to="/explorar">Ver todos os eventos <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>

      <section className="content-section upcoming-section"><SectionHeading title="Vem aí em Caraguá" link="Ver agenda completa" to="/explorar" /><div className="event-grid">{upcoming.map((event) => <EventCard key={event.id} event={event} attending={attendanceIds.includes(event.id)} onToggleAttendance={toggleAttendance} />)}</div></section>

      <section className="local-callout"><div className="local-callout-icon"><Compass size={22} /></div><div><span className="eyebrow">Explore além do evento</span><h2>Seu próximo passeio começa aqui.</h2><p>Descubra lugares, histórias e pequenos negócios que fazem Caraguá ser única.</p></div><Link className="button button-light" to="/mapa">Explorar o mapa <ArrowRight size={16} /></Link><ArrowLeft className="callout-decoration" size={58} /></section>
    </>
  )
}
