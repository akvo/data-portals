import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const dataSource = `${DATA_ENDPOINT}/households.geojson`
const riskLevelsConfig = [
  { level: 'Low Risk / Safe', color: '#488f31' },
  { level: 'Intermediate Risk / Probably Safe', color: '#ffa600' },
  { level: 'Intermediate Risk / Possibly Safe', color: '#ffa600' },
  { level: 'High Risk / Possibly Unsafe', color: '#f44611' },
  { level: 'High Risk / Probably Unsafe', color: '#f44611' },
  { level: 'Very High Risk / Unsafe', color: '#ff0000' },
]
const riskLevels = riskLevelsConfig.map((c) => c.level)
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'risk_level_ecoli'],
      ...riskLevelsConfig
        .reduce((c, i) => [...c, i.level, i.color], [] as string[])
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
            riskLevels.includes(f.properties.risk_level_ecoli)
          )
          const props = feature.properties
          const [longitude, latitude] = e.lngLat
          const level = props.risk_level_ecoli
          const mpn = props.mpn_per_100ml
          const confidence = props.conf_inter_ecoli
          const photo = props.photo_ecoli
          setPopupFeature({
            longitude,
            latitude,
            level,
            mpn,
            confidence,
            photo,
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
                <strong>Water point is: </strong>
                {popupFeature.level}
              </div>
              <div>
                <strong>MPN per 100 ml: </strong>
                {popupFeature.mpn}
              </div>
              <div>
                <strong>E. coli Upper 95% Confidence Interval: </strong>
                {popupFeature.confidence}
              </div>
              <img src={popupFeature.photo} width={300} />
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
