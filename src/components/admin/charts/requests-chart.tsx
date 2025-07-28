"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface RequestsChartProps {
  data: Array<{ date: string; requests: number }>
}

export function RequestsChart({ data }: RequestsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => new Date(value).toLocaleDateString()} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          labelFormatter={(value) => new Date(value).toLocaleDateString()}
          formatter={(value: number) => [value, "Requests"]}
        />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
