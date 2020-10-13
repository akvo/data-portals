import { StatelessComponent } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import * as d3 from 'd3'
import L from 'leaflet'
import useSWR from 'swr'
import LeafletMap from '../LeafletMap'
import fetcher from '../../libs/fetcher'
import colorLegend from '../../libs/color-legend'

type Props = {
  source: string
}

const FunctionalityMap: StatelessComponent<Props> = ({ source }) => {
  const { data, error } = useSWR(source, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const values = data.features.map((f: Feature) => f.properties?.value)
  const domain: [d3.NumberValue, d3.NumberValue] = [
    Math.min(...values),
    Math.max(...values),
  ]
  const colors = d3.scaleQuantize<string>(domain, d3.schemeYlGn[6])
  const style: L.StyleFunction = (feature) => {
    return {
      fillColor: colors(feature?.properties?.value),
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
        const feature = L.geoJSON(data as FeatureCollection, {
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
