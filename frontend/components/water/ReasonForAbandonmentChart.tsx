import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import data from './data/abandonment.json'

const ReasonForAbandonmentChart: StatelessComponent = () => {
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
