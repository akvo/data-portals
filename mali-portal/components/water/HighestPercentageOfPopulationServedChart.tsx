import { StatelessComponent } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Spin } from 'antd'
import { PUBLIC_API_URL } from '../../config'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

const DATA_SOURCE = `${PUBLIC_API_URL}/mali/possible-progress.json`

const HighestPercentageOfPopulationServedChart: StatelessComponent = () => {
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
      <h3>
        Top des 5 districts avec le pourcentage le plus élevé de la population
        en plus desservi tous les points d'eau sont rendus opérationnels
      </h3>
      <div className="vis">
        <ResponsiveBar
          data={data}
          indexBy="Cercle"
          keys={['possible_progress']}
          layout="vertical"
          margin={{ top: 10, right: 10, bottom: 40, left: 150 }}
          padding={0.3}
          colors={['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']}
          label={(d) => `${d.value}%`}
          labelSkipWidth={5}
          labelSkipHeight={2}
          labelTextColor="#f2f2f2"
          enableGridX={true}
          maxValue={50}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemWidth: 125,
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

export default HighestPercentageOfPopulationServedChart
