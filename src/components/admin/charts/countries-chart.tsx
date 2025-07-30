"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface CountriesChartProps {
  data: Array<{ country: string; requests: number }>
}

export function CountriesChart({ data }: CountriesChartProps) {
  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  const renderLabel = (entry: any) => {
    const dataEntry = data[entry.index];
    return `${dataEntry.country} ${(entry.percent * 100).toFixed(0)}%`;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#3B82F6"
          dataKey="requests"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [value, "Requests"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
