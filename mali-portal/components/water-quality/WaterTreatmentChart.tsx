import { StatelessComponent } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Spin } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

type Props = {
  source: string
}

const WaterTreatmentChart: StatelessComponent<Props> = ({ source }) => {
  const { data, error } = useSWR(source, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className="swr-loader">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
      startAngle={-180}
      innerRadius={0.45}
      colors={['#58508d', '#ff6361','#bc5090', '#ffa600','#003f5c' ]}
      enableRadialLabels={false}
      sliceLabel={function (e) {
        return e.id + ' (' + e.value + ')'
      }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#f2f2f2"
    />
  )
}

export default WaterTreatmentChart
