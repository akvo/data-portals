import { StatelessComponent } from 'react'
import { Spin } from 'antd'
import useSWR from 'swr'
import { DATA_ENDPOINT } from '../../config'
import fetcher from '../../libs/fetcher'

const dataSource = `${DATA_ENDPOINT}/water-quality-summary.json`

const WaterQualitySummary: StatelessComponent = () => {
  const { data, error } = useSWR(dataSource, fetcher)
  if (error) {
    return <div style={{ color: 'red' }}>Failed to load data!</div>
  }
  if (!data) {
    return (
      <div className="swr-loader" style={{ width: '100%', height: '100%' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }
  const columnMap: { [key: string]: string } = {
    conf_inter_ecoli: 'Upper 95% Confidence Interval',
    mpn_100ml: 'MPN per 100ml',
  }
  const columns = Object.keys(data)
  const rows = Object.keys(data[columns[0]])

  return (
    <table className="sampleTable">
      <thead>
        <tr>
          <th>&nbsp;</th>
          {columns.map((column) => (
            <th key={column}>{columnMap[column]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            <th>{row}</th>
            {columns.map((column) => (
              <td key={`${row}:${column}`} style={{ textAlign: 'right' }}>
                {data[column][row].toFixed(1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WaterQualitySummary
