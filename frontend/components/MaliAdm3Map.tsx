import { StatelessComponent } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import L from 'leaflet'
import LeafletMap from './LeafletMap'
import data from './mali-adm3.json'

type Props = {
  accessToken: string
}

const style = () => {
  return {
    weight: 1,
  }
}

const onEachFeature = (feature: Feature, layer: L.Layer) => {
  const popupContent = `
    <table>
      <tr>
        <th>Region</th>
        <td>${feature?.properties?.admin1Name}</td>
      </tr>
      <tr>
        <th>Cercle</th>
        <td>${feature?.properties?.admin2Name}</td>
      </tr>
      <tr>
        <th>Commune</th>
        <td>${feature?.properties?.admin3Name}</td>
      </tr>
    </table>`

  layer.bindPopup(popupContent)
}

const MaliAdm3Map: StatelessComponent<Props> = ({ accessToken }) => {
  return (
    <LeafletMap
      accessToken={accessToken}
      onMount={(map) => {
        const feature = L.geoJSON(data as FeatureCollection, {
          onEachFeature: onEachFeature,
          style: style,
        }).addTo(map)

        map.fitBounds(feature.getBounds())
      }}
    />
  )
}

export default MaliAdm3Map
