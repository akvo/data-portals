import { StatelessComponent } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import * as d3 from 'd3'
import L from 'leaflet'
import useSWR from 'swr'
import LeafletMap from '../LeafletMap'
import fetcher from '../../libs/fetcher'
import colorLegend from '../../libs/color-legend'
import waterpoint from '../mali_waterpoint.geo.json'

const safetyColors: { [key: string]: string } = {
  "Le puits n'est pas sûr": '#fdae61',
  'Le puits est sûr': '#003f5c',
}

const onEachFeature = (feature: Feature, layer: L.Layer) => {
  const popupContent = feature.properties?.functionality_main
  layer.bindPopup(popupContent)
}

type Props = {
  source: string
}

const WaterQualityMap: StatelessComponent<Props> = ({ source }) => {
  const { data, error } = useSWR(source, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const values = data.features
    .map((f: Feature) => f.properties?.value)
    .filter((v: number) => v > 0)
  const domain: [d3.NumberValue, d3.NumberValue] = [
    Math.min(...values),
    Math.max(...values),
  ]
  const populationColors = d3.scaleQuantize<string>(domain, d3.schemeBlues[6])
  const style: L.StyleFunction = (feature) => {
    const value: number = feature?.properties?.value
    return {
      fillColor: value ? populationColors(value) : '#d1d1d1',
      weight: 1,
      opacity: 0.2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7,
    }
  }

  return (
    <LeafletMap
      onMount={(map) => {
        L.geoJSON(data as FeatureCollection, { style: style }).addTo(map)

        const feature = L.geoJSON(waterpoint as FeatureCollection, {
          filter: (feature) => {
            return ["Le puits n'est pas sûr", 'Le puits est sûr'].includes(
              feature.properties?.puits_safety
            )
          },
          pointToLayer: (feature, latlng) => {
            const color = safetyColors[feature.properties?.puits_safety]
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

        const title = 'Population per district'
        const populationLegend = new L.Control({ position: 'topright' })
        populationLegend.onAdd = function () {
          var div = L.DomUtil.create('div', 'color-legend')
          return div
        }
        populationLegend.addTo(map)
        colorLegend('.color-legend.leaflet-control', populationColors, {
          title,
          width: 350,
        })

        const safetyLegend = new L.Control({ position: 'topright' })
        safetyLegend.onAdd = function () {
          const div = L.DomUtil.create('div', 'info legend')
          const labels = []

          for (let f in safetyColors) {
            div.innerHTML += labels.push(
              `<div class="lengend-item"><i class="circle" style="background:${safetyColors[f]}"></i> ${f}</div>`
            )
          }
          div.innerHTML = labels.join('')
          return div
        }
        safetyLegend.addTo(map)
      }}
    />
  )
}

export default WaterQualityMap
