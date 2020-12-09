import { StatelessComponent, useState } from 'react'
import { Col } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { API_PATH } from '../../config'
import WaterSafetyMap from './WaterSafetyMap'

const REGIONS_DATA = `${API_PATH}/mali/region-names.json`

const safetyConfig = [
  { color: '#de425b', label: 'Non' },
  { color: '#346888', label: 'Oui' },
]

const WaterSafetySection: StatelessComponent = () => {
  const [safetyFilter, setSafetyFilter] = useState<string>()
  const [regionFilter, setRegionFilter] = useState<string>()
  const { data: regionNames } = useSWR(REGIONS_DATA, fetcher)

  return (
    <>
      <Col span={20}>
        <div className="map--front">
          <WaterSafetyMap
            safetyConfig={safetyConfig}
            safetyFilter={safetyFilter}
            regionFilter={regionFilter}
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="map--info">
          <span>
            The safety of the water points has been assessed by asking the
            following questions. If one of the elements is absent or not
            functional the water point is classified as unsafe.
          </span>
          <ul>
            <li>Does the water point have a slab?</li>
            <li>Does the water point have a fence?</li>
            <li>Does the water point have an evacuation channel?</li>
            <li>Does the water point have a sump?</li>
            <li>Does the water point have a laundry?</li>
            <li>Does the water point have a trough?</li>
          </ul>
          <div>
            <div>
              <strong>Filter by</strong>
            </div>
            <div>
              <label>safety</label>
              <br />
              <select onChange={(e) => setSafetyFilter(e.currentTarget.value)}>
                <option></option>
                {safetyConfig.map((it) => (
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

export default WaterSafetySection
