import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const dataSource = `${DATA_ENDPOINT}/households.geojson`
const sourceConfig = [
  { type: 'Improved', color: '#67a9cf' },
  { type: 'Unimproved', color: '#02818a' },
]
const sources = sourceConfig.map((c) => c.type)
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'sdg_improved_source'],
      ...sourceConfig
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
            sources.includes(f.properties.sdg_improved_source)
          )
          const props = feature.properties
          const [longitude, latitude] = e.lngLat
          const source = props.sdg_improved_source
          const distance = props.sdg_round_trip
          setPopupFeature({
            longitude,
            latitude,
            source,
            distance,
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
                <strong>The main water source is: </strong>
                {popupFeature.source}
              </div>
              <div>
                <strong>Distance to the main source is: </strong>
                {popupFeature.distance}
              </div>
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
