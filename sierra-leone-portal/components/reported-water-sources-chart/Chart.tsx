import { StatelessComponent } from 'react'
import { Spin } from 'antd'
import { ResponsiveBar, BarExtendedDatum } from '@nivo/bar'
import { categoricalColorSchemes } from '@nivo/colors'
import useSWR from 'swr'
import { DATA_ENDPOINT } from '../../config'
import fetcher from '../../libs/fetcher'

const dataSource = `${DATA_ENDPOINT}/reported-water-sources-summary.json`
const { paired } = categoricalColorSchemes

const Chart: StatelessComponent = () => {
  const { data, error } = useSWR(dataSource, fetcher)
  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    return (
      <div className="swr-loader">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }
  return (
    <ResponsiveBar
      data={data}
      indexBy="source"
      keys={['value']}
      groupMode="grouped"
      layout="vertical"
      padding={0.3}
      margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
      colors={(datum: BarExtendedDatum) => paired[datum.index]}
    />
  )
}

export default Chart
