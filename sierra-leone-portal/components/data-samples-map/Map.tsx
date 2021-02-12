import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const householdsConfig = [
  { color: '#cbc9e2', label: 'Surface water' },
  { color: '#9e9ac8', label: 'Improved' },
  { color: '#6a51a3', label: 'Unimproved' },
]

const waterpointdataSource = `${DATA_ENDPOINT}/waterpointdata.geojson`
const waterpointsSource = `${DATA_ENDPOINT}/waterpoints.geojson`
const householdsSource = `${DATA_ENDPOINT}/households.geojson`
const waterpointdataLayer: LayerProps = {
  id: 'waterpointdata',
  type: 'circle',
  beforeId: 'households',
  paint: {
    'circle-color': '#fdb863',
    'circle-radius': 2.5,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 1,
    'circle-stroke-opacity': 0.1,
  },
}
const waterpointsLayer: LayerProps = {
  id: 'waterpoints',
  type: 'circle',
  paint: {
    'circle-color': '#2b8cb3',
    'circle-radius': 2.5,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 1,
    'circle-stroke-opacity': 0.1,
  },
}
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  beforeId: 'waterpoints',
  paint: {
    'circle-color': [
      'match',
      ['get', 'sdg_improved_source'],
      ...householdsConfig
        .reduce((c, i) => [...c, i.label, i.color], [] as string[])
        .concat(['transparent']),
    ],
    'circle-radius': 2.7,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 1,
    'circle-stroke-opacity': 0.1,
  },
}

const Map: StatelessComponent = () => {
  const [popupFeature, setPopupFeature] = useState<MapPopupFeature | null>()
  const { data: hhData, error: hhError } = useSWR(householdsSource, fetcher)
  const { data: wpData, error: wpError } = useSWR(waterpointsSource, fetcher)
  const { data: wdData, error: wdError } = useSWR(waterpointdataSource, fetcher)

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseMap
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[
          waterpointsLayer.id as string,
          householdsLayer.id as string,
        ]}
        onClick={(e) => {
          setPopupFeature(null)
          if (!e.features.length) {
            return
          }
          const layerId = e.features[0].layer.id
          const props = e.features[0].properties
          const [longitude, latitude] = e.lngLat
          const data =
            layerId === 'households'
              ? {
                  label: 'Household Primary Water Source',
                  text: props.sdg_improved_source,
                }
              : { label: 'Water Point', text: props.water_supply_type }
          setPopupFeature({
            longitude,
            latitude,
            ...data,
          })
        }}
        error={wpError || hhError || wdError}
        loading={!wpData || !hhData || !wdData}
      >
        {wdData && (
          <Source type="geojson" data={wdData}>
            <Layer {...waterpointdataLayer} />
          </Source>
        )}
        {wpData && (
          <Source type="geojson" data={wpData}>
            <Layer {...waterpointsLayer} />
          </Source>
        )}
        {hhData && (
          <Source type="geojson" data={hhData}>
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
              <dl>
                <dt>
                  <strong>{popupFeature.label}:</strong>
                </dt>
                <dd>{popupFeature.text}</dd>
              </dl>
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
