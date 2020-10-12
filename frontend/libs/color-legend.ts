import * as d3 from 'd3'

export default function colorLegend(
  selector: string,
  colors: d3.ScaleQuantize<string>,
  { title = '', width = 450, height = 40 } = {}
) {
  const [minValue, maxValue] = colors.domain()
  const steps = colors.range().length
  const margin = 25
  const stepWidth = (width - 2 * margin) / steps

  const scale = d3
    .scaleLinear()
    .domain(colors.domain())
    .range([0, width - 2 * margin])

  const values = d3
    .range(steps + 1)
    .map((v) => minValue + ((maxValue - minValue) / steps) * v)

  const axis = d3.axisTop(scale).tickSize(1).tickValues(values)

  const svg = d3
    .select(selector)
    .append('svg')
    .attr('id', 'legend')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g').attr('transform', `translate(${margin}, 16)`)

  g.selectAll('rect')
    .data(colors.range())
    .enter()
    .append('rect')
    .attr('fill', (d) => d)
    .attr('x', (_, i) => stepWidth * i)
    .attr('width', stepWidth)
    .attr('height', 10)

  g.append('g').call(axis)

  g.append('g')
    .attr('font-size', 12)
    .append('text')
    .attr('class', 'caption')
    .attr('y', 21)
    .text(title)
}
