import { useState, type FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BarChart3, CalendarDays, CheckCircle2, Clock3, Eye, FilePlus2, MapPin, MousePointer2, Plus, ShieldCheck, Users } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { accessTags } from '../data/mockData'
import { useTanager } from '../hooks/useTanager'
import type { AccessTag, EventCategory, EventItem } from '../types'
import { EmptyState, PageTitle } from '../components/UI'

export default function PromoterPages({ analyticsOnly = false }: { analyticsOnly?: boolean }) {
  const { events, user } = useTanager()
  const { id } = useParams()
  const eventList = events.filter((event) => event.status === 'approved' || event.status === 'pending').sort((a, b) => a.date.localeCompare(b.date))
  const selected = eventList.find((event) => event.id === id) ?? eventList.find((event) => event.status === 'approved') ?? eventList[0]
  const submitted = events.filter((event) => event.status === 'pending' && (event.createdBy === user?.name || event.id === 'show-pend'))

  if (analyticsOnly && !selected) return <EmptyState title="Nenhum relatório disponível" description="Assim que um evento for publicado, os dados de interesse aparecem aqui." />

  if (analyticsOnly && selected) return <AnalyticsPage event={selected} events={eventList} />

  return <>
    <PageTitle eyebrow="Área do promotor" title="Seus eventos, em um só lugar." description="Acompanhe a procura, entenda seu público e prepare experiências melhores." action={<Link className="button button-primary" to="/promotor/eventos/novo"><Plus size={17} /> Cadastrar evento</Link>} />
    <div className="promoter-welcome"><span className="promoter-welcome-icon"><BarChart3 size={21} /></span><div><strong>Olá, {user?.name ?? 'promotor'}!</strong><p>Seus relatórios mostram dados agregados. A identidade de quem confirmou presença nunca é exibida.</p></div><ShieldCheck size={18} className="promoter-shield" /></div>
    <div className="metric-grid promoter-metrics"><Metric icon={<Users size={18} />} label="Confirmações" value={eventList.filter((item) => item.status === 'approved').reduce((sum, item) => sum + item.confirmations, 0).toLocaleString('pt-BR')} hint="em seus eventos publicados" tone="red" /><Metric icon={<Eye size={18} />} label="Visualizações" value={eventList.filter((item) => item.status === 'approved').reduce((sum, item) => sum + item.views, 0).toLocaleString('pt-BR')} hint="pessoas conheceram seus eventos" tone="blue" /><Metric icon={<CalendarDays size={18} />} label="Publicados" value={eventList.filter((item) => item.status === 'approved').length.toString()} hint="eventos ativos na agenda" tone="gold" /><Metric icon={<Clock3 size={18} />} label="Em análise" value={submitted.length.toString()} hint="aguardando a equipe Tanager" tone="purple" /></div>
    <section className="content-section promoter-event-section"><div className="section-heading"><div><p className="eyebrow">Desempenho</p><h2>Visão geral dos eventos</h2></div><span className="privacy-pill"><ShieldCheck size={14} /> Dados anônimos</span></div>
      {eventList.length ? <div className="promoter-event-list">{eventList.map((event) => <PromoterEventRow key={event.id} event={event} />)}</div> : <EmptyState icon={<FilePlus2 size={23} />} title="Seu primeiro evento começa aqui" description="Envie uma proposta para a equipe Tanager analisar e publicar na agenda." action={<Link className="button button-primary" to="/promotor/eventos/novo">Cadastrar evento</Link>} />}
    </section>
    <div className="promoter-tip"><span>✦</span><p><strong>Uma dica:</strong> informações de acessibilidade claras ajudam mais pessoas a escolher seu evento e planejar a visita.</p><Link to="/promotor/eventos/novo">Cadastrar um evento <ArrowRight size={14} /></Link></div>
  </>
}

function Metric({ icon, label, value, hint, tone }: { icon: React.ReactNode; label: string; value: string; hint: string; tone: string }) {
  return <div className="metric-card"><span className={`metric-icon metric-${tone}`}>{icon}</span><span className="metric-label">{label}</span><strong>{value}</strong><small>{hint}</small></div>
}

