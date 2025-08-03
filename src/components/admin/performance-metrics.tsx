"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock, AlertTriangle, TrendingUp } from "lucide-react"

interface PerformanceMetricsProps {
  metrics: {
    averageResponseTime: number
    uptime: number
    errorRate: number
    throughput: number
  }
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Average Response Time */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Response Time
          </CardTitle>
          <Clock className="h-4 w-4 text-[#4DA2FF]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.averageResponseTime}ms
          </div>
          <p className="text-xs text-gray-600 dark:text-[#C0E6FF]">
            Average response time (API)
          </p>
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Uptime
          </CardTitle>
          <Activity className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.uptime.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600 dark:text-[#C0E6FF]">
            System availability (estimated)
          </p>
        </CardContent>
      </Card>

      {/* Error Rate */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Error Rate
          </CardTitle>
          <AlertTriangle className={`h-4 w-4 ${metrics.errorRate > 1 ? 'text-red-500' : 'text-yellow-500'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.errorRate.toFixed(2)}%
          </div>
          <p className="text-xs text-gray-600 dark:text-[#C0E6FF]">
            Request error rate (calculated)
          </p>
        </CardContent>
      </Card>

      {/* Throughput */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Throughput
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-[#4DA2FF]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.throughput}
          </div>
          <p className="text-xs text-gray-600 dark:text-[#C0E6FF]">
            Requests per minute (estimated)
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 