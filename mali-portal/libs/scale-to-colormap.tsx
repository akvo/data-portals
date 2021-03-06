import * as d3 from 'd3'

type ColorMap = [number, string]

const scaleToColorMap = (scale: d3.ScaleQuantize<string>): ColorMap[] => {
  const [minValue, maxValue] = scale.domain()
  const range = scale.range()
  const steps = range.length

  return d3
    .range(steps)
    .map((v) => [minValue + ((maxValue - minValue) / steps) * v, range[v]])
}

export default scaleToColorMap
