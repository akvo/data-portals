import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Spin } from 'antd'
import { DATA_ENDPOINT } from '../../config'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

const DATA_SOURCE = `${DATA_ENDPOINT}/mali/pump-safety.json`

const PercentageOfBrokenWaterPointsChart: StatelessComponent = () => {
  const { data, error } = useSWR(DATA_SOURCE, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className="swr-loader">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  return (
    <div className="card">
      <h3>Pourcentage des différents éléments manquants ou cassés</h3>
      <div className="vis">
        <ResponsiveBar
          data={data}
          indexBy="Part"
          keys={['Percentage']}
          layout="vertical"
          margin={{ top: 10, right: 10, bottom: 40, left: 150 }}
          padding={0.3}
          colors={['#bc5090','#58508d', '#ff6361', '#ffa600','#003f5c' ]}
          label={(d) => `${d.value}%`}
          labelSkipWidth={5}
          labelSkipHeight={2}
          labelTextColor="#f2f2f2"
          enableGridX={true}
          maxValue={100}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 0,
              symbolSize: 20,
              itemDirection: 'left-to-right',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default PercentageOfBrokenWaterPointsChart
