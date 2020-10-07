import { StatelessComponent } from 'react'
import { ResponsivePie } from '@nivo/pie'
import data from './data/mechanic-vs-manual-pump.json'

const MechanicVsManualPumpChart: StatelessComponent = () => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 20, bottom: 10, left: 50 }}
      startAngle={-180}
      innerRadius={0.45}
      colors={['#bcbddc', '#756bb1']}
      enableRadialLabels={false}
      sliceLabel={(e) => `${e.id} (${e.value})`}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
    />
  )
}

export default MechanicVsManualPumpChart
