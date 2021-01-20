import { StatelessComponent } from 'react'
import { Row } from 'antd'
import SanitationMap from '../components/sanitation-map'

const Sanitation: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <SanitationMap />
      </Row>
    </>
  )
}

export default Sanitation
