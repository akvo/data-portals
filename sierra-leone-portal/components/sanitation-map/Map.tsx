import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const dataSource = `${DATA_ENDPOINT}/households.geojson`
const sanitationConfig = [
  { type: 'Improved', color: '#bdc9e1' },
  { type: 'Unimproved', color: '#67a9cf' },
  { type: 'Open Defecation', color: '#02818a' },
]
const sanitationTypes = sanitationConfig.map((c) => c.type)
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'sdg_sanitation'],
      ...sanitationConfig
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
            sanitationTypes.includes(f.properties.sdg_sanitation)
          )
          const props = feature.properties
          const [longitude, latitude] = e.lngLat
          const sanitation = props.sdg_sanitation
          const type = props.toilet_facility_type
          const flushTo = props.flush_to
          const isShared = props.shared_facility
          setPopupFeature({
            longitude,
            latitude,
            sanitation,
            type,
            flushTo,
            isShared,
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
                <strong>Sanitation is: </strong>
                {popupFeature.sanitation}
              </div>
              <div>
                <strong>Type of facility: </strong>
                {popupFeature.type}
              </div>
              <div>
                <strong>Flushes to: </strong>
                {popupFeature.flushTo}
              </div>
              <div>
                <strong>Is the facility shared: </strong>
                {popupFeature.isShared}
              </div>
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
