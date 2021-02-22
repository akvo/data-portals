import { StatelessComponent } from 'react'
import { Row } from 'antd'
import HygieneMap from '../components/hygiene-map'
import useScrollspy from '../libs/use-scrollspy'

const Hygiene: StatelessComponent = () => {
  const { register, isCurrent } = useScrollspy({ defaultSection: 'map01' })
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={isCurrent('map01') ? 'current' : ''}>
            <a href="#map01">map 01</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map01" ref={register}>
        <HygieneMap />
      </Row>
    </>
  )
}

export default Hygiene
