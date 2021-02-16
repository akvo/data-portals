import { StatelessComponent } from 'react'
import { Row } from 'antd'
import WaterAccessMap from '../components/water-access-map'
import ReportedWaterSourcesChart from '../components/reported-water-sources-chart'

const WaterAccess: StatelessComponent = () => {
  return (
    <>
      <Row className="map fullHeight" id="map01">
        <WaterAccessMap />
      </Row>
      <Row className="dataLight fullHeight">
        <ReportedWaterSourcesChart />
      </Row>
    </>
  )
}

export default WaterAccess
