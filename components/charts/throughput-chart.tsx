"use client"

import { useEffect, useState, useRef } from "react"
import { graphqlQuery, queries } from "@/lib/graphql-client"
import type { TimeSeriesDataPoint } from "@/lib/types"
import * as d3 from "d3"

interface ThroughputChartProps {
  serviceName: string
}

export function ThroughputChart({ serviceName }: ThroughputChartProps) {
  const [data, setData] = useState<TimeSeriesDataPoint[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await graphqlQuery<{
          serviceTimeSeries: {
            serviceName: string
            metric: string
            data: TimeSeriesDataPoint[]
          }
        }>(queries.serviceTimeSeries(serviceName, "throughput"))

        setData(result.serviceTimeSeries.data)
      } catch (error) {
        console.error("[v0] Failed to fetch throughput data:", error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [serviceName])

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = 300
    const margin = { top: 20, right: 30, bottom: 30, left: 50 }

    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.timestamp) as [number, number])
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.value) as number) * 1.1])
      .range([height - margin.bottom, margin.top])

    // Add gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "throughput-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "oklch(0.70 0.15 160)").attr("stop-opacity", 0.3)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "oklch(0.70 0.15 160)").attr("stop-opacity", 0)

    // Add area
    const area = d3
      .area<TimeSeriesDataPoint>()
      .x((d) => x(d.timestamp))
      .y0(height - margin.bottom)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX)

    svg.append("path").datum(data).attr("fill", "url(#throughput-gradient)").attr("d", area)

    // Add line
    const line = d3
      .line<TimeSeriesDataPoint>()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX)

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "oklch(0.70 0.15 160)")
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(6)
          .tickFormat((d) => {
            const date = new Date(d as number)
            return d3.timeFormat("%H:%M:%S")(date)
          }),
      )
      .attr("color", "oklch(0.55 0 0)")

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("color", "oklch(0.55 0 0)")

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .attr("fill", "oklch(0.55 0 0)")
      .attr("font-size", "12px")
      .text("Throughput (req/s)")
  }, [data])

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} className="w-full" />
    </div>
  )
}
