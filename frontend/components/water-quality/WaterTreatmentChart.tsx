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
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
      startAngle={-180}
      innerRadius={0.45}
      colors={['#346888', '#9dc6e0']}
      enableRadialLabels={false}
      sliceLabel={function (e) {
        return e.id + ' (' + e.value + ')'
      }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#f2f2f2"
      animate={true}
    />
  )
}

export default WaterTreatmentChart
