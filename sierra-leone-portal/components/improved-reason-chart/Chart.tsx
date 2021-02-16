import { StatelessComponent } from 'react'
import { Spin } from 'antd'
import { ResponsiveBar } from '@nivo/bar'
import useSWR from 'swr'
import { DATA_ENDPOINT } from '../../config'
import fetcher from '../../libs/fetcher'

const dataSource = `${DATA_ENDPOINT}/improved-reason-summary.json`

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
      keys={[
        'pit latrine with concrete slab',
        'pit latrine with other type of slab',
        'ventilated improved pit latrine (vip)',
        'composting toilet',
        'flush/pour flush',
      ]}
      groupMode="grouped"
      layout="vertical"
      padding={0.3}
      margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
      colors={{ scheme: 'paired' }}
      legends={[
        {
          dataFrom: 'keys',
          direction: 'column',
          anchor: 'top-right',
          translateX: 10,
          translateY: 10,
          itemWidth: 210,
          itemHeight: 20,
        },
      ]}
    />
  )
}

export default Chart
