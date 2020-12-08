import { StatelessComponent, useState } from 'react'
import { Source, Layer, PointerEvent, MapLoadEvent } from 'react-map-gl'
import { FillPaint } from 'mapbox-gl'
import * as d3 from 'd3'
import useSWR from 'swr'
import { API_PATH, DEFAULT_MAP_VIEWPORT } from '../../config'
import fetcher from '../../libs/fetcher'
import ColorLegend from '../commons/ColorLegend'
import scaleToColorMap from '../../libs/scale-to-colormap'
import { HoverFeature } from '../../libs/data-types'
import Map from '../commons/Map'
import MapHoverTooltip from './MapHoverTooltip'

const COMMUNES_GEO = `${API_PATH}/mali/communes.geojson`
const CERCLES_DATA = `${API_PATH}/mali/cercles-data.json`

type Props = {
  title: string
  attribute: string
}

const WaterMap: StatelessComponent<Props> = ({ title, attribute }) => {
  const [hoveredFeature, setHoveredFeature] = useState<HoverFeature | null>()
  const { data: cercleData, error: cercleError } = useSWR(CERCLES_DATA, fetcher)
  const { data: geoData, error: geoError } = useSWR(COMMUNES_GEO, fetcher)

  if (cercleError || geoError) {
    return <Map error={true} {...DEFAULT_MAP_VIEWPORT} />
  }
  if (!cercleData || !geoData) {
    return <Map loading={true} {...DEFAULT_MAP_VIEWPORT} />
  }

  const values = cercleData
    .map((d: { [key: string]: any }) => d[attribute])
    .filter((v: number) => v > 0)
  const scale = d3.scaleQuantize<string>(
    [Math.min(...values), Math.max(...values)],
    d3.schemePRGn[6]
  )
  const geoColors = scaleToColorMap(scale)
  const geoPaint: FillPaint = {
    'fill-opacity': 0.7,
    'fill-outline-color': '#666',
    'fill-color': {
      type: 'interval',
      property: attribute,
      stops: [[0, '#111'], ...geoColors],
    },
  }
  const handleHover = ({
    features,
    srcEvent: { offsetX: x, offsetY: y },
  }: PointerEvent) => {
    const feature = features && features.find((f) => f.layer.id === 'data')
    setHoveredFeature(feature ? { feature: feature?.properties, x, y } : null)
  }
  const handleMapLoad = (e: MapLoadEvent) => {
    const map = e.target
    map.loadImage('/black-twill.png', (err: Error, image: ImageData) => {
      if (err) throw err
      map.addImage('texture', image)
    })
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map
        {...DEFAULT_MAP_VIEWPORT}
        onHover={handleHover}
        onLoad={handleMapLoad}
      >
        <Source type="geojson" data={geoData}>
          <Layer id="data" type="fill" paint={geoPaint} />
          <Layer
            id="urbain"
            type="fill"
            paint={{
              'fill-color': 'transparent',
              'fill-pattern': 'texture',
            }}
            filter={['all', ['==', 'milieu', 'URBAIN']]}
          />
        </Source>
        {hoveredFeature && (
          <MapHoverTooltip
            x={hoveredFeature.x}
            y={hoveredFeature.y}
            data={{
              admin2_nam: hoveredFeature.feature?.admin2_nam,
              pop2017_to: hoveredFeature.feature?.pop2017_to,
              [attribute]: hoveredFeature.feature?.[attribute],
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
        <ColorLegend scale={scale} title={title} width={350} />
      </div>
    </div>
  )
}

export default WaterMap