function PromoterEventRow({ event }: { event: EventItem }) {
  return <article className="promoter-event-row"><img src={event.image} alt="" /><div className="promoter-event-info"><span className="event-date-line"><CalendarDays size={13} />{format(parseISO(event.date), "d 'de' MMMM", { locale: ptBR })} · {event.time}</span><h3>{event.title}</h3><p><MapPin size={13} />{event.venue} · {event.category}</p><span className={`moderation-status status-${event.status}`}>{event.status === 'approved' ? <><CheckCircle2 size={13} /> Publicado</> : <><Clock3 size={13} /> Em análise</>}</span></div><div className="promoter-row-stats"><span><Users size={15} />{event.confirmations}</span><span><Eye size={15} />{event.views.toLocaleString('pt-BR')}</span></div><Link className="icon-button promoter-row-link" to={`/promotor/eventos/${event.id}`} aria-label={`Ver relatório de ${event.title}`}><ArrowRight size={17} /></Link></article>
}

function AnalyticsPage({ event, events }: { event: EventItem; events: EventItem[] }) {
  const navigate = useNavigate()
  const forecast = event.confirmations + Math.round(event.confirmations * 0.22)
  const maxAge = Math.max(...event.ageRanges.map((item) => item.value), 1)
  const sourceValues = [Math.round(event.views * .46), Math.round(event.views * .32), Math.round(event.views * .22)]
  return <>
    <Link to="/promotor" className="back-link"><ArrowLeft size={16} /> Visão geral</Link>
    <PageTitle eyebrow="Relatório de público" title={event.title} description={`${event.venue} · ${format(parseISO(event.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}`} action={<span className="privacy-pill"><ShieldCheck size={14} /> Dados anônimos</span>} />
    <div className="analytics-select-row"><label>Ver relatório de<select value={event.id} onChange={(e) => navigate(`/promotor/eventos/${e.target.value}`)}>{events.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><span>Atualizado agora · dados demonstrativos</span></div>
    <div className="metric-grid analytics-metrics"><Metric icon={<Users size={18} />} label="Confirmaram presença" value={event.confirmations.toLocaleString('pt-BR')} hint="pessoas interessadas no evento" tone="red" /><Metric icon={<Eye size={18} />} label="Visitas na página" value={event.views.toLocaleString('pt-BR')} hint="visualizações até agora" tone="blue" /><Metric icon={<MousePointer2 size={18} />} label="Conversão" value={`${event.views ? Math.round(event.confirmations / event.views * 100) : 0}%`} hint="visitas que viraram interesse" tone="gold" /><Metric icon={<BarChart3 size={18} />} label="Público estimado" value={forecast.toLocaleString('pt-BR')} hint="estimativa baseada em confirmações" tone="purple" /></div>
    <div className="analytics-panels"><section className="analytics-card panel"><div className="section-heading"><div><p className="eyebrow">Quem se interessa</p><h2>Faixa etária estimada</h2></div><span className="chart-unit">Percentual</span></div><div className="bar-chart">{event.ageRanges.map((item) => <div key={item.label} className="bar-chart-column"><strong>{item.value}%</strong><div className="bar-track"><i style={{ height: `${Math.max((item.value / maxAge) * 100, 4)}%` }} /></div><span>{item.label}</span></div>)}</div><p className="chart-caption">Estimativa agregada com base na faixa etária informada por interessados.</p></section>
      <section className="analytics-card panel"><div className="section-heading"><div><p className="eyebrow">Descoberta</p><h2>Como chegaram até aqui</h2></div></div><div className="source-chart"><div className="donut-chart"><div><strong>{event.views.toLocaleString('pt-BR')}</strong><span>visitas</span></div></div><div className="source-legend"><span><i className="source-one" />Agenda Tanager <strong>{sourceValues[0]}</strong></span><span><i className="source-two" />Compartilhamentos <strong>{sourceValues[1]}</strong></span><span><i className="source-three" />Busca e mapa <strong>{sourceValues[2]}</strong></span></div></div><p className="chart-caption">Origem das visitas no período atual.</p></section></div>
    <div className="privacy-note"><ShieldCheck size={20} /><div><strong>Privacidade protegida</strong><p>Os dados são mostrados apenas em totais e estimativas. Nenhum nome, e-mail ou informação que identifique alguém aparece neste relatório.</p></div></div>
  </>
}

export function NewEventPage() {
  const { saveEvent, user, eventCategories } = useTanager()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<EventCategory>('Música')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('18:00')
  const [endTime, setEndTime] = useState('21:00')
  const [venue, setVenue] = useState('')
  const [address, setAddress] = useState('')
  const [neighborhood, setNeighborhood] = useState('Centro')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('Gratuito')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState<AccessTag[]>([])
  const [partners, setPartners] = useState('')
  const [error, setError] = useState('')
  const toggleTag = (tag: AccessTag) => setTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: EventItem = {
      id: `evento-${Date.now()}`, title, category, date, time, endTime, venue, address: address || venue, neighborhood,
      description, image: image || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85', price, tags, organizer: user?.name ?? 'Promotor local', status: 'pending', confirmations: 0, views: 0,
      ageRanges: [{ label: '18–24', value: 0 }, { label: '25–34', value: 0 }, { label: '35–44', value: 0 }, { label: '45+', value: 0 }],
      partners: partners ? partners.split(',').map((name) => ({ name: name.trim(), category: 'Comércio local', distance: 'Próximo', detail: 'Sugestão para completar o passeio' })).filter((partner) => partner.name) : [], createdBy: user?.name,
    }
    if (new Date(`${date}T${time}`) < new Date()) { setError('Escolha uma data e horário futuros para o evento.'); return }
    saveEvent(next)
    navigate('/promotor')
  }

  return <>
    <Link to="/promotor" className="back-link"><ArrowLeft size={16} /> Voltar ao painel</Link>
    <PageTitle eyebrow="Novo evento" title="Conte pra cidade o que vai acontecer." description="Preencha os detalhes. A equipe Tanager revisará as informações antes de publicar." />
    <form className="event-form" onSubmit={submit}>
      <section className="form-section panel"><div className="form-section-title"><span>01</span><div><h2>O essencial</h2><p>As informações que ajudam as pessoas a encontrar seu evento.</p></div></div><div className="form-grid"><label className="form-wide">Nome do evento<input required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Festival de música à beira-mar" /><small>Escolha um nome claro e fácil de encontrar.</small></label><label>Categoria<select value={category} onChange={(e) => setCategory(e.target.value as EventCategory)}>{eventCategories.map((item) => <option key={item}>{item}</option>)}</select></label><label>Valor<input required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Gratuito ou R$ 20" /></label><label className="form-wide">Descrição<textarea required minLength={20} maxLength={700} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Conte o que torna esse encontro especial…" /><small>{description.length}/700 caracteres</small></label></div></section>
      <section className="form-section panel"><div className="form-section-title"><span>02</span><div><h2>Quando e onde</h2><p>Ajude todo mundo a chegar e se programar.</p></div></div><div className="form-grid"><label>Data<input required type="date" min={new Date().toLocaleDateString('sv-SE')} value={date} onChange={(e) => setDate(e.target.value)} /></label><label>Local do evento<input required value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Nome do espaço ou praça" /></label><label>Horário de início<input required type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label><label>Horário de término<input required type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></label><label className="form-wide">Endereço<input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número e referência" /></label><label>Bairro<input required value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Ex.: Centro" /></label></div></section>
      <section className="form-section panel"><div className="form-section-title"><span>03</span><div><h2>Inclusão e imagem</h2><p>Marque apenas os recursos disponíveis no local. Isso ajuda o público a escolher com confiança.</p></div></div><div className="form-grid"><label className="form-wide">Imagem do evento (link)<input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" /><small>Use uma imagem pública em formato JPG ou PNG.</small></label>{image && <img className="event-form-preview" src={image} alt="Prévia da imagem do evento" onError={(e) => { e.currentTarget.style.display = 'none' }} />}<fieldset className="form-wide access-fieldset"><legend>Recursos de acessibilidade confirmados</legend><div className="tag-checkbox-grid">{accessTags.map((tag) => <label key={tag} className={`tag-checkbox${tags.includes(tag) ? ' checked' : ''}`}><input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} /><span>{tag}</span></label>)}</div><small>Ao publicar, você confirma que esses recursos estarão disponíveis no evento.</small></fieldset><label className="form-wide">Comércios parceiros próximos<input value={partners} onChange={(e) => setPartners(e.target.value)} placeholder="Separe os nomes por vírgulas" /><small>Ex.: Café Caiçara, Empório local</small></label></div></section>
      {error && <p className="form-error form-submit-error">{error}</p>}<div className="form-submit-row"><p><ShieldCheck size={16} /> Seu evento será publicado após aprovação administrativa.</p><button className="button button-primary">Enviar para análise <ArrowRight size={16} /></button></div>
    </form>
  </>
}
