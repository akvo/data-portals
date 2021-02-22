import { FunctionComponent } from 'react'
import { Row } from 'antd'
import WaterAccessMap from '../components/water-access-map'
import ReportedWaterSourcesChart from '../components/reported-water-sources-chart'
import WaterpointDistancesChart from '../components/waterpoint-distances-chart'
import useScrollspy from '../libs/use-scrollspy'

const WaterAccess: FunctionComponent = () => {
  const { register, isCurrent } = useScrollspy({
    defaultSection: 'map01',
    offset: -50,
  })
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={isCurrent('map01') ? 'current' : ''}>
            <a href="#map01">map 01</a>
          </li>
          <li className={isCurrent('chart01') ? 'current' : ''}>
            <a href="#chart01">chart 01</a>
          </li>
          <li className={isCurrent('chart02') ? 'current' : ''}>
            <a href="#chart02">chart 02</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01" ref={register}>
        <WaterAccessMap />
      </Row>
      <Row className="dataLight fullHeight" id="chart01" ref={register}>
        <ReportedWaterSourcesChart />
      </Row>
      <Row className="dataDark fullHeight" id="chart02" ref={register}>
        <WaterpointDistancesChart />
      </Row>
    </>
  )
}

export default WaterAccess
