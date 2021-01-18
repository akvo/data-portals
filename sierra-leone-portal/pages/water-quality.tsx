import { StatelessComponent } from 'react'
import { Row } from 'antd'
import WaterQualityMap from '../components/water-quality-map'

const WaterQuality: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <WaterQualityMap />
      </Row>
    </>
  )
}

export default WaterQuality
