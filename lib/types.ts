export type UserRole = "viewer" | "engineer" | "admin"

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

export interface ServiceMetrics {
  serviceName: string
  timestamp: number
  latencyP95: number
  latencyP99: number
  throughput: number
  errorRate: number
  status: "healthy" | "warning" | "critical"
}

export interface TimeSeriesDataPoint {
  timestamp: number
  value: number
}

export interface ServiceHealth {
  serviceName: string
  status: "healthy" | "warning" | "critical"
  latencyP95: number
  latencyP99: number
  throughput: number
  errorRate: number
  uptime: number
}

export interface Trace {
  traceId: string
  serviceName: string
  operation: string
  duration: number
  timestamp: number
  status: "success" | "error"
}

export interface Anomaly {
  id: string
  serviceName: string
  type: "latency_spike" | "error_burst" | "throughput_drop"
  severity: "low" | "medium" | "high"
  timestamp: number
  description: string
}
