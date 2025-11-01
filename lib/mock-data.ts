export interface ServiceMetrics {
  name: string
  status: "healthy" | "degraded" | "down"
  latency: number
  requests: number
  uptime: number
  errorRate: number
}

export interface PerformanceData {
  time: string
  gateway: number
  auth: number
  payment: number
  user: number
}

export interface Anomaly {
  id: string
  service: string
  type: string
  severity: "info" | "warning" | "critical"
  description: string
  timestamp: Date
}

export interface Trace {
  id: string
  endpoint: string
  duration: number
  status: "success" | "error"
  spans: number
  timestamp: Date
}

export function generateServiceMetrics(): ServiceMetrics[] {
  const services = [
    "API Gateway",
    "Auth Service",
    "Payment Service",
    "User Service",
    "Notification Service",
    "Analytics Service",
  ]

  return services.map((name) => ({
    name,
    status: Math.random() > 0.9 ? "degraded" : "healthy",
    latency: Math.floor(Math.random() * 200) + 20,
    requests: Math.floor(Math.random() * 15000) + 2000,
    uptime: 99.85 + Math.random() * 0.14,
    errorRate: Math.random() * 2,
  }))
}

export function generatePerformanceData(): PerformanceData {
  const now = new Date()
  return {
    time: now.toLocaleTimeString(),
    gateway: Math.floor(Math.random() * 50) + 40,
    auth: Math.floor(Math.random() * 40) + 20,
    payment: Math.floor(Math.random() * 100) + 140,
    user: Math.floor(Math.random() * 40) + 30,
  }
}

export function generateAnomaly(): Anomaly | null {
  if (Math.random() > 0.3) return null

  const services = ["API Gateway", "Auth Service", "Payment Service", "User Service"]
  const types = ["High Latency", "Traffic Spike", "Error Rate", "Memory Usage"]
  const severities: Array<"info" | "warning" | "critical"> = ["info", "warning", "critical"]

  return {
    id: `anomaly-${Date.now()}`,
    service: services[Math.floor(Math.random() * services.length)],
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    description: "Unusual pattern detected in service metrics",
    timestamp: new Date(),
  }
}

export function generateTrace(): Trace {
  const endpoints = [
    "POST /api/payments/process",
    "GET /api/users/profile",
    "POST /api/auth/login",
    "GET /api/products/search",
    "PUT /api/orders/update",
    "DELETE /api/cart/items",
  ]

  return {
    id: `trace-${Date.now()}`,
    endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
    duration: Math.floor(Math.random() * 300) + 20,
    status: Math.random() > 0.9 ? "error" : "success",
    spans: Math.floor(Math.random() * 15) + 5,
    timestamp: new Date(),
  }
}
