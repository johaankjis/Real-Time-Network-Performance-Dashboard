"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Node {
  id: string
  name: string
  type: "service" | "database" | "cache"
  status: "healthy" | "degraded" | "down"
}

interface Link {
  source: string
  target: string
  latency: number
}

const nodes: Node[] = [
  { id: "gateway", name: "API Gateway", type: "service", status: "healthy" },
  { id: "auth", name: "Auth Service", type: "service", status: "healthy" },
  { id: "payment", name: "Payment", type: "service", status: "degraded" },
  { id: "user", name: "User Service", type: "service", status: "healthy" },
  { id: "notification", name: "Notifications", type: "service", status: "healthy" },
  { id: "db", name: "PostgreSQL", type: "database", status: "healthy" },
  { id: "cache", name: "Redis", type: "cache", status: "healthy" },
]

const links: Link[] = [
  { source: "gateway", target: "auth", latency: 23 },
  { source: "gateway", target: "payment", latency: 156 },
  { source: "gateway", target: "user", latency: 34 },
  { source: "auth", target: "db", latency: 12 },
  { source: "auth", target: "cache", latency: 5 },
  { source: "payment", target: "db", latency: 45 },
  { source: "user", target: "db", latency: 18 },
  { source: "user", target: "notification", latency: 28 },
]

export function D3NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 500
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg.append("g")

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoom)

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(150),
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50))

    // Create links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", (d) => Math.max(1, 5 - d.latency / 50))
      .attr("stroke-opacity", 0.6)

    // Create link labels
    const linkLabel = g
      .append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .attr("font-size", 10)
      .attr("fill", "hsl(var(--muted-foreground))")
      .attr("text-anchor", "middle")
      .text((d) => `${d.latency}ms`)

    // Create nodes
    const node = g
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.type === "service" ? 30 : 25))
      .attr("fill", (d) => {
        if (d.status === "healthy") return "hsl(var(--success))"
        if (d.status === "degraded") return "hsl(var(--warning))"
        return "hsl(var(--error))"
      })
      .attr("stroke", "hsl(var(--background))")
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .call(d3.drag<any, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add node labels
    const nodeLabel = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .attr("fill", "hsl(var(--foreground))")
      .text((d) => d.name)
      .style("pointer-events", "none")

    // Add node type icons (simplified as text)
    const nodeIcon = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("font-size", 16)
      .attr("fill", "hsl(var(--background))")
      .text((d) => {
        if (d.type === "database") return "🗄"
        if (d.type === "cache") return "⚡"
        return "⚙"
      })
      .style("pointer-events", "none")

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      nodeLabel.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)

      nodeIcon.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Dependency Graph</CardTitle>
        <CardDescription>Interactive network topology visualization with D3.js</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
          <svg ref={svgRef} width="100%" height="500" viewBox="0 0 800 500" className="w-full" />
        </div>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-error" />
            <span className="text-muted-foreground">Down</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
