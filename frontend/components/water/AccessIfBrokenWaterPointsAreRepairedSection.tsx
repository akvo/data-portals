import { StatelessComponent } from 'react'
import { Col } from 'antd'
import WaterMap from './WaterMap'

const AccessIfBrokerWaterPointsAreRepairedSection: StatelessComponent = () => {
  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <WaterMap
            title="Population with additional access if broken WP are repaired"
            attribute="taux_equip"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <h4>
          Population capable d'accéder aux points d'eau modernes en cas de rupture d'eau
             Les points sont réparés          </h4>
          <p>
          Cette carte montre le pourcentage de la population qui serait desservie
             si tous les points d'eau étaient rendus opérationnels. Ceci est déterminé par le
             nombre de personnes que les points d'eau actuellement inutilisables pourraient
             servir en fonction du type de point d'eau.
          </p>
        </div>
      </Col>
    </>
  )
}

export default AccessIfBrokerWaterPointsAreRepairedSection
