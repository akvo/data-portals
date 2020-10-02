import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { Row, Col, Card, Statistic } from 'antd'
import { MAPBOX_TOKEN } from '../config'
import dynamic from 'next/dynamic'
import DistanceToWaterpointChart from '../components/water/DistanceToWaterpointChart'
import FrequencyOfPumpTypesChart from '../components/water/FrequencyOfPumpTypesChart'
import ReasonForAbandonmentChart from '../components/water/ReasonForAbandonmentChart'
import MechanicVsManualPumpChart from '../components/water/MechanicVsManualPumpChart'

const FunctionalityMap = dynamic(
  () => import('../components/water/FunctionalityMap'),
  { ssr: false }
)

type Props = {
  mapboxToken: string
}

const Water: StatelessComponent<Props> = ({ mapboxToken }) => {
  return (
    <>
      <h1>Water</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2>Functionality Map</h2>
        <Row>
          <Col span={16}>
            <div style={{ height: '50vh', width: '100%' }}>
              <FunctionalityMap accessToken={mapboxToken} />
            </div>
          </Col>
          <Col span={8} style={{ paddingLeft: '20px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit
              amet mauris commodo quis imperdiet massa. Nulla posuere
              sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
              Adipiscing elit pellentesque habitant morbi. Ultricies mi eget
              mauris pharetra et. Elit pellentesque habitant morbi tristique
              senectus. Non quam lacus suspendisse faucibus. Orci dapibus
              ultrices in iaculis nunc sed. Ac tortor dignissim convallis
              aenean. Ut sem viverra aliquet eget sit amet tellus cras. Lorem
              donec massa sapien faucibus et molestie. Sapien faucibus et
              molestie ac feugiat sed lectus vestibulum mattis. Cursus vitae
              congue mauris rhoncus aenean. Sit amet mattis vulputate enim
              nulla. Egestas quis ipsum suspendisse ultrices. Nisi quis eleifend
              quam adipiscing vitae proin. Morbi blandit cursus risus at. Fames
              ac turpis egestas maecenas pharetra convallis posuere morbi. Eu
              turpis egestas pretium aenean pharetra magna.
            </p>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={8} style={{ paddingRight: '20px' }}>
            <Card>
              <Statistic
                title="Percentage of functional pumps"
                value="81"
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: '10px' }}>
            <h2>Distance to the Water Point</h2>
            <div style={{ height: '50vh' }}>
              <DistanceToWaterpointChart />
            </div>
          </Col>
          <Col span={8} style={{ paddingLeft: '10px' }}>
            <h2>Frequency of Water Pump Types</h2>
            <div style={{ height: '50vh' }}>
              <FrequencyOfPumpTypesChart />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Row>
          <Col span={8} style={{ paddingRight: '20px' }}>
            <Card>
              <Statistic
                title="Percentage of abandoned wells"
                value="6"
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: '10px' }}>
            <h2>Reason for abandonment of the water point</h2>
            <div style={{ height: '50vh' }}>
              <ReasonForAbandonmentChart />
            </div>
          </Col>
          <Col span={8} style={{ paddingLeft: '10px' }}>
            <h2>Mechanic versus manual pump</h2>
            <div style={{ height: '45vh' }}>
              <MechanicVsManualPumpChart />
            </div>
          </Col>
        </Row>
      </div>
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

export default Water
