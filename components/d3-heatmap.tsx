"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HeatmapData {
  hour: number
  day: string
  value: number
}

const generateHeatmapData = (): HeatmapData[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const data: HeatmapData[] = []

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      data.push({
        hour,
        day: days[day],
        value: Math.random() * 100,
      })
    }
  }

  return data
}

export function D3Heatmap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data = generateHeatmapData()
    const margin = { top: 20, right: 20, bottom: 40, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const hours = Array.from({ length: 24 }, (_, i) => i)

    const x = d3.scaleBand().domain(hours.map(String)).range([0, width]).padding(0.05)

    const y = d3.scaleBand().domain(days).range([0, height]).padding(0.05)

    const colorScale = d3
      .scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateRgb("hsl(var(--chart-2))", "hsl(var(--error))"))

    // Add cells
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(String(d.hour)) || 0)
      .attr("y", (d) => y(d.day) || 0)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", (d) => colorScale(d.value))
      .attr("rx", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "hsl(var(--foreground))").attr("stroke-width", 2)

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "absolute bg-card border border-border rounded-lg p-2 text-sm pointer-events-none")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`)
          .html(`<strong>${d.day} ${d.hour}:00</strong><br/>Traffic: ${d.value.toFixed(1)}%`)
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none")
        d3.selectAll(".absolute").remove()
      })

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(hours.filter((_, i) => i % 3 === 0).map(String)))
      .selectAll("text")
      .attr("fill", "hsl(var(--muted-foreground))")
      .style("font-size", "11px")

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "hsl(var(--muted-foreground))")
      .style("font-size", "11px")

    // Add X axis label
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 35)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(var(--foreground))")
      .style("font-size", "12px")
      .text("Hour of Day")

    // Add Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(var(--foreground))")
      .style("font-size", "12px")
      .text("Day of Week")
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Heatmap</CardTitle>
        <CardDescription>Weekly traffic patterns across all services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-hidden">
          <svg ref={svgRef} width="100%" height="300" viewBox="0 0 800 300" className="w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
