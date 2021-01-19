import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import WaterQualityMap from '../components/water-quality-map'
import WaterQualitySummary from '../components/water-quality-summary-table'

const WaterQuality: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <WaterQualityMap />
      </Row>
      <Row className="dataSample">
        <Col span={14} offset={5}>
          <WaterQualitySummary />
        </Col>
      </Row>
    </>
  )
}

export default WaterQuality
