import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'
import { getBestAnchorGivenScrollLocation } from '../libs/scroll'
import FunctionalWaterPointsPerCercleSection from '../components/water/FunctionalWaterPointsPerCercleSection'
import AccessToModernWaterPointSection from '../components/water/AccessToModernWaterPointSection'
import AccessIfBrokerWaterPointsAreRepairedSection from '../components/water/AccessIfBrokenWaterPointsAreRepairedSection'
import HighestPercentageOfPopulationServedChart from '../components/water/HighestPercentageOfPopulationServedChart'
import HighestAdditionalPeopleServedChart from '../components/water/HighestAdditionalPeopleServedChart'

const Water: StatelessComponent = () => {
  const sections = useRef<{ [key: string]: any }>()
  const [currentAnchor, setCurrentAnchor] = useState('')
  const handleScroll = () => {
    let anchor: any = getBestAnchorGivenScrollLocation(sections.current, 0)
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
      pumpStatus: document.getElementById('pumpStatus'),
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
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01">
        <FunctionalWaterPointsPerCercleSection />
      </Row>
      <Row className="map fullHeight" id="map02">
        <AccessToModernWaterPointSection />
      </Row>
      <Row className="map fullHeight" id="map04">
        <AccessIfBrokerWaterPointsAreRepairedSection />
      </Row>
      <Row className="dataLight fullHeight">
        <Col span={12}>
          <HighestPercentageOfPopulationServedChart />
        </Col>
        <Col span={12}>
          <HighestAdditionalPeopleServedChart />
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
