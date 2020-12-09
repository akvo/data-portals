import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { getBestAnchorGivenScrollLocation } from '../libs/scroll'
import WaterPointsMapSection from '../components/root/WaterPointsMapSection'

const Home: StatelessComponent = () => {
  const sections = useRef<{ [key: string]: any }>()
  const [currentAnchor, setCurrentAnchor] = useState('')
  const handleScroll = () => {
    let anchor: any = getBestAnchorGivenScrollLocation(sections.current, 0)
    if (anchor === undefined) anchor = 'map03'
    if (anchor !== currentAnchor) {
      setCurrentAnchor(anchor)
    }
  }
  useEffect(() => {
    sections.current = {
      map03: document.getElementById('map03'),
      welcome: document.getElementById('welcome'),
      dataTable: document.getElementById('dataTable'),
    }
    document.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={currentAnchor === 'map03' ? 'current' : ''}>
            <a href="#map03">map 03</a>
          </li>
          <li className={currentAnchor === 'welcome' ? 'current' : ''}>
            <a href="#welcome">Welcome</a>
          </li>
          <li className={currentAnchor === 'dataTable' ? 'current' : ''}>
            <a href="#dataTable">Data table</a>
          </li>
          <li>
            <a href="#map03" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map03">
        <WaterPointsMapSection />
      </Row>
      <Row className="welcome dataLight" id="welcome">
        <Col span={6} offset={5}>
          <div className="welcome__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">
                Welcome to the <span>Mali</span> WaSH services portal
              </span>
            </h1>
          </div>
        </Col>
        <Col span={7} offset={1} className="infoContainer">
          <p className="paragraph">
            Welcome to the Mali rural Water, Sanitation and Hygiene (WaSH) data
            portal. This portal provides information on rural water points in
            Mali. The data was collected during their national inventory from
            2016 to 2018.
          </p>
          <p className="paragraph">
            This portal is set up to provide information on the most recent
            state of WaSH services in the different regions of Mali. The
            national inventory was focussed on Water and Water Quality, so there
            is no data available on Sanitation and Hygiene. The Water and Water
            quality information can be found in the respective tabs. If you are
            interested in the raw data file, please take a look at the Data tab
            and for some more information about this portal, and other WaSH
            country portals, please take a look at the Guide tab.
          </p>
        </Col>
      </Row>
      <Row className="dataSample" id="dataTable">
        <Col span={5} offset={2} className="decoRect">
          <div>
            <h2>Sample characteristics</h2>
          </div>
          <p className="paragraph">
            The 2016 - 2018 Mali WaSH inventory was a census measurement
            covering all of Mali’s rural water points. Piped water systems were
            left out of the data collection. This should be kept in mind when
            looking at larger cities. The table on the right is an overview of
            the number of operators interviewed and the number of wells from
            which information was collected.
          </p>
        </Col>
        <Col span={14} offset={1}>
          <table className="sampleTable">
            <thead>
              <tr>
                <th>District</th>
                <th>Year of collection</th>
                <th>Number of operators</th>
                <th>Number of wells</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bamako</td>
                <td>2018</td>
                <td>620</td>
                <td>461</td>
              </tr>
              <tr>
                <td>Gao</td>
                <td>2018</td>
                <td>1128</td>
                <td>2437</td>
              </tr>
              <tr>
                <td>Kayes</td>
                <td>2016</td>
                <td>894</td>
                <td>7252</td>
              </tr>
              <tr>
                <td>Kidal</td>
                <td>2018</td>
                <td>55</td>
                <td>491</td>
              </tr>
              <tr>
                <td>Koulikoro</td>
                <td>2018</td>
                <td>3172</td>
                <td>8275</td>
              </tr>
              <tr>
                <td>Mopti</td>
                <td>2016</td>
                <td>975</td>
                <td>6583</td>
              </tr>
              <tr>
                <td>Segou</td>
                <td>2016</td>
                <td>2793</td>
                <td>7563</td>
              </tr>
              <tr>
                <td>Sikasso</td>
                <td>2016</td>
                <td>2532</td>
                <td>6274</td>
              </tr>
              <tr>
                <td>Tombouctou</td>
                <td>2018</td>
                <td>500</td>
                <td>3503</td>
              </tr>
            </tbody>
          </table>
          <p className="infoTxt">
            <small>
              *The piped water supply of the urban areas of Mali are not
              included in this data. Especially in Bamako the number of wells
              does not give a reasonable estimation of the water supply. This
              also goes for a few of the other regions&apos; counties. These
              counties have been marked in the maps. Caution needs to be taken
              when interpreting the numbers of these specific counties.
            </small>
          </p>
        </Col>
      </Row>
    </>
  )
}

export default Home
