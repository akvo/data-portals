import { StatelessComponent, useState } from 'react'
import { Source, Layer, LayerProps, PointerEvent, Popup } from 'react-map-gl'
import * as d3 from 'd3'
import { Feature } from 'geojson'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { DATA_ENDPOINT, DEFAULT_MAP_VIEWPORT } from '../../config'
import scaleToColorMap from '../../libs/scale-to-colormap'
import { FeaturePoint, HoverFeature } from '../../libs/data-types'
import ColorLegend from '../commons/ColorLegend'
import Map from '../commons/Map'
import MapTooltip from '../commons/MapTooltip'

const COMMUNES_GEO = `${DATA_ENDPOINT}/mali/communes.geojson`
const WATERPOINTS_GEO = `${DATA_ENDPOINT}/mali/waterpoints.geojson`
const CERCLES_DATA = `${DATA_ENDPOINT}/mali/cercles-data.json`

type Props = {
  safetyConfig: { color: string; label: string }[]
  safetyFilter?: string
  regionFilter?: string
}

const WaterSafetyMap: StatelessComponent<Props> = ({
  safetyConfig,
  safetyFilter,
  regionFilter,
}) => {
  const [clickedFeature, setClickedFeature] = useState<FeaturePoint | null>()
  const [hoveredFeature, setHoveredFeature] = useState<HoverFeature | null>()
  const { data: cercleData } = useSWR(CERCLES_DATA, fetcher)
  const { data: popData, error: popError } = useSWR(COMMUNES_GEO, fetcher)
  const { data: wpData, error: wpError } = useSWR(WATERPOINTS_GEO, fetcher)

  if (popError || wpError) {
    return <Map error={true} {...DEFAULT_MAP_VIEWPORT} />
  }
  if (!popData || !wpData) {
    return <Map loading={true} {...DEFAULT_MAP_VIEWPORT} />
  }

  const popValues = cercleData
    ? cercleData
        .map((d: { [key: string]: any }) => d.pop_2016)
        .filter((v: number) => v > 0)
    : popData.features
        .map((f: Feature) => f.properties?.pop_2016)
        .filter((v: number) => v > 0)
  const popScale = d3.scaleQuantize<string>(
    [Math.min(...popValues), Math.max(...popValues)],
    d3.schemePuBu[6]
  )
  const popColors = scaleToColorMap(popScale)
  const waterpointsStyle: LayerProps = {
    id: 'waterpoints',
    type: 'circle',
    paint: {
      'circle-color': [
        'match',
        ['get', 'puits_safety'],
        ...safetyConfig
          .reduce((c, i) => [...c, i.label, i.color], [] as string[])
          .concat(['transparent']),
      ],
      'circle-radius': 3,
      'circle-opacity': 0.7,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.2,
      'circle-stroke-opacity': 0.2,
    },
  }
  const mapFilter = [
    'all',
    safetyFilter ? ['==', 'puits_safety', safetyFilter] : null,
    regionFilter ? ['==', 'region', regionFilter] : null,
  ].filter((it) => it)
  const handleHover = ({
    features,
    srcEvent: { offsetX: x, offsetY: y },
  }: PointerEvent) => {
    const feature =
      features && features.find((f) => f.layer.id === 'population')
    setHoveredFeature(feature ? { feature: feature?.properties, x, y } : null)
  }
  const handleClick = ({
    features,
    lngLat: [longitude, latitude],
  }: PointerEvent) => {
    const feature =
      features && features.find((f) => f.layer.id === waterpointsStyle.id)
    setClickedFeature(
      feature ? { latitude, longitude, ...feature.properties } : null
    )
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map
        {...DEFAULT_MAP_VIEWPORT}
        interactiveLayerIds={[waterpointsStyle.id as string, 'population']}
        onClick={handleClick}
        onHover={handleHover}
      >
        <Source type="geojson" data={popData}>
          <Layer
            id="population"
            type="fill"
            paint={{
              'fill-opacity': 0.7,
              'fill-outline-color': '#aaa',
              'fill-color': {
                type: 'interval',
                property: 'pop_2016',
                stops: [[0, '#d1d1d1'], ...popColors],
              },
            }}
          />
        </Source>
        <Source type="geojson" data={wpData}>
          <Layer {...waterpointsStyle} filter={mapFilter} />
        </Source>
        {clickedFeature && (
          <Popup
            longitude={clickedFeature.longitude}
            latitude={clickedFeature.latitude}
            onClose={() => setClickedFeature(null)}
          >
            <div style={{ padding: '5px 10px 0' }}>
              <div>
                <strong>Expected to be safe: </strong>
                {clickedFeature.puits_safety}
              </div>
            </div>
          </Popup>
        )}
        {hoveredFeature && !clickedFeature && (
          <MapTooltip
            x={hoveredFeature.x}
            y={hoveredFeature.y}
            data={{
              admin2_nam: hoveredFeature.feature?.admin2_nam,
              pop_2016: hoveredFeature.feature?.pop_2016,
            }}
          />
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
        <ColorLegend
          scale={popScale}
          title="Population per district"
          width={350}
        />
        <div className="info legend map-control">
          {safetyConfig.map((it) => (
            <div className="lengend-item" key={it.label}>
              <i className="circle" style={{ background: it.color }} />
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WaterSafetyMap
