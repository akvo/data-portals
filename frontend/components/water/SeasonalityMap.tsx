import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { FeaturePoint } from '../../libs/data-types'
import Map from '../commons/Map'

const functionalityColors = [
  { color: '#346888', label: 'fonctionnel' },
  { color: '#de425b', label: 'seasonal' },
]

const functionalityFilters: { [key: string]: any } = functionalityColors.reduce(
  (filters, { label }) => {
    filters[label] = ['==', 'functionality_main', label]
    return filters
  },
  {} as { [key: string]: any }
)

type Props = {
  source: string
  latitude: number
  longitude: number
  zoom: number
}

const SeasonalityMap: StatelessComponent<Props> = ({ source, ...props }) => {
  const [featurePoint, setFeaturePoint] = useState<FeaturePoint | null>()
  const [mapFilter, setMapFilter] = useState<any[]>([
    'any',
    ...Object.entries(functionalityFilters).map(([_, v]) => v),
  ])
  const { data, error } = useSWR(source, fetcher)

  if (error) {
    return <Map error={true} {...props} />
  }
  if (!data) {
    return <Map loading={true} {...props} />
  }

  const waterpointLayer: LayerProps = {
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
        'transparent',
      ],
      'circle-radius': 3,
      'circle-opacity': 0.7,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.2,
      'circle-stroke-opacity': 0.2,
    },
    filter: mapFilter,
  }

  const handleSelectFilter = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const key = e.currentTarget.value
    const filter =
      key === 'all'
        ? ['any', ...Object.entries(functionalityFilters).map(([_, v]) => v)]
        : functionalityFilters[key]
    setMapFilter(filter)
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map
        {...props}
        interactiveLayerIds={[waterpointLayer.id as string]}
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
          })
        }}
      >
        <Source type="geojson" data={data}>
          <Layer {...waterpointLayer} />
        </Source>
        {featurePoint && (
          <Popup
            longitude={featurePoint.longitude}
            latitude={featurePoint.latitude}
            onClose={() => setFeaturePoint(null)}
          >
            <div style={{ padding: '5px 10px 0' }}>{featurePoint.text}</div>
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
          <select onChange={handleSelectFilter}>
            <option value="all"></option>
            {functionalityColors.map((it) => (
              <option value={it.label} key={it.label}>
                {it.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SeasonalityMap
