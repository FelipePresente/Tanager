import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useTanager } from '../hooks/useTanager'
import { AccessPills, PageTitle } from '../components/UI'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { CARAGUATUBA_CENTER, eventMarkerIcon, safeLatLng } from '../constants/map'
import type { EventItem } from '../types'

function MapCenter({ selectedEvent }: { selectedEvent: EventItem | null }) {
  const map = useMap()

  // Fly to the selected event's location whenever it changes
  useEffect(() => {
    if (!selectedEvent) return
    map.flyTo(safeLatLng(selectedEvent.latitude, selectedEvent.longitude), 18, { duration: 1.8 })
  }, [selectedEvent, map])

  return null
}

export default function MapPage() {
  const { events } = useTanager()
  const mapEvents = useMemo(() => events.filter((event) => event.status === 'approved' && event.date >= new Date().toLocaleDateString('sv-SE')).slice(0, 7), [events])
  const [selectedId, setSelectedId] = useState(mapEvents[0]?.id ?? '')
  const selected = mapEvents.find((event) => event.id === selectedId) ?? mapEvents[0] ?? null

  return <>
    <PageTitle eyebrow="No mapa" title="Encontre seu caminho." description="Eventos e lugares especiais, espalhados pela nossa cidade." />
    <div className="map-layout">
      <div className="map-canvas">
        <MapContainer
          center={CARAGUATUBA_CENTER}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapCenter selectedEvent={selected} />
          {mapEvents.map((event) => (
            <Marker
              key={event.id}
              position={safeLatLng(event.latitude, event.longitude)}
              icon={eventMarkerIcon}
              eventHandlers={{
                click: () => setSelectedId(event.id),
              }}
            >
              <Popup>
                <strong>{event.title}</strong>
                <br />
                {event.venue} — {event.neighborhood}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <aside className="map-side panel">
        <div className="map-side-head"><div><p className="eyebrow">Perto de você</p><h2>Na cidade</h2><span>{mapEvents.length} eventos próximos</span></div><span className="map-side-pin"><MapPin size={19} /></span></div>
        <div className="map-event-list">{mapEvents.map((event, index) => <button key={event.id} className={`map-event-row${selected?.id === event.id ? ' selected' : ''}`} onClick={() => setSelectedId(event.id)}><span className="map-event-index">{index + 1}</span><span className="map-event-info"><strong>{event.title}</strong><small>{event.venue} · {format(parseISO(event.date), "d MMM", { locale: ptBR })}, {event.time}</small><AccessPills tags={event.tags} limit={1} /></span><ArrowRight size={15} /></button>)}</div>
        {selected && <Link className="button button-primary map-details-link" to={`/eventos/${selected.id}`}>Ver detalhes do evento <ArrowRight size={16} /></Link>}
      </aside>
    </div>
  </>
}
