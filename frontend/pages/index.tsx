import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import AccessToWaterMap from '../components/root/AccessToWaterMap'

const Home: StatelessComponent = () => {
  return (
    <>
    <Row>
      <Col span={18} offset={3}>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">WaSH services in Mali</span>
          <span className="heading-primary--sub">Welcome to the Mali WaSH portal</span>
        </h1>
      </div>

      </Col>
    </Row>
      <Row>
        <Col span={16} offset={4}>
          <p className="mapTitle">Access to water in Mali</p>
          <div className="frontMap">
            <AccessToWaterMap
              source={`${API_PATH}/mali/waterpoints.geojson`}
              latitude={17.65}
              longitude={-4.15}
              zoom={4.4}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <div className="card">
            <p>
              This portal contains data collected for UNICEF, who build 110
              wells in 2017. The data was collected to indicate water quality of
              the build wells and of the water in the households.
            </p>
            <p>
              Counties: 10, Districts: 1100, Households:
            </p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Home
