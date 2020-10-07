import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import { MAPBOX_TOKEN } from '../config'

const MaliAdm3Map = dynamic(() => import('../components/MaliAdm3Map'), {
  ssr: false,
})

type Props = {
  mapboxToken: string
}

const Home: StatelessComponent<Props> = ({ mapboxToken }) => {
  return (
    <>
      <h1>WaSH services in Mali</h1>
      <p>Welcome to the Mali WaSH portal ..</p>
      <h2>Access to water</h2>
      <Row>
        <Col span={17} style={{ paddingRight: '1em' }}>
          <div style={{ height: '500px', width: '100%' }}>
            <MaliAdm3Map accessToken={mapboxToken} />
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      mapboxToken: MAPBOX_TOKEN,
    },
  }
}

export default Home
