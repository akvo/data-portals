import { StatelessComponent } from 'react'
import { Row } from 'antd'
import SanitationMap from '../components/sanitation-map'
import UnimprovedReasonChart from '../components/unimproved-reason-chart'
import SharedFacilityChart from '../components/shared-facility-chart'

const Sanitation: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <SanitationMap />
      </Row>
      <Row className="dataLight fullHeight">
        <UnimprovedReasonChart />
      </Row>
      <Row className="dataDark fullHeight">
        <SharedFacilityChart />
      </Row>
    </>
  )
}

export default Sanitation
