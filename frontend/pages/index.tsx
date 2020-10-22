import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import AccessToWaterMap from '../components/root/AccessToWaterMap'

const Home: StatelessComponent = () => {
  return (
    <>
      <h1>WaSH services in Mali</h1>
      <p>Welcome to the Mali WaSH portal ..</p>
      <h2>Access to water</h2>
      <Row>
        <Col span={17} style={{ paddingRight: '1em' }}>
          <div style={{ height: '500px', width: '100%' }}>
            <AccessToWaterMap
              source={`${API_PATH}/mali/waterpoints.geojson`}
              latitude={17.65}
              longitude={-4.15}
              zoom={4.4}
            />
          </div>
        </Col>
        <Col span={7} style={{ paddingLeft: '1em' }}>
          <div
            className="card"
            style={{ backgroundColor: '#dae3f3', padding: '1em' }}
          >
            <h3>Sample Characteristics</h3>
            <p>
              This portal contains data collected for UNICEF, who build 110
              wells in 2017. The data was collected to indicate water quality of
              the build wells and of the water in the households.
            </p>
            <p>
              Counties: 10
              <br />
              Districts: 1100
              <br /> Households:
            </p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Home
