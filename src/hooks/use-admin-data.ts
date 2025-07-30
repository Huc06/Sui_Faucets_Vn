"use client"

import { useState, useEffect, useCallback } from "react"
import { analyticsAPI, systemAPI, type AnalyticsStats } from "@/api/services"

// Use the AnalyticsStats interface from API services
type AdminStats = AnalyticsStats

export function useAdminData() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch data from real APIs in parallel
      const [statsData, topCountries, requestsOverTime, recentTransactions] = await Promise.all([
        analyticsAPI.getStats(7),
        analyticsAPI.getTopCountries(7, 5),
        analyticsAPI.getHourly(7), // Use real hourly data for time series
        analyticsAPI.getTransactionHistory(10) // Get real transaction history
      ])
      
      // Combine the data
      const combinedStats = {
        ...statsData,
        topCountries,
        requestsOverTime,
        recentTransactions
      }
      
      console.log("Combined stats:", combinedStats)
      setStats(combinedStats)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Failed to fetch admin stats:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshData = useCallback(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    fetchStats()

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refreshData,
  }
}