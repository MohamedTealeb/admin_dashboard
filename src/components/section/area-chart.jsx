"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", users: 400, sessions: 240 },
  { month: "February", users: 300, sessions: 139 },
  { month: "March", users: 200, sessions: 980 },
  { month: "April", users: 278, sessions: 390 },
  { month: "May", users: 189, sessions: 480 },
  { month: "June", users: 239, sessions: 380 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "#3b82f6", // Blue
  },
  sessions: {
    label: "Sessions",
    color: "#60a5fa", // Light blue
  },
}

export function AreaChartComponent() {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">User Activity Overview</h3>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="var(--color-users)"
            fill="var(--color-users)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stackId="1"
            stroke="var(--color-sessions)"
            fill="var(--color-sessions)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default AreaChartComponent
