"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsChart } from "./charts/requests-chart"
import { CountriesChart } from "./charts/countries-chart"
import { SourcesChart } from "./charts/sources-chart"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe } from "lucide-react"

interface AnalyticsTabProps {
  stats: {
    requestsOverTime: Array<{ date: string; requests: number }>
    topCountries: Array<{ country: string; requests: number }>
    geographicData: Array<{ country: string; requests: number; percentage: number }>
    topSources: Array<{ source: string; requests: number }>
    topCountry: { country: string; requests: number }
  }
}

export function AnalyticsTab({ stats }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Charts Grid */}
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

        {/* Top Sources */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Request Sources</CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">Most active IP addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <SourcesChart data={stats.topSources || []} />
          </CardContent>
        </Card>

        {/* Geographic Summary */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#4DA2FF]" />
              Geographic Summary
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">Request distribution overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Top Country Highlight */}
              <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-[#4DA2FF]" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Most Active Country</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.topCountry.country}
                </div>
                <div className="text-sm text-gray-600 dark:text-[#C0E6FF]">
                  {stats.topCountry.requests.toLocaleString()} requests
                </div>
              </div>

              {/* Geographic Data List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {stats.geographicData.length > 0 ? (
                  stats.geographicData.slice(0, 10).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#011829]/20">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.country}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.requests}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No geographic data available
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
