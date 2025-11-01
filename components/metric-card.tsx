import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  description?: string
}

export function MetricCard({ title, value, unit, trend = "neutral", trendValue, description }: MetricCardProps) {
  const trendColors = {
    up: "text-error",
    down: "text-success",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 mt-1 text-sm ${trendColors[trend]}`}>
            {trend === "up" && <ArrowUpIcon className="h-3 w-3" />}
            {trend === "down" && <ArrowDownIcon className="h-3 w-3" />}
            <span>{trendValue}</span>
          </div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
