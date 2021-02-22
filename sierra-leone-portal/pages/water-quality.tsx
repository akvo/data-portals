import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import WaterQualityMap from '../components/water-quality-map'
import WaterQualitySummary from '../components/water-quality-summary-table'
import useScrollspy from '../libs/use-scrollspy'

const WaterQuality: StatelessComponent = () => {
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
          <li className={isCurrent('table01') ? 'current' : ''}>
            <a href="#table01">table 01</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01" ref={register}>
        <WaterQualityMap />
      </Row>
      <Row className="dataSample" id="table01" ref={register}>
        <Col span={14} offset={5}>
          <WaterQualitySummary />
        </Col>
      </Row>
    </>
  )
}

export default WaterQuality
