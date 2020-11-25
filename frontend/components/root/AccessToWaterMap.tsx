import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { FeaturePoint } from '../../libs/data-types'
import Map from '../commons/Map'

const functionalityColors = [
  { color: '#003f5c', label: 'fonctionnel' },
  { color: '#bc5090', label: 'en panne' },
  { color: '#ffa600', label: 'non utilisé' },
]

const commonWaterpointLayer: LayerProps = {
  id: 'waterpoint',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'functionality_main'],
      functionalityColors[0].label,
      functionalityColors[0].color,
      functionalityColors[1].label,
      functionalityColors[1].color,
      functionalityColors[2].label,
      functionalityColors[2].color,
      'transparent',
    ],
    'circle-radius': 4,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 0.2,
    'circle-stroke-opacity': 0.2,
  },
}

type Props = {
  source: string
  regions: string
  latitude: number
  longitude: number
  zoom: number
}

const AccessToWaterMap: StatelessComponent<Props> = ({
  source,
  regions,
  ...props
}) => {
  const [featurePoint, setFeaturePoint] = useState<FeaturePoint | null>()
  const [functionalFilter, setFunctionalFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const { data, error } = useSWR(source, fetcher)
  const { data: regionNames } = useSWR(regions, fetcher)

  if (error) {
    return <Map error={true} {...props} />
  }
  if (!data) {
    return <Map loading={true} {...props} />
  }

  const mapFilter = [
    'all',
    functionalFilter ? ['==', 'functionality_main', functionalFilter] : null,
    regionFilter ? ['==', 'region', regionFilter] : null,
  ].filter((it) => it)

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map
        {...props}
        interactiveLayerIds={[commonWaterpointLayer.id as string]}
        onClick={(e) => {
          if (!e.features.length) {
            setFeaturePoint(null)
            return
          }
          const props = e.features[0].properties
          setFeaturePoint({
            longitude: e.lngLat[0],
            latitude: e.lngLat[1],
            text: props.functionality_main,
            photo: props.photo,
          })
        }}
      >
        <Source type="geojson" data={data}>
          <Layer {...commonWaterpointLayer} filter={mapFilter} />
        </Source>
        {featurePoint && (
          <Popup
            longitude={featurePoint.longitude}
            latitude={featurePoint.latitude}
            onClose={() => setFeaturePoint(null)}
          >
            <div style={{ padding: '5px 10px 0 0' }}>{featurePoint.text}</div>
            <img src={featurePoint.photo} width={300} />
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
          {functionalityColors.map((it) => (
            <div className="legend-item" key={it.label}>
              <i className="circle" style={{ background: it.color }} />
              {it.label}
            </div>
          ))}
        </div>
        <div className="info map-control">
          <div>
            <strong>Filter</strong>
          </div>
          <div>
            <label>by functionality</label>
            <br />
            <select
              onChange={(e) => setFunctionalFilter(e.currentTarget.value)}
            >
              <option></option>
              {functionalityColors.map((it) => (
                <option value={it.label} key={it.label}>
                  {it.label}
                </option>
              ))}
            </select>
          </div>
          {regionNames && (
            <div>
              <label>by region</label>
              <br />
              <select onChange={(e) => setRegionFilter(e.currentTarget.value)}>
                <option></option>
                {regionNames.map((name: string) => (
                  <option value={name} key={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccessToWaterMap
