import { StatelessComponent, useRef, useEffect } from 'react'
import * as d3 from 'd3'

type Props = {
  scale: d3.ScaleQuantize<string>
  title?: string
  width?: number
  height?: number
  margin?: number
}

const ColorLegend: StatelessComponent<Props> = ({
  scale,
  title = '',
  width = 450,
  height = 40,
  margin = 25,
}) => {
  const elRef = useRef<HTMLDivElement>(null)

  const [minValue, maxValue] = scale.domain()
  const steps = scale.range().length
  const stepWidth = (width - 2 * margin) / steps

  const numbers = d3
    .scaleLinear()
    .domain(scale.domain())
    .range([0, width - 2 * margin])

  const values = d3
    .range(steps + 1)
    .map((v) => minValue + ((maxValue - minValue) / steps) * v)

  const axis = d3.axisTop(numbers).tickSize(1).tickValues(values)

  useEffect(() => {
    const svg = d3
      .select(elRef.current as Element)
      .append('svg')
      .attr('id', 'legend')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g').attr('transform', `translate(${margin}, 16)`)

    g.selectAll('rect')
      .data(scale.range())
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
  }, [])

  return <div className="color-legend" ref={elRef}></div>
}

export default ColorLegend
