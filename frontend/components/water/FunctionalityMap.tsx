import { StatelessComponent } from 'react'
import { FeatureCollection } from 'geojson'
import L from 'leaflet'
import LeafletMap from '../LeafletMap'
import maliGeo from './data/mli_hdx.json'
import * as d3 from 'd3'
import colorLegend from '../../libs/color-legend'

const values = maliGeo.features.map((f) => f.properties.Percentage)
const domain: [d3.NumberValue, d3.NumberValue] = [
  Math.min(...values),
  Math.max(...values),
]

const FunctionalityMap: StatelessComponent = () => {
  const colors = d3.scaleQuantize<string>(domain, d3.schemeYlGn[6])
  const style: L.StyleFunction = (feature) => {
    return {
      fillColor: colors(feature?.properties?.Percentage),
      weight: 1,
      opacity: 0.5,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7,
    }
  }
  return (
    <LeafletMap
      onMount={(map) => {
        const feature = L.geoJSON(maliGeo as FeatureCollection, {
          style: style,
        }).addTo(map)

        map.fitBounds(feature.getBounds())

        const title = 'Percentage of functional waterpoints'
        const legend = new L.Control({ position: 'topright' })

        legend.onAdd = function () {
          var div = L.DomUtil.create('div', 'legend')
          return div
        }
        legend.addTo(map)

        colorLegend('.legend.leaflet-control', colors, { title, width: 350 })
      }}
    />
  )
}

export default FunctionalityMap
