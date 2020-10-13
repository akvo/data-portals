import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import dynamic from 'next/dynamic'
import WaterTreatmentChart from '../components/water-quality/WaterTreatmentChart'
import Pollution from '../components/water-quality/PollutionChart'

const WaterQualityMap = dynamic(
  () => import('../components/water-quality/WaterQualityMap'),
  { ssr: false }
)

const WaterQuality: StatelessComponent = () => {
  return (
    <>
      <h1>Water quality</h1>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={18}>
            <div
              style={{ height: '500px', width: '100%', marginBottom: '1em' }}
            >
              <WaterQualityMap
                source={`${API_PATH}/mali/population-per-region.geojson`}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={3}>
            <h2>Pumps</h2>
          </Col>
          <Col span={15}>
            <div className="card">
              <strong>Water treatment</strong>
              <div style={{ height: '300px' }}>
                <WaterTreatmentChart />
              </div>
            </div>
            <p>
              Almost all the pumps that are treated regularly, which is 15%, are
              treated with <em>eau de javel</em>.
            </p>
          </Col>
          <Col span={6}>
            <div className="statistic">
              <div className="statistic-number">15%</div>
              <div className="statistic-desc">of the sources is treated</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={3}>
            <h2>PMH</h2>
          </Col>
          <Col span={15}>
            <div className="card">
              <strong>Pollution</strong>
              <div style={{ height: '300px' }}>
                <Pollution />
              </div>
            </div>
            <p>
              Of the PMH 24% has manqué d’entretien and 13% has manqué de
              fermeture.
            </p>
          </Col>
          <Col span={6}>
            <div className="statistic">
              <div className="statistic-number">77.7%</div>
              <div className="statistic-desc">
                of the water points contain pollution
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default WaterQuality
