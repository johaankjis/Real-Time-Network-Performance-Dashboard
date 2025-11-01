import { Badge } from "@/components/ui/badge"

interface ServiceStatusBadgeProps {
  status: "healthy" | "warning" | "critical"
}

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  const variants = {
    healthy: "default",
    warning: "secondary",
    critical: "destructive",
  } as const

  const colors = {
    healthy: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    critical: "bg-error/20 text-error border-error/30",
  }

  return (
    <Badge variant={variants[status]} className={colors[status]}>
      {status}
    </Badge>
  )
}
