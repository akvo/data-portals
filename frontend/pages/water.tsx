import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'
import FunctionalityMap from '../components/water/FunctionalityMap'
import SeasonalityMap from '../components/water/SeasonalityMap'

const Water: StatelessComponent = () => {
  return (
    <>
      <nav class="sideNav"> 
        <ul>
          <li><a href="#map02">map 02</a></li>
          <li><a href="#pumpType">Pump type</a></li>
          <li><a href="#pumpStatus">Pump type</a></li>
          <li><a href="#map01">map 01</a></li>
        </ul>
      </nav>
      <Row className="map" id="map01">
        <Col span={20}>
          <div className="map--front">
            <FunctionalityMap
              source={`${API_PATH}/mali/functionality-percentage-per-region.geojson`}
              latitude={17.65}
              longitude={-4.15}
              zoom={4.4}
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="map--info">
            <p>
              This map shows the percentage of functional water points per Mali
              district. <br />
              The darker green the color the higher the percentage of existing
              water points that is functional.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="map"  id="map02">
      <Col span={20}>
          <div className="map--front">
            <SeasonalityMap
              source={`${API_PATH}/mali/waterpoints.geojson`}
              latitude={17.65}
              longitude={-4.15}
              zoom={4.4}
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="map--info"> 
            <p> This map shows functional water points that are seasonal and
              therefore are dry some time during the year.</p>
            <p>
              The green points show the water points that are functional
              throughout the year. <br />
              The yellow points show the water points that have dry periods
              during the year.{' '}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataLight"  id="pumpType">
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">81%</div>
            <div className="statistic-desc">
              of the water points is functional
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Frequency of Water Pump Types</h3>
            <div className="vis">
              <FrequencyOfPumpTypesChart
                source={`${API_PATH}/mali/pump-type.json`}
              />
            </div>
            <p>
              The <em>forage équipé de PMH</em> is the most frequently seen
              water point of which 35% is functional. Second most frequent is
              the <em>puits modern</em>, of which 38% is functional.
            </p>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Distance to the Water Point</h3>
            <div className="vis">
              <DistanceToWaterpointChart
                source={`${API_PATH}/mali/distance.json`}
              />
            </div>
            <p>
              The biggest amount of functional water points is less that 200
              meters from the household: 28%. 25% of the water points is less
              than a kilometer away.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataDark"  id="pumpStatus">
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">6%</div>
            <div className="statistic-desc">
              of the water points is abandonned
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Reason for abandonment of the water point</h3>
            <div className="vis">
              <ReasonForAbandonmentChart
                source={`${API_PATH}/mali/abandonment.json`}
              />
            </div>
            <p>
              The main reason for water point to be abandoned is the taste,
              second is the color.
            </p>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Mechanic versus manual pump</h3>
            <div className="vis">
              <MechanicVsManualPumpChart
                source={`${API_PATH}/mali/mechanic-vs-manual-pump.json`}
              />
            </div>
            <p>60% of the water points is a Pompe à Motricité Humaine.</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Water
