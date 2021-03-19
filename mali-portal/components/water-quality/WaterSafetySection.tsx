import { StatelessComponent, useState } from 'react'
import { Col } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { DATA_ENDPOINT } from '../../config'
import WaterSafetyMap from './WaterSafetyMap'

const REGIONS_DATA = `${DATA_ENDPOINT}/mali/region-names.json`

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
      <Col span={18}>
        <div className="map--front">
          <WaterSafetyMap
            safetyConfig={safetyConfig}
            safetyFilter={safetyFilter}
            regionFilter={regionFilter}
          />
        </div>
      </Col>
      <Col span={6}>
        <div className="map--info">
          <h4>
            La sécurité des points d'eau a été évaluée en posant les questions
            suivantes. Si l'un des éléments est absent ou non fonctionnel, le
            point d'eau est classé comme dangereux.
          </h4>
          <ul>
            <li> <p>Le point d'eau a-t-il une dalle?</p> </li>
            <li> <p>Le point d'eau a-t-il une clôture?</p> </li>
            <li> <p>Le point d'eau dispose-t-il d'un canal d'évacuation?</p> </li>
            <li> <p>Le point d'eau a-t-il un puisard?</p> </li>
            <li> <p>Y a-t-il une buanderie au point d'eau?</p> </li>
            <li> <p>Le point d'eau a-t-il un auge?</p> </li>
          </ul>
          <div className="filters">
            <div>
              <strong>Filtrer par</strong>
            </div>
            <div>
              <label>fonctionnalité</label>
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
                <label>Région</label>
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
