import { StatelessComponent } from 'react'
import { Col } from 'antd'
import WaterMap from './WaterMap'

const AccessToModernWaterPointSection: StatelessComponent = () => {
  return (
    <>
      <Col span={18}>
        <div className="map--front">
          <WaterMap
            title="Percentage of the population with access to water"
            attribute="taux_acces"
          />
        </div>
      </Col>
      <Col span={6}>
        <div className="map--info">
          <h4>
          Pourcentage de la population pouvant accéder à un point d'eau moderne          
          </h4>
          <p>
          Cette carte montre le pourcentage de la population ayant accès à un
             point d'eau. Ceci est déterminé par le nombre d'eau fonctionnelle
             points et le nombre de personnes qu'un point d'eau peut desservir (EPEM)
             par rapport à la population totale du cercle.          
          </p>
        </div>
      </Col>
    </>
  )
}

export default AccessToModernWaterPointSection
