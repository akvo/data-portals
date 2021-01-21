import { StatelessComponent } from 'react'
import { Spin } from 'antd'
import { ResponsiveBar } from '@nivo/bar'
import useSWR from 'swr'
import { DATA_ENDPOINT } from '../../config'
import fetcher from '../../libs/fetcher'

const dataSource = `${DATA_ENDPOINT}/shared-facility-summary.json`

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
      indexBy="facility"
      keys={['No', 'Yes']}
      groupMode="grouped"
      layout="vertical"
      padding={0.3}
      margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
      colors={['#cb6d67', '#67c5cb']}
      legends={[
        {
          dataFrom: 'keys',
          direction: 'column',
          anchor: 'top-left',
          translateX: 10,
          translateY: 10,
          itemWidth: 125,
          itemHeight: 20,
        },
      ]}
    />
  )
}

export default Chart
