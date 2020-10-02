import { StatelessComponent } from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import WaterTreatmentChart from '../components/water-quality/WaterTreatmentChart'
import Pollution from '../components/water-quality/PollutionChart'

const WaterQuality: StatelessComponent = () => {
  return (
    <>
      <h1>Water quality</h1>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={8}>
            <Card>
              <Statistic
                title="Percentage of treated sources"
                value="15"
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={16} style={{ paddingLeft: '20px' }}>
            <h2>Water treatment</h2>
            <div style={{ height: '50vh' }}>
              <WaterTreatmentChart />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={8}>
            <Card>
              <Statistic
                title="Percentage of containing pollution sources"
                value="77.7"
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={16} style={{ paddingLeft: '20px' }}>
            <h2>Pollution</h2>
            <div style={{ height: '50vh' }}>
              <Pollution />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default WaterQuality
