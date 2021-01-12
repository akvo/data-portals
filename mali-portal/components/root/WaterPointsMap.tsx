import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup, PointerEvent } from 'react-map-gl'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import { FeaturePoint } from '../../libs/data-types'
import Map from '../commons/Map'

const DATA_SOURCE = `${DATA_ENDPOINT}/mali/waterpoints.geojson`

type Props = {
  functionalityConfig: { color: string; label: string }[]
  functionalFilter?: string
  regionFilter?: string
}

const WaterPointsMap: StatelessComponent<Props> = ({
  functionalityConfig,
  functionalFilter,
  regionFilter,
}) => {
  const [featurePoint, setFeaturePoint] = useState<FeaturePoint | null>()
  const { data, error } = useSWR(DATA_SOURCE, fetcher)

  if (error) {
    return <Map error={true} {...DEFAULT_MAP_VIEWPORT} />
  }
  if (!data) {
    return <Map loading={true} {...DEFAULT_MAP_VIEWPORT} />
  }

  const waterpointsStyle: LayerProps = {
    id: 'waterpoint',
    type: 'circle',
    paint: {
      'circle-color': [
        'match',
        ['get', 'functionality_main'],
        ...functionalityConfig
          .reduce((c, i) => [...c, i.label, i.color], [] as string[])
          .concat(['transparent']),
      ],
      'circle-radius': 4,
      'circle-opacity': 0.7,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.2,
      'circle-stroke-opacity': 0.2,
    },
  }
  const mapFilter = [
    'all',
    functionalFilter ? ['==', 'functionality_main', functionalFilter] : null,
    regionFilter ? ['==', 'region', regionFilter] : null,
  ].filter((it) => it)
  const handleClick = ({
    features,
    lngLat: [longitude, latitude],
  }: PointerEvent) => {
    const feature =
      features && features.find((f) => f.layer.id === waterpointsStyle.id)
    setFeaturePoint(
      feature ? { latitude, longitude, ...feature.properties } : null
    )
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[waterpointsStyle.id as string]}
        onClick={handleClick}
      >
        <Source type="geojson" data={data}>
          <Layer {...waterpointsStyle} filter={mapFilter} />
        </Source>
        {featurePoint && (
          <Popup
            longitude={featurePoint.longitude}
            latitude={featurePoint.latitude}
            onClose={() => setFeaturePoint(null)}
          >
            <div style={{ padding: '5px 10px 0 0' }}>
              <div>
                <strong>Functionality: </strong>
                {featurePoint.functionality_main}
              </div>
              <div>
                <strong>Seasonality: </strong>
                {featurePoint.seasonality}
              </div>
              <div>
                <strong>Availability in months: </strong>
                {featurePoint.water_months}
              </div>
              <div>
                <strong>Safety: </strong>
                {featurePoint.puits_safety}
              </div>
            </div>
            <div>
              <img src={featurePoint.photo} width={300} />
            </div>
          </Popup>
        )}
      </Map>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '10px 10px 0 0',
        }}
      >
        <div className="info legend map-control">
          {functionalityConfig.map((it) => (
            <div className="legend-item" key={it.label}>
              <i className="circle" style={{ background: it.color }} />
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WaterPointsMap
