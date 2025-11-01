"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { generatePerformanceData, type PerformanceData } from "@/lib/mock-data"

const initialLatencyData: PerformanceData[] = [
  { time: "00:00", gateway: 45, auth: 23, payment: 156, user: 34 },
  { time: "04:00", gateway: 52, auth: 28, payment: 142, user: 38 },
  { time: "08:00", gateway: 78, auth: 45, payment: 189, user: 56 },
  { time: "12:00", gateway: 92, auth: 52, payment: 234, user: 67 },
  { time: "16:00", gateway: 85, auth: 48, payment: 198, user: 61 },
  { time: "20:00", gateway: 61, auth: 35, payment: 167, user: 45 },
]

const throughputData = [
  { time: "00:00", requests: 8200, errors: 12 },
  { time: "04:00", requests: 6800, errors: 8 },
  { time: "08:00", requests: 15400, errors: 23 },
  { time: "12:00", requests: 18900, errors: 31 },
  { time: "16:00", requests: 16700, errors: 28 },
  { time: "20:00", requests: 12300, errors: 15 },
]

export function PerformanceCharts() {
  const [latencyData, setLatencyData] = useState<PerformanceData[]>(initialLatencyData)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData((prev) => {
        const newData = [...prev.slice(1), generatePerformanceData()]
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Real-time service performance over the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latency" className="space-y-4">
          <TabsList>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="throughput">Throughput</TabsTrigger>
          </TabsList>

          <TabsContent value="latency" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="gateway"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="API Gateway"
                />
                <Line type="monotone" dataKey="auth" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Auth Service" />
                <Line
                  type="monotone"
                  dataKey="payment"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  name="Payment Service"
                />
                <Line type="monotone" dataKey="user" stroke="hsl(var(--chart-4))" strokeWidth={2} name="User Service" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="throughput" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: "Requests/min", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                  name="Total Requests"
                />
                <Area
                  type="monotone"
                  dataKey="errors"
                  stroke="hsl(var(--error))"
                  fill="hsl(var(--error))"
                  fillOpacity={0.6}
                  name="Errors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
