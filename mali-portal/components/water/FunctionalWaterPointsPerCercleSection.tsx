import { StatelessComponent } from 'react'
import { Col } from 'antd'
import WaterMap from './WaterMap'

const FunctionalWaterPointsPerCercleSection: StatelessComponent = () => {
  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <WaterMap
            title="Percentage of functional waterpoints"
            attribute="taux_fonct"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <h4>Pourcentage de points d'eau fonctionnels par cercle</h4>
          <p>
          Cette carte montre le pourcentage des points d'eau au Mali qui
             marqué fonctionnel par rapport au nombre total de points d'eau. le
             cercles Tessalit, Bourem, Abeibara et Menaka ont un score inférieur à 50%
             fonctionnel.
          </p>
        </div>
      </Col>
    </>
  )
}

export default FunctionalWaterPointsPerCercleSection
