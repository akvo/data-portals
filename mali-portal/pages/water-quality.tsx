import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import WaterTreatmentChart from '../components/water-quality/WaterTreatmentChart'
import Pollution from '../components/water-quality/PollutionChart'
import { getBestAnchorGivenScrollLocation } from '../libs/scroll'
import WaterSafetySection from '../components/water-quality/WaterSafetySection'
import PercentageOfBrokenWaterPointsChart from '../components/water-quality/PercentageOfBrokenWaterPointsChart'

const WaterQuality: StatelessComponent = () => {
  const sections = useRef<{ [key: string]: any }>()
  const [currentAnchor, setCurrentAnchor] = useState('')
  const handleScroll = () => {
    let anchor: any = getBestAnchorGivenScrollLocation(sections.current, 0)
    if (anchor === undefined) anchor = 'WPstatus'
    if (anchor !== currentAnchor) {
      setCurrentAnchor(anchor)
    }
  }
  useEffect(() => {
    sections.current = {
      WPstatus: document.getElementById('WPstatus'),
      fonctionalite: document.getElementById('fonctionalite'),
      pumps: document.getElementById('pumps'),
      pmh: document.getElementById('pmh'),
    }
    document.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={currentAnchor === 'WPstatus' ? 'current' : ''}>
            <a href="#WPstatus">WP status</a>
          </li>
          <li className={currentAnchor === 'fonctionalite' ? 'current' : ''}>
            <a href="#fonctionalite">Fonctionalite</a>
          </li>
          <li className={currentAnchor === 'pumps' ? 'current' : ''}>
            <a href="#pumps">Pumps</a>
          </li>
          <li className={currentAnchor === 'pmh' ? 'current' : ''}>
            <a href="#pmh">PMH</a>
          </li>
          <li>
            <a href="#WPstatus" className="backUp">
              WP status
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="WPstatus">
        <WaterSafetySection />
      </Row>
      <Row className="dataLight fullHeight" id="fonctionalite">
        <Col span={12} offset={6}>
          <PercentageOfBrokenWaterPointsChart />
        </Col>
      </Row>
      <Row className="dataDark fullHeight" id="pumps">
        <h2>Pumps</h2>
        <Col span={4} offset={4}>
          <div className="statistic">
            <div className="statistic-number">15%</div>
            <div className="statistic-desc">des sources sont traitées</div>
          </div>
        </Col>
        <Col span={11} offset={1}>
          <div className="card">
            <h3>Water treatment</h3>
            <div className="vis">
              <WaterTreatmentChart
                source={`${API_PATH}/mali/treatment-type.json`}
              />
            </div>
            <p>
            Presque toutes les pompes traitées régulièrement, soit 15%, sont
               traité avec de <em>l'eau de javel</em>.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataLight fullHeight" id="pmh">
        <h2>PMH</h2>
        <Col span={4} offset={4}>
          <div className="statistic">
            <div className="statistic-number">77.7%</div>
            <div className="statistic-desc">
            des points d'eau contiennent de la pollution
            </div>
          </div>
        </Col>
        <Col span={11} offset={1}>
          <div className="card">
            <h3>Pollution</h3>
            <div className="vis">
              <Pollution source={`${API_PATH}/mali/pollution-type.json`} />
            </div>
            <p>
              Du PMH 24% a manqué d’entretien and 13% a manqué de
              fermeture.
            </p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default WaterQuality
