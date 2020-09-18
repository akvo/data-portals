import { StatelessComponent, useEffect, useRef } from 'react'
import L from 'leaflet'

type MapProps = {
  accessToken: string
  onMount?: (map: L.Map) => void
  mapStyle?: string
}

const LeafletMap: StatelessComponent<MapProps> = ({
  accessToken,
  onMount,
  mapStyle,
}) => {
  const mapRef = useRef<L.Map>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapRef.current = L.map(containerRef.current as HTMLElement)
    mapRef.current.setView([0, 0], 2)

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: mapStyle || 'mapbox/streets-v11',
        accessToken,
      }
    ).addTo(mapRef.current)

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
    >
      map
    </div>
  )
}

export default LeafletMap
