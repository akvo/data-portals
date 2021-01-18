import { StatelessComponent } from 'react'
import { Row } from 'antd'
import WaterAccessMap from '../components/water-access-map'

const WaterAccess: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <WaterAccessMap />
      </Row>
    </>
  )
}

export default WaterAccess
