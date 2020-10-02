import { StatelessComponent } from 'react'
import { ResponsivePie } from '@nivo/pie'
import data from './data/treatment-type.json'

const WaterTreatmentChart: StatelessComponent = () => {
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
