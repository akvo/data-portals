import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import AccessToWaterMap from '../components/root/AccessToWaterMap'

const Home: StatelessComponent = () => {
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li>
            <a href="#map03">map 03</a>
          </li>
          <li>
            <a href="#welcome">Welcome</a>
          </li>
          <li>
            <a href="#dataTable">Data table</a>
          </li>
          <li>
            <a href="#map03" className="backUp">Back up</a>
          </li>
        </ul>
      </nav>
      <Row className="map fullHeight" id="map03">
        <Col span={20}>
          <div className="map--front">
            <AccessToWaterMap
              source={`${API_PATH}/mali/waterpoints.geojson`}
              regions={`${API_PATH}/mali/region-names.json`}
              latitude={17.65}
              longitude={-4.15}
              zoom={4.4}
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="map--info">
            <span>
              This map shows all the rural water points as surveyed by the
              inventory combined with their functionality.
            </span>
            <ul>
              <li>
                <span>Functional</span> means the well was functional at the
                moment of the survey.(Please see the Water tab for information
                about seasonality)
              </li>
              <li>
                <span>Broken</span> means the well was not usable at time of the
                survey, because a part of the well was broken.
              </li>
              <li>
                <span>Not used</span> means the well is not used for other
                reasons, most of the being that the well is dry or there is a
                functional water point located nearer to the local residents.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="welcome dataLight"  id="welcome">
        <Col span={5} offset={6}>
          <div className="welcome__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">
                Welcome to the <span>Mali</span> WaSH services portal
              </span>
            </h1>
          </div>
        </Col>
        <Col span={6} offset={1} className="infoContainer">
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
        <Col span={6} offset={2}>
          <h2>Sample characteristics</h2>
          <p className="paragraph">
            The 2016 - 2018 Mali WaSH inventory was a census measurement
            covering all of Mali’s rural water points. Piped water systems were
            left out of the data collection. This should be kept in mind when
            looking at larger cities. Below is an overview of the number of
            operators are interviewed and the number of wells from which
            information was collected.
          </p>
        </Col>
        <Col span={12} offset={2}>
          <table className="sampleTable">
            <thead>
              <tr>
                <th>District</th>
                <th>Number of operators (/exploitants)</th>
                <th>Number of wells (/puits)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bamako</td>
                <td>620</td>
                <td>461</td>
              </tr>
              <tr>
                <td>Gao</td>
                <td>1128</td>
                <td>2437</td>
              </tr>
              <tr>
                <td>Kayes</td>
                <td>894</td>
                <td>7252</td>
              </tr>
              <tr>
                <td>Kidal</td>
                <td>55</td>
                <td>491</td>
              </tr>
              <tr>
                <td>Koulikoro</td>
                <td>3172</td>
                <td>8275</td>
              </tr>
              <tr>
                <td>Mopti</td>
                <td>975</td>
                <td>6583</td>
              </tr>
              <tr>
                <td>Segou</td>
                <td>2793</td>
                <td>7563</td>
              </tr>
              <tr>
                <td>Sikasso</td>
                <td>2532</td>
                <td>6274</td>
              </tr>
              <tr>
                <td>Tombouctou</td>
                <td>500</td>
                <td>3503</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  )
}

export default Home
