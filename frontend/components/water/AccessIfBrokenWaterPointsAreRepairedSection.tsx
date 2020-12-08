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
            Population Able To Access Modern Water Points When Broken Water
            Points Are Repaired
          </h4>
          <p>
            This map shows the percentage of the population that would be served
            if all water points were made operable. This is determined by the
            number of people that the currently inoperable water points could
            serve based on the type of water point.
          </p>
        </div>
      </Col>
    </>
  )
}

export default AccessIfBrokerWaterPointsAreRepairedSection
