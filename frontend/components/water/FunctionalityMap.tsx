import { StatelessComponent } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import L from 'leaflet'
import LeafletMap from '../LeafletMap'
import functionality from './data/functionality.json'

type Props = {
  accessToken: string
}

const FunctionalityMap: StatelessComponent<Props> = ({ accessToken }) => {
  return (
    <LeafletMap
      accessToken={accessToken}
      onMount={(map) => {
        const geojsonMarkerOptions = {
          radius: 5,
          fillColor: '#ff7800',
          color: '#000',
          weight: 1,
          opacity: 0.5,
          fillOpacity: 0.8,
        }

        const onEachFeature = (feature: Feature, layer: L.Layer) => {
          const popupContent = `
              <table>
              <tr>
                <th>id:</th>
                <td>${feature?.properties?.functionality_main}</td>
              </tr>
              </table>`

          layer.bindPopup(popupContent)
        }

        const feature = L.geoJSON(functionality as FeatureCollection, {
          onEachFeature: onEachFeature,
          pointToLayer: function (_, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions)
          },
        }).addTo(map)

        map.fitBounds(feature.getBounds())
      }}
    />
  )
}

export default FunctionalityMap
