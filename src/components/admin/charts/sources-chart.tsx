"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SourcesChartProps {
  data: Array<{ source: string; requests: number }>
}

export function SourcesChart({ data }: SourcesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        No source data available
      </div>
    )
  }
  
  // Sort by requests descending for better visualization
  const sortedData = [...data].sort((a, b) => b.requests - a.requests)

  // Format IP addresses for display (truncate long ones)
  const formattedData = sortedData.map(item => ({
    ...item,
    displaySource: item.source.length > 15 ? `${item.source.slice(0, 12)}...` : item.source
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#C0E6FF" opacity={0.3} />
        <XAxis 
          dataKey="displaySource" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                       <Tooltip
                 contentStyle={{
                   backgroundColor: '#FFFFFF',
                   border: '1px solid #4DA2FF',
                   borderRadius: '8px',
                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                 }}
                 formatter={(value: number) => [value, 'Requests']}
                 labelFormatter={(label: string) => {
                   const item = sortedData.find(d => d.source.startsWith(label.replace('...', '')))
                   return `Source: ${item?.source || label}`
                 }}
               />
        <Bar 
          dataKey="requests" 
          fill="#4DA2FF" 
          radius={[4, 4, 0, 0]}
          opacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 