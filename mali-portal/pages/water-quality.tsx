import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { DATA_ENDPOINT } from '../config'
import WaterTreatmentChart from '../components/water-quality/WaterTreatmentChart'
import Pollution from '../components/water-quality/PollutionChart'
import WaterSafetySection from '../components/water-quality/WaterSafetySection'
import PercentageOfBrokenWaterPointsChart from '../components/water-quality/PercentageOfBrokenWaterPointsChart'
import useScrollspy from '../libs/use-scrollspy'

const WaterQuality: StatelessComponent = () => {
  const { register, isCurrent } = useScrollspy({ defaultSection: 'WPstatus' })
  return (
    <>
      <div className="sideTrigger">Page Navigation</div>
      <nav className="sideNav">
        <ul>
          <li className={isCurrent('WPstatus') ? 'current' : ''}>
            <a href="#WPstatus">WP status</a>
          </li>
          <li className={isCurrent('fonctionalite') ? 'current' : ''}>
            <a href="#fonctionalite">Fonctionalite</a>
          </li>
          <li className={isCurrent('pumps') ? 'current' : ''}>
            <a href="#pumps">Pumps</a>
          </li>
          <li className={isCurrent('pmh') ? 'current' : ''}>
            <a href="#pmh">PMH</a>
          </li>
          <li>
            <a href="#WPstatus" className="backUp">
              WP status
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="WPstatus" ref={register}>
        <WaterSafetySection />
      </Row>
      <Row className="dataLight fullHeight" id="fonctionalite" ref={register}>
        <Col span={18}>
          <PercentageOfBrokenWaterPointsChart />
        </Col>
      </Row>
      <Row className="dataDark fullHeight" id="pumps" ref={register}>
        <h2>Pumps</h2>
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">15%</div>
            <div className="statistic-desc">des sources sont traitées</div>
          </div>
        </Col>
        <Col span={15} offset={1}>
          <div className="card">
            <h3>Traitement de l'eau</h3>
            <div className="vis">
              <WaterTreatmentChart
                source={`${DATA_ENDPOINT}/mali/treatment-type.json`}
              />
            </div>
            <p>
              Presque toutes les pompes traitées régulièrement, soit 15%, sont
              traité avec de <em>l'eau de javel</em>.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataLight fullHeight" id="pmh" ref={register}>
        <h2>PMH</h2>
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">77.7%</div>
            <div className="statistic-desc">
              des points d'eau contiennent de la pollution
            </div>
          </div>
        </Col>
        <Col span={15} offset={1}>
          <div className="card">
            <h3>Pollution</h3>
            <div className="vis">
              <Pollution source={`${DATA_ENDPOINT}/mali/pollution-type.json`} />
            </div>
            <p>
              Du PMH 24% a manqué d’entretien and 13% a manqué de fermeture.
            </p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default WaterQuality
