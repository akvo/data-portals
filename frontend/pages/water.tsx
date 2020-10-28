import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'
import FunctionalityMapbox from '../components/water/FunctionalityMapbox'
import SeasonalityMapbox from '../components/water/SeasonalityMapbox'

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
              <FunctionalityMapbox
                source={`${API_PATH}/mali/functionality-percentage-per-region.geojson`}
                latitude={17.65}
                longitude={-4.15}
                zoom={4.4}
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
          <Col span={18}>
            <div
              style={{ height: '500px', width: '100%', marginBottom: '1em' }}
            >
              <SeasonalityMapbox
                source={`${API_PATH}/mali/waterpoints.geojson`}
                latitude={17.65}
                longitude={-4.15}
                zoom={4.4}
              />
            </div>
            <p>This map shows the functional and seasonal waterpoints.</p>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={9} style={{ paddingRight: '1em' }}>
            <div className="card">
              <strong>Frequency of Water Pump Types</strong>
              <div style={{ height: '300px' }}>
                <FrequencyOfPumpTypesChart
                  source={`${API_PATH}/mali/pump-type.json`}
                />
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
                <DistanceToWaterpointChart
                  source={`${API_PATH}/mali/distance.json`}
                />
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
                <ReasonForAbandonmentChart
                  source={`${API_PATH}/mali/abandonment.json`}
                />
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
                <MechanicVsManualPumpChart
                  source={`${API_PATH}/mali/mechanic-vs-manual-pump.json`}
                />
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
