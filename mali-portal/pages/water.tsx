import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { DATA_ENDPOINT } from '../config'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'
import FunctionalWaterPointsPerCercleSection from '../components/water/FunctionalWaterPointsPerCercleSection'
import AccessToModernWaterPointSection from '../components/water/AccessToModernWaterPointSection'
import AccessIfBrokerWaterPointsAreRepairedSection from '../components/water/AccessIfBrokenWaterPointsAreRepairedSection'
import HighestPercentageOfPopulationServedChart from '../components/water/HighestPercentageOfPopulationServedChart'
import HighestAdditionalPeopleServedChart from '../components/water/HighestAdditionalPeopleServedChart'
import useScrollspy from '../libs/use-scrollspy'

const Water: StatelessComponent = () => {
  const { register, isCurrent } = useScrollspy({ defaultSection: 'map01' })
  return (
    <>
      <div className="sideTrigger">Page Navigation</div>
      <nav className="sideNav">
        <ul>
          <li className={isCurrent('map01') ? 'current' : ''}>
            <a href="#map01">map 01</a>
          </li>
          <li className={isCurrent('map02') ? 'current' : ''}>
            <a href="#map02">map 02</a>
          </li>
          <li className={isCurrent('map04') ? 'current' : ''}>
            <a href="#map04">map 04</a>
          </li>
          <li className={isCurrent('popService') ? 'current' : ''}>
            <a href="#popService">Population</a>
          </li>
          <li className={isCurrent('pumpType') ? 'current' : ''}>
            <a href="#pumpType">Pump type</a>
          </li>
          <li className={isCurrent('pumpStatus') ? 'current' : ''}>
            <a href="#pumpStatus">Pump type</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight top" id="map01" ref={register}>
        <FunctionalWaterPointsPerCercleSection />
      </Row>
      <Row className="map fullHeight" id="map02" ref={register}>
        <AccessToModernWaterPointSection />
      </Row>
      <Row className="map fullHeight" id="map04" ref={register}>
        <AccessIfBrokerWaterPointsAreRepairedSection />
      </Row>
      <Row className="dataLight fullHeight" id="popService" ref={register}>
        <Col span={11}>
          <HighestPercentageOfPopulationServedChart />
        </Col>
        <Col span={11}   offset={1}>
          <HighestAdditionalPeopleServedChart />
        </Col>
      </Row>
      <Row className="dataDark fullHeight" id="pumpType" ref={register}>
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">81%</div>
            <div className="statistic-desc">
              des points d'eau est fonctionnel
            </div>
          </div>
        </Col>
        <Col span={9}  offset={1}>
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
        <Col span={9}  offset={1}>
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
      <Row className="dataLight fullHeight" id="pumpStatus" ref={register}>
        <Col span={4}>
          <div className="statistic">
            <div className="statistic-number">6%</div>
            <div className="statistic-desc">
              des points d'eau sont abandonnés
            </div>
          </div>
        </Col>
        <Col span={9}  offset={1}>
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
        <Col span={9}  offset={1}>
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
