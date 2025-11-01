interface GraphQLResponse<T = any> {
  data?: T
  error?: string
}

export async function graphqlQuery<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })

  const result: GraphQLResponse<T> = await response.json()

  if (result.error) {
    throw new Error(result.error)
  }

  return result.data as T
}

// Query builders
export const queries = {
  allServices: () => `
    query {
      allServices {
        serviceName
        timestamp
        latencyP95
        latencyP99
        throughput
        errorRate
        status
      }
    }
  `,

  serviceHealth: (serviceName: string) => `
    query {
      serviceHealth(serviceName: "${serviceName}") {
        serviceName
        status
        latencyP95
        latencyP99
        throughput
        errorRate
        uptime
      }
    }
  `,

  serviceTimeSeries: (serviceName: string, metric: string) => `
    query {
      serviceTimeSeries(serviceName: "${serviceName}", metric: "${metric}") {
        serviceName
        metric
        data {
          timestamp
          value
        }
      }
    }
  `,

  traces: () => `
    query {
      traces {
        traceId
        serviceName
        operation
        duration
        timestamp
        status
      }
    }
  `,

  anomalies: () => `
    query {
      anomalies {
        id
        serviceName
        type
        severity
        timestamp
        description
      }
    }
  `,
}
