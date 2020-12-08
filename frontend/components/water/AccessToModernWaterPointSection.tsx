import { StatelessComponent } from 'react'
import { Col } from 'antd'
import WaterMap from './WaterMap'

const AccessToModernWaterPointSection: StatelessComponent = () => {
  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <WaterMap
            title="Percentage of the population with access to water"
            attribute="taux_acces"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <h4>
            Percentage Of The Population That Can Access A Modern Waterpoint
          </h4>
          <p>
            This map shows the percentage of the population that has access to a
            water point. This is determined by the number of functional water
            points and the number of people a water point can serve (EPEM)
            compared to the total population of the cercle.
          </p>
        </div>
      </Col>
    </>
  )
}

export default AccessToModernWaterPointSection
