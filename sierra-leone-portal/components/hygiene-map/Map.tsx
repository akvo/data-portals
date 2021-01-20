import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const dataSource = `${DATA_ENDPOINT}/households.geojson`
const hygieneConfig = [
  { type: 'Basic/Limited', color: '#2b8cbe' },
  { type: 'No facility', color: '#bae4bc' },
]
const hygieneType = hygieneConfig.map((c) => c.type)
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'sdg_hand_washing'],
      ...hygieneConfig
        .reduce((c, i) => [...c, i.type, i.color], [] as string[])
        .concat(['transparent']),
    ],
    'circle-radius': 4,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 0.2,
    'circle-stroke-opacity': 0.2,
  },
}

const Map: StatelessComponent = () => {
  const [popupFeature, setPopupFeature] = useState<MapPopupFeature | null>()
  const { data, error } = useSWR(dataSource, fetcher)
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseMap
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[householdsLayer.id as string]}
        onClick={(e) => {
          setPopupFeature(null)
          if (!e.features.length) {
            return
          }
          const [feature] = e.features.filter((f) =>
            hygieneType.includes(f.properties.sdg_hand_washing)
          )
          const props = feature.properties
          const [longitude, latitude] = e.lngLat
          const type = props.sdg_hand_washing
          const observed = props.hand_wash_observe
          setPopupFeature({
            longitude,
            latitude,
            type,
            observed,
          })
        }}
        error={!!error}
        loading={!data}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...householdsLayer} />
          </Source>
        )}
        {popupFeature && (
          <Popup
            longitude={popupFeature.longitude}
            latitude={popupFeature.latitude}
            onClose={() => setPopupFeature(null)}
          >
            <div style={{ padding: '5px 10px 0 0' }}>
              <div>
                <strong>Hand washing facility is: </strong>
                {popupFeature.type}
              </div>
              <div>
                <strong>Enumerator observed hand washing: </strong>
                {popupFeature.observed}
              </div>
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
