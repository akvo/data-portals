import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'
import { API_PATH } from '../config'
import WaterTreatmentChart from '../components/water-quality/WaterTreatmentChart'
import Pollution from '../components/water-quality/PollutionChart'
import WaterQualityMapbox from '../components/water-quality/WaterQualityMapbox'

const WaterQuality: StatelessComponent = () => {
  return (
    <>
      <Row className="map">
        <Col span={12} offset={4}>
          <div className="map--front">
              <WaterQualityMapbox
                populationSource={`${API_PATH}/mali/population-per-region.geojson`}
                waterpointSource={`${API_PATH}/mali/waterpoints.geojson`}
                latitude={17.65}
                longitude={-4.15}
                zoom={4.4}
              />
          </div>
        </Col>
        <Col span={4}>
          <div className="map--info">
            <span>The safety of the water points has been assessed by asking the following questions. If one of the elements is absent or not functional the water point is classified as unsafe.</span>
            <ul>
              <li>Does the water point have a slab?</li>
              <li>Does the water point have a fence?</li>
              <li>Does the water point have an evacuation channel?</li>
              <li>Does the water point have a sump?</li>
              <li>Does the water point have a laundry?</li>
              <li>Does the water point have a trough?</li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="dataLight">
          <div className="centered"><h2>Pumps</h2></div>
          <Col span={4} offset={6}>
            <div className="statistic">
              <div className="statistic-number">15%</div>
              <div className="statistic-desc">
              of the sources is treated
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="card">
              <h3>Water treatment</h3>
              <div className="vis">
                <WaterTreatmentChart
                  source={`${API_PATH}/mali/treatment-type.json`}
                />
              </div>
              <p>
                Almost all the pumps that are treated regularly, which is 15%, are
                treated with <em>eau de javel</em>.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="dataDark">
        <div className="centered"><h2>PMH</h2></div>
          <Col span={4} offset={6}>
            <div className="statistic">
              <div className="statistic-number">77.7%</div>
              <div className="statistic-desc">
                of the water points contain pollution
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="card">
              <h3>Pollution</h3>
              <div className="vis">
                <Pollution source={`${API_PATH}/mali/pollution-type.json`} />
              </div>
              <p>
                Of the PMH 24% has manqué d’entretien and 13% has manqué de
                fermeture.
              </p>
            </div>
          </Col>
        </Row>
    </>
  )
}

export default WaterQuality
