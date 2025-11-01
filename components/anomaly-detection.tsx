"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { generateAnomaly, type Anomaly } from "@/lib/mock-data"

const initialAnomalies: Anomaly[] = [
  {
    id: "1",
    service: "Payment Service",
    type: "High Latency",
    severity: "warning",
    description: "Average latency increased by 45% in the last hour",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "2",
    service: "API Gateway",
    type: "Traffic Spike",
    severity: "info",
    description: "Unusual traffic pattern detected from US-East region",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    service: "Auth Service",
    type: "Error Rate",
    severity: "critical",
    description: "Error rate increased to 2.3% (threshold: 1%)",
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
  },
]

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  const hours = Math.floor(minutes / 60)
  return `${hours} hour${hours > 1 ? "s" : ""} ago`
}

export function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomalies)

  useEffect(() => {
    const interval = setInterval(() => {
      const newAnomaly = generateAnomaly()
      if (newAnomaly) {
        setAnomalies((prev) => [newAnomaly, ...prev.slice(0, 4)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    if (type.includes("Latency")) return TrendingUp
    if (type.includes("Spike")) return Zap
    return AlertTriangle
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>AI-powered anomaly detection across all services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalies.map((anomaly) => {
            const Icon = getIcon(anomaly.type)
            return (
              <div
                key={anomaly.id}
                className="flex gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    anomaly.severity === "critical"
                      ? "bg-error/10"
                      : anomaly.severity === "warning"
                        ? "bg-warning/10"
                        : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      anomaly.severity === "critical"
                        ? "text-error"
                        : anomaly.severity === "warning"
                          ? "text-warning"
                          : "text-primary"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{anomaly.service}</span>
                    <Badge
                      variant={
                        anomaly.severity === "critical"
                          ? "destructive"
                          : anomaly.severity === "warning"
                            ? "outline"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {anomaly.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{anomaly.description}</p>
                  <span className="text-xs text-muted-foreground">{getTimeAgo(anomaly.timestamp)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
