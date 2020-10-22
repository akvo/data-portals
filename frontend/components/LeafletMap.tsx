import { StatelessComponent, useEffect, useRef } from 'react'
import L from 'leaflet'

type MapProps = {
  onMount?: (map: L.Map) => void
  mapboxToken?: string
  mapboxStyle?: string
}

const LeafletMap: StatelessComponent<MapProps> = ({
  onMount,
  mapboxToken,
  mapboxStyle,
}) => {
  const mapRef = useRef<L.Map>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapRef.current = L.map(containerRef.current as HTMLElement)
    mapRef.current.setView([0, 0], 2)

    if (mapboxToken) {
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: mapboxStyle || 'mapbox/light-v10',
          accessToken: mapboxToken,
        }
      ).addTo(mapRef.current)
    } else {
      L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://cartodb.com/attributions">CartoDB</a>, CartoDB <a href ="http://cartodb.com/attributions">attributions</a>',
          detectRetina: false,
          maxNativeZoom: 18,
          maxZoom: 18,
          minZoom: 0,
          noWrap: false,
          opacity: 1,
          subdomains: 'abc',
          tms: false,
        }
      ).addTo(mapRef.current)
    }

    if (onMount) {
      onMount(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  return (
    <div
      className="map-container"
      style={{ width: '100%', height: '100%' }}
      ref={containerRef}
    />
  )
}

export default LeafletMap
