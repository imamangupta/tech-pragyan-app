import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  value: string
  label: string
  icon: ReactNode
  iconBg: string
  iconColor: string
}

export function StatCard({ value, label, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-gray-500 text-sm">{label}</div>
        </div>
        <div className={`${iconBg} ${iconColor} p-2 rounded-md`}>{icon}</div>
      </CardContent>
    </Card>
  )
}

