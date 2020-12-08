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
          <h4>Percentage Of Functional Water Points Per Cercle</h4>
          <p>
            This map shows the percentage of the water points in Mali that was
            marked functional compared to the total number of water points. The
            cercles Tessalit, Bourem, Abeibara and Menaka score under 50%
            functional.
          </p>
        </div>
      </Col>
    </>
  )
}

export default FunctionalWaterPointsPerCercleSection
