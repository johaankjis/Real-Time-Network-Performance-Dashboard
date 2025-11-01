import { type NextRequest, NextResponse } from "next/server"
import {
  generateAllServicesMetrics,
  generateServiceHealth,
  generateTraces,
  generateAnomalies,
  generateTimeSeriesData,
  SERVICES,
} from "@/lib/mock-data"
import { getCurrentUser, hasPermission, canAccessService } from "@/lib/auth"

// Simple GraphQL resolver
function resolveQuery(query: string, variables: any = {}) {
  const user = getCurrentUser()

  // Parse query type
  if (query.includes("allServices")) {
    if (!hasPermission(user, "read:metrics")) {
      throw new Error("Unauthorized")
    }

    const metrics = generateAllServicesMetrics()
    return {
      allServices: metrics.filter((m) => canAccessService(user, m.serviceName)),
    }
  }

  if (query.includes("serviceHealth")) {
    if (!hasPermission(user, "read:metrics")) {
      throw new Error("Unauthorized")
    }

    const serviceName = variables.serviceName || SERVICES[0]
    if (!canAccessService(user, serviceName)) {
      throw new Error("Access denied to this service")
    }

    return {
      serviceHealth: generateServiceHealth(serviceName),
    }
  }

  if (query.includes("serviceTimeSeries")) {
    if (!hasPermission(user, "read:metrics")) {
      throw new Error("Unauthorized")
    }

    const serviceName = variables.serviceName || SERVICES[0]
    const metric = variables.metric || "latency"

    if (!canAccessService(user, serviceName)) {
      throw new Error("Access denied to this service")
    }

    let baseValue = 100
    let variance = 20

    switch (metric) {
      case "latency":
        baseValue = 80
        variance = 30
        break
      case "throughput":
        baseValue = 250
        variance = 50
        break
      case "errorRate":
        baseValue = 2
        variance = 1.5
        break
    }

    return {
      serviceTimeSeries: {
        serviceName,
        metric,
        data: generateTimeSeriesData(60, baseValue, variance),
      },
    }
  }

  if (query.includes("traces")) {
    if (!hasPermission(user, "read:traces")) {
      throw new Error("Unauthorized")
    }

    return {
      traces: generateTraces(20),
    }
  }

  if (query.includes("anomalies")) {
    if (!hasPermission(user, "read:anomalies")) {
      throw new Error("Unauthorized")
    }

    return {
      anomalies: generateAnomalies(),
    }
  }

  return { error: "Unknown query" }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body

    const data = resolveQuery(query, variables)

    return NextResponse.json(
      { data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
        },
      },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "GraphQL endpoint - use POST with query and variables",
  })
}
