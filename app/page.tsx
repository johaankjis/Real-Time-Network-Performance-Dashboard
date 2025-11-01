import { Header } from "@/components/header"
import { ServiceOverview } from "@/components/service-overview"
import { PerformanceCharts } from "@/components/performance-charts"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { RecentTraces } from "@/components/recent-traces"
import { D3NetworkGraph } from "@/components/d3-network-graph"
import { D3Heatmap } from "@/components/d3-heatmap"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground">Real-time network performance across 12 distributed services</p>
          </div>
        </div>

        <ServiceOverview />

        <PerformanceCharts />

        <D3NetworkGraph />

        <D3Heatmap />

        <div className="grid gap-6 md:grid-cols-2">
          <AnomalyDetection />
          <RecentTraces />
        </div>
      </main>
    </div>
  )
}
