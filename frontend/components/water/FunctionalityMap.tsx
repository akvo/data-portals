import { StatelessComponent } from 'react'
import { FeatureCollection } from 'geojson'
import L from 'leaflet'
import LeafletMap from '../LeafletMap'
import maliGeo from './data/mli_hdx.json'

const FunctionalityMap: StatelessComponent = () => {
  const getColor = (d: number) => {
    return d > 87
      ? '#000000'
      : d > 83
      ? '#006837ff'
      : d > 79
      ? '#31a354ff'
      : d > 75
      ? '#78c679ff'
      : d > 70
      ? '#addd8eff'
      : d > 66
      ? '#d9f0a3ff'
      : d > 61
      ? '#ffffccff'
      : '#ffffff'
  }
  const style: L.StyleFunction = (feature) => {
    return {
      fillColor: getColor(feature?.properties?.Percentage),
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
      }}
    />
  )
}

export default FunctionalityMap
