import { StatelessComponent } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Spin } from 'antd'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'

type Props = {
  source: string
}

const MechanicVsManualPumpChart: StatelessComponent<Props> = ({ source }) => {
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
      margin={{ top: 10, right: 20, bottom: 10, left: 50 }}
      startAngle={-180}
      innerRadius={0.45}
      colors={['#bcbddc', '#756bb1']}
      enableRadialLabels={false}
      sliceLabel={(e) => `${e.id} (${e.value})`}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
    />
  )
}

export default MechanicVsManualPumpChart
