import { StatelessComponent } from 'react'
import { Row } from 'antd'
import HygieneMap from '../components/hygiene-map'

const Hygiene: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <HygieneMap />
      </Row>
    </>
  )
}

export default Hygiene
