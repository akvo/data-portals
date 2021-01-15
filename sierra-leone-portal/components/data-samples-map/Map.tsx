import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import BaseMap from '../base-map'

const householdsSource = `${DATA_ENDPOINT}/households.geojson`
const waterpointsSource = `${DATA_ENDPOINT}/waterpoints.geojson`

export type PopupFeature = {
  latitude: number
  longitude: number
  [name: string]: any
}

const Map: StatelessComponent = () => {
  const [popupFeature, setPopupFeature] = useState<PopupFeature | null>()
  const { data: hhData, error: hhError } = useSWR(householdsSource, fetcher)
  const { data: wpData, error: wpError } = useSWR(waterpointsSource, fetcher)
  const householdsLayer: LayerProps = {
    id: 'households',
    type: 'circle',
    paint: {
      'circle-color': '#4c6a82',
      'circle-radius': 3,
      'circle-opacity': 0.3,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.2,
      'circle-stroke-opacity': 0.1,
    },
  }
  const waterpointsLayer: LayerProps = {
    id: 'waterpoints',
    type: 'circle',
    paint: {
      'circle-color': '#ffa600',
      'circle-radius': 3.5,
      'circle-opacity': 0.2,
      'circle-stroke-color': '#ffa600',
      'circle-stroke-width': 2,
      'circle-stroke-opacity': 0.7,
    },
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseMap
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[
          waterpointsLayer.id as string,
          householdsLayer.id as string,
        ]}
        onClick={(e) => {
          if (!e.features.length) {
            setPopupFeature(null)
            return
          }
          const props = e.features[0].properties
          const [longitude, latitude] = e.lngLat
          const info = props.info
          setPopupFeature({
            longitude,
            latitude,
            info,
          })
        }}
        error={wpError || hhError}
        loading={!wpData || !hhData}
      >
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
                  <strong>Source:</strong>
                </dt>
                <dd>{popupFeature.info}</dd>
              </dl>
            </div>
          </Popup>
        )}
      </BaseMap>
    </div>
  )
}

export default Map
