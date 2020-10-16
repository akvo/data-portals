import { StatelessComponent } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import L from 'leaflet'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import LeafletMap from '../LeafletMap'

const colors: { [key: string]: string } = {
  fonctionnel: '#018571',
  seasonal: '#ffa600',
}

const onEachFeature = (feature: Feature, layer: L.Layer) => {
  const popupContent = feature.properties?.functionality_main
  layer.bindPopup(popupContent)
}

type Props = {
  source: string
}

const SeasonalityMap: StatelessComponent<Props> = ({ source }) => {
  const { data, error } = useSWR(source, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <LeafletMap
      onMount={(map) => {
        const feature = L.geoJSON(data as FeatureCollection, {
          filter: (feature) => {
            return ['fonctionnel', 'seasonal'].includes(
              feature.properties?.functionality_main
            )
          },
          pointToLayer: (feature, latlng) => {
            const color = colors[feature.properties?.functionality_main]
            return L.circleMarker(latlng, {
              radius: 3,
              fillColor: color,
              color: '#fff',
              weight: 0.5,
              opacity: 0.1,
              fillOpacity: 0.5,
            })
          },
          onEachFeature: onEachFeature,
        }).addTo(map)

        map.fitBounds(feature.getBounds())

        const legend = new L.Control({ position: 'topright' })
        legend.onAdd = function () {
          const div = L.DomUtil.create('div', 'info legend')
          const labels = []

          for (let f in colors) {
            div.innerHTML += labels.push(
              `<div class="lengend-item"><i class="circle" style="background:${colors[f]}"></i> ${f}</div>`
            )
          }
          div.innerHTML = labels.join('')
          return div
        }
        legend.addTo(map)
      }}
    />
  )
}

export default SeasonalityMap
