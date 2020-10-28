import { StatelessComponent, useState } from 'react'
import ReactMapGL, { Source, Layer, LayerProps, Popup } from 'react-map-gl'
import { Spin } from 'antd'
import * as d3 from 'd3'
import { Feature } from 'geojson'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import ColorLegend from '../commons/ColorLegend'
import scaleToColorMap from '../../libs/scale-to-colormap'
import { FeaturePoint } from '../../libs/data-types'

const positronStyle =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

const safetyColors = [
  { color: '#fdae61', label: "Le puits n'est pas sûr" },
  { color: '#003f5c', label: 'Le puits est sûr' },
]

const waterpointLayer: LayerProps = {
  id: 'waterpoint',
  type: 'circle',
  paint: {
    'circle-color': [
      'match',
      ['get', 'puits_safety'],
      safetyColors[0].label,
      safetyColors[0].color,
      safetyColors[1].label,
      safetyColors[1].color,
      'transparent',
    ],
    'circle-radius': 3,
    'circle-opacity': 0.7,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 0.2,
    'circle-stroke-opacity': 0.2,
  },
  filter: [
    'any',
    ...safetyColors.map((it) => ['==', 'puits_safety', it.label]),
  ],
}

type Props = {
  populationSource: string
  waterpointSource: string
  latitude: number
  longitude: number
  zoom: number
}

const WaterQualityMapbox: StatelessComponent<Props> = ({
  populationSource,
  waterpointSource,
  latitude,
  longitude,
  zoom,
}) => {
  const [viewport, setViewport] = useState({
    longitude,
    latitude,
    zoom,
  })
  const [featurePoint, setFeaturePoint] = useState<FeaturePoint | null>()
  const { data: pData, error: pError } = useSWR(populationSource, fetcher)
  const { data: wData, error: wError } = useSWR(waterpointSource, fetcher)

  if (pError || wError) return <div>failed to load</div>
  if (!pData || !wData)
    return (
      <div className="swr-loader">
        <Spin size="large" tip="Loading..." />
      </div>
    )

  const values = pData.features
    .map((f: Feature) => f.properties?.value)
    .filter((v: number) => v > 0)
  const pScale = d3.scaleQuantize<string>(
    [Math.min(...values), Math.max(...values)],
    d3.schemeBlues[6]
  )
  const fillColor = scaleToColorMap(pScale)

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
          text: props.puits_safety,
        })
      }}
    >
      <Source type="geojson" data={pData}>
        <Layer
          id="population"
          type="fill"
          paint={{
            'fill-color': {
              property: 'value',
              stops: [[0, '#d1d1d1'], ...fillColor],
            },
            'fill-opacity': 0.7,
            'fill-outline-color': '#aaa',
          }}
        />
      </Source>
      <Source type="geojson" data={wData}>
        <Layer {...waterpointLayer} />
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
          scale={pScale}
          title="Population per district"
          width={350}
        />
        <div className="info legend map-control">
          {safetyColors.map((it) => (
            <div className="lengend-item" key={it.label}>
              <i className="circle" style={{ background: it.color }} />
              {it.label}
            </div>
          ))}
        </div>
      </div>
      {featurePoint && (
        <Popup
          longitude={featurePoint.longitude}
          latitude={featurePoint.latitude}
          onClose={() => setFeaturePoint(null)}
        >
          <div style={{ padding: '5px 10px 0' }}>{featurePoint.text}</div>
        </Popup>
      )}
    </ReactMapGL>
  )
}

export default WaterQualityMapbox
