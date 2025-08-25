"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 4000, revenue: 2400 },
  { month: "February", sales: 3000, revenue: 1398 },
  { month: "March", sales: 2000, revenue: 9800 },
  { month: "April", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "June", sales: 2390, revenue: 3800 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#2563eb", // Blue
  },
  revenue: {
    label: "Revenue",
    color: "#1d4ed8", // Darker blue
  },
}

export function LineChartComponent() {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Sales & Revenue Trends</h3>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <LineChart accessibilityLayer data={chartData}>
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
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="var(--color-sales)" 
            strokeWidth={3}
            dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="var(--color-revenue)" 
            strokeWidth={3}
            dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export default LineChartComponent
