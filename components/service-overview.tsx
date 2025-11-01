"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { generateServiceMetrics, type ServiceMetrics } from "@/lib/mock-data"

export function ServiceOverview() {
  const [services, setServices] = useState<ServiceMetrics[]>(generateServiceMetrics())

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(generateServiceMetrics())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.name} className="p-4 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {service.status === "healthy" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <Badge variant="outline" className="text-success border-success/50">
                      Healthy
                    </Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <Badge variant="outline" className="text-warning border-warning/50">
                      Degraded
                    </Badge>
                  </>
                )}
              </div>
            </div>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latency</span>
              <span className="font-medium text-foreground">{service.latency}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requests</span>
              <span className="font-medium text-foreground">{(service.requests / 1000).toFixed(1)}K/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium text-foreground">{service.uptime.toFixed(2)}%</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
