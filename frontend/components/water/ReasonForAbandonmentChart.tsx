import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Spin } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

type Props = {
  source: string
}

const ReasonForAbandonmentChart: StatelessComponent<Props> = ({ source }) => {
  const { data, error } = useSWR(source, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className="swr-loader">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <ResponsiveBar
      data={data}
      indexBy="answer"
      keys={['frequency']}
      layout="horizontal"
      margin={{ top: 0, right: 0, bottom: 40, left: 165 }}
      padding={0.3}
      labelSkipWidth={5}
      labelSkipHeight={2}
      labelTextColor="#f2f2f2"
      axisBottom={{ tickRotation: -20 }}
    />
  )
}

export default ReasonForAbandonmentChart
