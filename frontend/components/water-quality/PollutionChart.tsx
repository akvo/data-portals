import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Spin } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

type Props = {
  source: string
}

const PollutionChart: StatelessComponent<Props> = ({ source }) => {
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
      keys={['Percentage']}
      groupMode="grouped"
      layout="horizontal"
      margin={{ top: 0, right: 20, bottom: 40, left: 170 }}
      padding={0.3}
      minValue={0}
      maxValue={100}
      labelSkipWidth={5}
      labelSkipHeight={2}
      labelTextColor="#f2f2f2"
    />
  )
}

export default PollutionChart
