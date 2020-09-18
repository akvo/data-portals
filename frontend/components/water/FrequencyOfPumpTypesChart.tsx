import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import data from './data/pump-type.json'

const FrequencyOfPumpTypesChart: StatelessComponent = () => {
  return (
    <ResponsiveBar
      data={data}
      indexBy="water_point_type"
      keys={['fonctionnel', 'en panne', 'non utilisé', 'sec']}
      groupMode="grouped"
      layout="vertical"
      margin={{ top: 10, right: 0, bottom: 40, left: 25 }}
      padding={0.1}
      colors={['#03AD8C', '#00A2A5', '#0094BD', '#0083CC']}
      labelSkipWidth={5}
      labelSkipHeight={2}
      labelTextColor="#f2f2f2"
      axisBottom={{ tickRotation: -10 }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemWidth: 85,
          itemHeight: 15,
          itemsSpacing: 0,
          symbolSize: 15,
          itemDirection: 'left-to-right',
        },
      ]}
    />
  )
}

export default FrequencyOfPumpTypesChart
