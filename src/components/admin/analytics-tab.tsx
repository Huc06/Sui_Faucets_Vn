"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsChart } from "./charts/requests-chart"
import { CountriesChart } from "./charts/countries-chart"

interface AnalyticsTabProps {
  stats: {
    requestsOverTime: Array<{ date: string; requests: number }>
    topCountries: Array<{ country: string; requests: number }>
  }
}

export function AnalyticsTab({ stats }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Over Time */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Requests Over Time</CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">Daily request volume for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsChart data={stats.requestsOverTime || []} />
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Countries</CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">Request distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <CountriesChart data={stats.topCountries || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
