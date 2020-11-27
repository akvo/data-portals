import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'
import FunctionalityMap from '../components/water/FunctionalityMap'
import SeasonalityMap from '../components/water/SeasonalityMap'
import { getBestAnchorGivenScrollLocation } from '../libs/scroll'

const Water: StatelessComponent = () => {
  const sections = useRef<Object>()
  const [currentAnchor, setCurrentAnchor] = useState('')
  const handleScroll = () => {
    let anchor:any = getBestAnchorGivenScrollLocation(sections.current, 0)
    if (anchor === undefined) anchor = 'map01'
    if (anchor !== currentAnchor) {
      setCurrentAnchor(anchor)
    }
  }
  useEffect(() => {
    sections.current = {
      map01: document.getElementById('map01'),
      map02: document.getElementById('map02'),
      map04: document.getElementById('map04'),
      pumpType: document.getElementById('pumpType'),
      pumpStatus: document.getElementById('pumpStatus')
    }
    document.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={currentAnchor === 'map01' ? 'current' : ''}>
            <a href="#map01">map 01</a>
          </li>
          <li className={currentAnchor === 'map02' ? 'current' : ''}>
            <a href="#map02">map 02</a>
          </li>
          <li className={currentAnchor === 'map04' ? 'current' : ''}>
            <a href="#map04">map 04</a>
          </li>
          <li className={currentAnchor === 'pumpType' ? 'current' : ''}>
            <a href="#pumpType">Pump type</a>
          </li>
          <li className={currentAnchor === 'pumpStatus' ? 'current' : ''}>
            <a href="#pumpStatus">Pump type</a>
          </li>
          <li>
            <a href="#map01" className="backUp">Back up</a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01">
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
            <h4>Percentage Of Functional Water Points Per Cercle</h4>
            <p>
              This map shows the percentage of the water points in Mali that was marked functional compared to the total number of water points. The cercles Tessalit, Bourem, Abeibara and Menaka score under 50% functional. 
            </p>
          </div>
        </Col>
      </Row>
      <Row className="map fullHeight" id="map02">
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
            <h4>Percentage Of The Population That Can Access A Modern Waterpoint</h4>
            <p>
              {' '}
              This map shows the percentage of the population that has access to a water point. This is determined by the number of functional water points and the number of people a water point can serve (EPEM) compared to the total population of the cercle.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="map fullHeight" id="map04">
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
            <h4>Population Able To Access Modern Water Points When Broken Water Points Are Repaired</h4>
            <p>
              {' '}
              This map shows the percentage of the population that would be served if all water points were made operable. This is determined by the number of people that the currently inoperable water points could serve based on the type of water point. 
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataLight fullHeight" id="pumpType">
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
      <Row className="dataDark fullHeight" id="pumpStatus">
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
