import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { DATA_ENDPOINT } from '../config'
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
      popService: document.getElementById('popService'),
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
          <li className={currentAnchor === 'popService' ? 'current' : ''}>
            <a href="#popService">Population</a>
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
      <Row className="dataLight fullHeight" id="popService">
        <Col span={12}>
          <HighestPercentageOfPopulationServedChart />
        </Col>
        <Col span={12}>
          <HighestAdditionalPeopleServedChart />
        </Col>
      </Row>
      <Row className="dataDark fullHeight" id="pumpType">
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">81%</div>
            <div className="statistic-desc">
              des points d'eau est fonctionnel
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Fréquence des types de pompe à eau</h3>
            <div className="vis">
              <FrequencyOfPumpTypesChart
                source={`${DATA_ENDPOINT}/mali/pump-type.json`}
              />
            </div>
            <p>
              Le <em> forage équipé de PMH </em> est le point d'eau le plus
              fréquent dont 35% est fonctionnel. Le deuxième plus fréquent sont
              les <em> puits modernes </em>, dont 38% sont fonctionnels.
            </p>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Distance au point d'eau</h3>
            <div className="vis">
              <DistanceToWaterpointChart
                source={`${DATA_ENDPOINT}/mali/distance.json`}
              />
            </div>
            <p>
              Le plus grand nombre de points d'eau fonctionnels est inférieur à
              200 mètres du ménage: 28%. 25% des points d'eau sont à moins d'un
              kilomètre.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="dataLight fullHeight" id="pumpStatus">
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">6%</div>
            <div className="statistic-desc">
              des points d'eau sont abandonnés
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Raison de l'abandon du point d'eau</h3>
            <div className="vis">
              <ReasonForAbandonmentChart
                source={`${DATA_ENDPOINT}/mali/abandonment.json`}
              />
            </div>
            <p>
              La principale raison de l'abandon du point d'eau est le goût, la
              deuxième est la couleur.
            </p>
          </div>
        </Col>
        <Col span={10}>
          <div className="card">
            <h3>Pompe mécanique versus pompe manuelle</h3>
            <div className="vis">
              <MechanicVsManualPumpChart
                source={`${DATA_ENDPOINT}/mali/mechanic-vs-manual-pump.json`}
              />
            </div>
            <p>60% des points d'eau sont à pompe à Motricité Humaine.</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Water
