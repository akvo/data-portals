import { StatelessComponent, useState } from 'react'
import { Col } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { API_PATH } from '../../config'
import WaterPointsMap from './WaterPointsMap'

const REGIONS_DATA = `${API_PATH}/mali/region-names.json`

const functionalityConfig = [
  { color: '#003f5c', label: 'fonctionnel' },
  { color: '#bc5090', label: 'en panne' },
  { color: '#ffa600', label: 'non utilisé' },
]

const WaterPointsMapSection: StatelessComponent = () => {
  const [functionalFilter, setFunctionalFilter] = useState<string>()
  const [regionFilter, setRegionFilter] = useState<string>()
  const { data: regionNames } = useSWR(REGIONS_DATA, fetcher)
  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <WaterPointsMap
            functionalityConfig={functionalityConfig}
            functionalFilter={functionalFilter}
            regionFilter={regionFilter}
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <h4>
            This map shows all the rural water points as surveyed by the
            inventory combined with their functionality.
          </h4>
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
          <div>
            <div>
              <strong>Filter by</strong>
            </div>
            <div>
              <label>safety</label>
              <br />
              <select
                onChange={(e) => setFunctionalFilter(e.currentTarget.value)}
              >
                <option></option>
                {functionalityConfig.map((it) => (
                  <option value={it.label} key={it.label}>
                    {it.label}
                  </option>
                ))}
              </select>
            </div>
            {regionNames && (
              <div>
                <label>region</label>
                <br />
                <select
                  onChange={(e) => setRegionFilter(e.currentTarget.value)}
                >
                  <option></option>
                  {regionNames.map((name: string) => (
                    <option value={name} key={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </Col>
    </>
  )
}

export default WaterPointsMapSection
