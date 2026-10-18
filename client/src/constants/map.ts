import { Icon } from 'leaflet'
import markerIconUrl from '../assets/map-marker.svg?url'

export const CARAGUATUBA_CENTER = [-23.6223, -45.4131] as [number, number]

export const eventMarkerIcon = new Icon({
  iconUrl: markerIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

/** Returns valid [lat, lng] or falls back to Caraguatuba center when coords are missing. */
export function safeLatLng(lat: number | undefined, lng: number | undefined): [number, number] {
  if (typeof lat === 'number' && typeof lng === 'number' && Number.isFinite(lat) && Number.isFinite(lng)) {
    return [lat, lng]
  }
  return CARAGUATUBA_CENTER
}
