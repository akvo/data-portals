import { StatelessComponent } from 'react'
import { Row } from 'antd'
import SanitationMap from '../components/sanitation-map'
import UnimprovedReasonChart from '../components/unimproved-reason-chart'
import ImprovedReasonChart from '../components/improved-reason-chart'
import SharedFacilityChart from '../components/shared-facility-chart'
import useScrollspy from '../libs/use-scrollspy'

const Sanitation: StatelessComponent = () => {
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
          <li className={isCurrent('chart03') ? 'current' : ''}>
            <a href="#chart03">chart 03</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01" ref={register}>
        <SanitationMap />
      </Row>
      <Row className="dataLight fullHeight" id="chart01" ref={register}>
        <UnimprovedReasonChart />
      </Row>
      <Row className="dataDark fullHeight" id="chart02" ref={register}>
        <ImprovedReasonChart />
      </Row>
      <Row className="dataLight fullHeight" id="chart03" ref={register}>
        <SharedFacilityChart />
      </Row>
    </>
  )
}

export default Sanitation
