"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"
import { generateTrace, type Trace } from "@/lib/mock-data"

const initialTraces: Trace[] = [
  {
    id: "trace-1",
    endpoint: "POST /api/payments/process",
    duration: 234,
    status: "success",
    spans: 12,
    timestamp: new Date(Date.now() - 1000),
  },
  {
    id: "trace-2",
    endpoint: "GET /api/users/profile",
    duration: 45,
    status: "success",
    spans: 5,
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "trace-3",
    endpoint: "POST /api/auth/login",
    duration: 89,
    status: "error",
    spans: 8,
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "trace-4",
    endpoint: "GET /api/products/search",
    duration: 156,
    status: "success",
    spans: 15,
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "trace-5",
    endpoint: "PUT /api/orders/update",
    duration: 67,
    status: "success",
    spans: 9,
    timestamp: new Date(Date.now() - 300000),
  },
]

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  return `${hours} hour${hours > 1 ? "s" : ""} ago`
}

export function RecentTraces() {
  const [traces, setTraces] = useState<Trace[]>(initialTraces)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrace = generateTrace()
      setTraces((prev) => [newTrace, ...prev.slice(0, 4)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Traces</CardTitle>
        <CardDescription>Latest distributed traces across services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {traces.map((trace) => (
            <div
              key={trace.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono text-foreground">{trace.endpoint}</code>
                  <Badge variant={trace.status === "success" ? "outline" : "destructive"} className="text-xs">
                    {trace.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {trace.duration}ms
                  </span>
                  <span>{trace.spans} spans</span>
                  <span>{getTimeAgo(trace.timestamp)}</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
