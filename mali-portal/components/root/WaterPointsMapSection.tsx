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
Cette carte montre tous les points d'eau ruraux relevés par le
             inventaire combiné à leur fonctionnalité.          </h4>
          <ul>
            <li>
<span> Fonctionnel </span> signifie que le puits était fonctionnel au
               moment de l'enquête. (Veuillez consulter l'onglet Eau pour plus d'informations
               sur la saisonnalité)
            </li>
            <li>
              <span> En panne </span> signifie que le puits n’était pas utilisable au moment de la
               enquête, car une partie du puits était cassée.
            </li>
            <li>
              <span> Non utilisé </span> signifie que le puits n'est pas utilisé pour d'autres
               raisons, la plupart étant que le puits est sec ou qu'il y a un
               point d'eau fonctionnel situé plus près des riverains.            
            </li>
          </ul>
          <div className="filters">
            <div>
              <strong>Filtrer par</strong>
            </div>
            <div>
              <label>fonctionnalité</label>
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

export default WaterPointsMapSection
