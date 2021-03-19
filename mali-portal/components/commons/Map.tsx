import { StatelessComponent, useState } from 'react'
import ReactMapGL, {
  InteractiveMapProps,
  NavigationControl,
} from 'react-map-gl'
import { Spin } from 'antd'

const positronStyle =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

interface MapProps extends Partial<InteractiveMapProps> {
  latitude: number
  longitude: number
  zoom: number
  loading?: boolean
  error?: boolean
}

const Map: StatelessComponent<MapProps> = ({
  latitude,
  longitude,
  zoom,
  loading = false,
  error = false,
  children,
  ...props
}) => {
  const [viewport, setViewport] = useState({
    longitude,
    latitude,
    zoom,
  })

  const content = error ? (
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        padding: '0 0 0 5px',
      }}
    >
      <div style={{ color: 'red' }}>Failed to load data!</div>
    </div>
  ) : loading ? (
    <div className="swr-loader" style={{ width: '100%', height: '100%' }}>
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    children
  )

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
      scrollZoom={false}
      mapStyle={positronStyle}
      {...props}
    >
      {content}
      <NavigationControl showCompass={false} />
    </ReactMapGL>
  )
}

export default Map
