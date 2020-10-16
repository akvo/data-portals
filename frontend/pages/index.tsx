import { StatelessComponent } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'

const FrontMap = dynamic(() => import('../components/root/FrontMap'), {
  ssr: false,
})

const Home: StatelessComponent = () => {
  return (
    <>
      <h1>WaSH services in Mali</h1>
      <p>Welcome to the Mali WaSH portal ..</p>
      <h2>Access to water</h2>
      <Row>
        <Col span={17} style={{ paddingRight: '1em' }}>
          <div style={{ height: '500px', width: '100%' }}>
            <FrontMap source={`${API_PATH}/mali/waterpoints.geojson`} />
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
