import { useMemo, useState } from 'react'
import { ArrowRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTanager } from '../hooks/useTanager'
import type { EventCategory } from '../types'
import { EventCard, PageTitle } from '../components/UI'

export default function Explore() {
  const { events, eventCategories, attendanceIds, toggleAttendance } = useTanager()
  const [category, setCategory] = useState<EventCategory | 'Todos'>('Todos')
  const [search, setSearch] = useState('')

  const visibleEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          event.status === 'approved' &&
          event.date >= new Date().toLocaleDateString('sv-SE')
      )
      .filter((event) => category === 'Todos' || event.category === category)
      .filter((event) => {
        if (!search) {
          return true
        }

        const normalizedTarget = `${event.title} ${event.venue} ${event.neighborhood}`
          .toLocaleLowerCase('pt-BR')
        const normalizedSearch = search.toLocaleLowerCase('pt-BR')

        return normalizedTarget.includes(normalizedSearch)
      })
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [events, category, search])

  const handleResetFilters = () => {
    setSearch('')
    setCategory('Todos')
  }

  return (
    <>
      <section className="explore-hero">
        <div className="explore-hero-photo" />
        <div className="explore-hero-content">
          <span className="eyebrow eyebrow-light">Caraguatatuba, do seu jeito</span>
          <h1>
            Descubra o que<br />faz a cidade pulsar.
          </h1>
          <p>
            Do primeiro café ao último show, encontre experiências para guardar na memória.
          </p>
          <a href="#eventos" className="button button-light">
            Explorar programação <ArrowRight size={16} />
          </a>
        </div>
        <span className="hero-sticker">
          <Sparkles size={15} /> feito por quem vive aqui
        </span>
      </section>

      <section className="content-section explore-events" id="eventos">
        <PageTitle
          eyebrow="Escolha seu próximo programa"
          title="Encontre seu próximo momento."
          description={`${visibleEvents.length} eventos para viver Caraguá.`}
        />

        <div className="explore-controls">
          <div className="category-tabs">
            <button
              className={category === 'Todos' ? 'active' : ''}
              onClick={() => setCategory('Todos')}
            >
              Todos
            </button>
            {eventCategories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por evento ou local"
            />
            <SlidersHorizontal size={16} />
          </label>
        </div>

        {visibleEvents.length ? (
          <div className="event-grid explore-grid">
            {visibleEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                attending={attendanceIds.includes(event.id)}
                onToggleAttendance={toggleAttendance}
              />
            ))}
          </div>
        ) : (
          <div className="blank-card">
            <h3>Nenhum evento encontrado</h3>
            <p>Tente buscar por outro termo ou categoria.</p>
            <button className="button button-outline" onClick={handleResetFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      <section className="inclusion-banner">
        <div className="inclusion-mark">♡</div>
        <div>
          <span className="eyebrow">Espaço para todo mundo</span>
          <h2>Um bom passeio começa com informação.</h2>
          <p>
            Use os filtros de acessibilidade para encontrar eventos que combinam com as suas
            necessidades.
          </p>
        </div>
        <Link className="text-link" to="/">
          Ver agenda acessível <ArrowRight size={15} />
        </Link>
      </section>
    </>
  )
}
