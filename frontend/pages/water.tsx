import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import dynamic from 'next/dynamic'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'

const FunctionalityMap = dynamic(
  () => import('../components/water/FunctionalityMap'),
  { ssr: false }
)

const Water: StatelessComponent = () => {
  return (
    <>
      <h1>Functionality</h1>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={18}>
            <div
              style={{ height: '500px', width: '100%', marginBottom: '1em' }}
            >
              <FunctionalityMap
                source={`${API_PATH}/mali/functionality-percentage-per-region.geojson`}
              />
            </div>
            <p>
              This map shows the percentage of functional waterpoints per
              district.
            </p>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={9} style={{ paddingRight: '1em' }}>
            <div className="card">
              <strong>Frequency of Water Pump Types</strong>
              <div style={{ height: '300px' }}>
                <FrequencyOfPumpTypesChart />
              </div>
            </div>
            <p>
              The <em>forage équipé de PMH</em> is the most frequently seen
              water point of which 35% is functional. Second most frequent is
              the <em>puits modern</em>, of which 38% is functional.
            </p>
          </Col>
          <Col span={9} style={{ paddingLeft: '1em' }}>
            <div className="card">
              <strong>Distance to the Water Point</strong>
              <div style={{ height: '300px' }}>
                <DistanceToWaterpointChart />
              </div>
            </div>
            <p>
              The biggest amount of functional water points is less that 200
              meters from the household: 28%. 25% of the water points is less
              than a kilometer away.
            </p>
          </Col>
          <Col span={6}>
            <div className="statistic">
              <div className="statistic-number">81%</div>
              <div className="statistic-desc">
                of the water points is functional
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={9} style={{ paddingRight: '1em' }}>
            <div className="card">
              <strong>Reason for abandonment of the water point</strong>
              <div style={{ height: '300px' }}>
                <ReasonForAbandonmentChart />
              </div>
            </div>
            <p>
              The main reason for water point to be abandoned is the taste,
              second is the color.
            </p>
          </Col>
          <Col span={9} style={{ paddingLeft: '1em' }}>
            <div className="card">
              <strong>Mechanic versus manual pump</strong>
              <div style={{ height: '300px' }}>
                <MechanicVsManualPumpChart />
              </div>
            </div>
            <p>60% of the water points is a Pompe à Motricité Humaine.</p>
          </Col>
          <Col span={6}>
            <div className="statistic">
              <div className="statistic-number">6%</div>
              <div className="statistic-desc">
                of the water points is abandonned
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Water
