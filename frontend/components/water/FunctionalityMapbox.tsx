import { StatelessComponent, useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import { Spin } from 'antd'
import * as d3 from 'd3'
import { Feature } from 'geojson'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import ColorLegend from '../commons/ColorLegend'
import scaleToColorMap from '../../libs/scale-to-colormap'

const positronStyle =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

type Props = {
  source: string
  latitude: number
  longitude: number
  zoom: number
}

const FunctionalityMapbox: StatelessComponent<Props> = ({
  source,
  latitude,
  longitude,
  zoom,
}) => {
  const [viewport, setViewport] = useState({
    longitude,
    latitude,
    zoom,
  })
  const { data, error } = useSWR(source, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className="swr-loader">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  const values = data.features
    .map((f: Feature) => f.properties?.value)
    .filter((v: number) => v > 0)
  const scale = d3.scaleQuantize<string>(
    [Math.min(...values), Math.max(...values)],
    d3.schemeYlGn[6]
  )
  const fillColor = scaleToColorMap(scale)

  return (
    <ReactMapGL
      width="100%"
      height="100%"
      {...viewport}
      onViewportChange={(v) =>
        setViewport({
          latitude: v.latitude,
          longitude: v.longitude,
          zoom: v.zoom,
        })
      }
      mapStyle={positronStyle}
    >
      <Source type="geojson" data={data}>
        <Layer
          id="population"
          type="fill"
          paint={{
            'fill-color': {
              property: 'value',
              stops: [[0, '#d1d1d1'], ...fillColor],
            },
            'fill-opacity': 0.7,
            'fill-outline-color': '#666',
          }}
        />
      </Source>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '10px 10px 0 0',
        }}
      >
        <ColorLegend
          scale={scale}
          title="Percentage of functional waterpoints"
          width={350}
        />
      </div>
    </ReactMapGL>
  )
}

export default FunctionalityMapbox
