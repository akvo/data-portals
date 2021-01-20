import { StatelessComponent } from 'react'
import { Col } from 'antd'
import Info from './Info'
import Map from './Map'

const Component: StatelessComponent = () => {
  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <Map />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <Info />
        </div>
      </Col>
    </>
  )
}

export default Component
