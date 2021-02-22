import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import { MapPopupFeature } from '../../libs/types'
import BaseMap from '../base-map'

const waterpointsSource = `${DATA_ENDPOINT}/waterpoints.geojson`
const householdsSource = `${DATA_ENDPOINT}/households.geojson`
const householdsConfig = [
  { type: 'Improved', color: '#a6dba0' },
  { type: 'Unimproved', color: '#008837' },
]
const householdsLayer: LayerProps = {
  id: 'households',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'sdg_improved_source'],
      ...householdsConfig
        .reduce((c, i) => [...c, i.type, i.color], [] as string[])
        .concat(['transparent']),
    ],
    'circle-radius': 3,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 0.2,
    'circle-stroke-opacity': 0.2,
  },
}
const waterpointsLayer: LayerProps = {
  id: 'waterpoints',
  type: 'circle',
  paint: {
    'circle-color': '#2b8cb3',
    'circle-radius': 3,
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
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseMap
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[
          householdsLayer.id as string,
          waterpointsLayer.id as string,
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
              ? [
                  {
                    label: 'The main water source is',
                    text: props.sdg_improved_source,
                  },
                  {
                    label: 'Distance to the main source is',
                    text: props.sdg_round_trip,
                  },
                ]
              : [{ label: 'Water Point', text: props.water_supply_type }]
          setPopupFeature({
            longitude,
            latitude,
            data,
          })
        }}
        error={wpError || hhError}
        loading={!wpData || !hhData}
      >
        {hhData && (
          <Source type="geojson" data={hhData}>
            <Layer {...householdsLayer} />
          </Source>
        )}
        {wpData && (
          <Source type="geojson" data={wpData}>
            <Layer {...waterpointsLayer} />
          </Source>
        )}
        {popupFeature && (
          <Popup
            longitude={popupFeature.longitude}
            latitude={popupFeature.latitude}
            onClose={() => setPopupFeature(null)}
          >
            <div style={{ padding: '5px 10px 0 0' }}>
              {popupFeature.data.map(
                (
                  { label, text }: { label: string; text: string },
                  index: number
                ) => (
                  <div key={index}>
                    <strong>{label}:</strong>
                    &nbsp;{text}
                  </div>
                )
              )}
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
