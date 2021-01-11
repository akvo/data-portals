import { StatelessComponent } from 'react'

type Props = {
  x: number
  y: number
  data: { [key: string]: string | number }
}

const MapHoverTooltip: StatelessComponent<Props> = ({ x, y, data }) => {
  return (
    <div className="map--tooltip" style={{ left: x, top: y }}>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {data[key]}
        </div>
      ))}
    </div>
  )
}

export default MapHoverTooltip
