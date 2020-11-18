import { StatelessComponent } from 'react'
import { Source, Layer } from 'react-map-gl'
import * as d3 from 'd3'
import { Feature } from 'geojson'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import ColorLegend from '../commons/ColorLegend'
import scaleToColorMap from '../../libs/scale-to-colormap'
import Map from '../commons/Map'

type Props = {
  source: string
  latitude: number
  longitude: number
  zoom: number
}

const FunctionalityMap: StatelessComponent<Props> = ({ source, ...props }) => {
  const { data, error } = useSWR(source, fetcher)

  if (error) {
    return <Map error={true} {...props} />
  }
  if (!data) {
    return <Map loading={true} {...props} />
  }

  const values = data.features
    .map((f: Feature) => f.properties?.value)
    .filter((v: number) => v > 0)
  const scale = d3.scaleQuantize<string>(
    [Math.min(...values), Math.max(...values)],
    d3.schemePuBu[6]
  )
  const fillColor = scaleToColorMap(scale)

  return (
    <Map {...props}>
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
    </Map>
  )
}

export default FunctionalityMap
