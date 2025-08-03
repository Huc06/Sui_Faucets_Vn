"use client"

import { useState, useEffect, useCallback } from "react"
import { analyticsAPI, type AnalyticsStats } from "@/api/services"

// Extended interface for admin dashboard with new API data
export interface ExtendedAdminStats extends AnalyticsStats {
  // New data from updated API
  geographicData: Array<{ country: string; requests: number; percentage: number }>
  performanceMetrics: {
    averageResponseTime: number
    uptime: number
    errorRate: number
    throughput: number
  }
  topSources: Array<{ source: string; requests: number }>
  topCountry: { country: string; requests: number }
}

export function useAdminData() {
  const [stats, setStats] = useState<ExtendedAdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    // Don't fetch if no token
    const token = localStorage.getItem('auth_token')
    if (!token) {
      setError("Not authenticated")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Fetch data from real APIs in parallel - including new endpoints
      const [
        statsData, 
        topCountries, 
        requestsOverTime, 
        recentTransactions,
        geographicData,
        performanceMetrics,
        topSources,
        topCountry
      ] = await Promise.all([
        analyticsAPI.getStats(7),
        analyticsAPI.getTopCountries(7, 5),
        analyticsAPI.getHourly(7),
        analyticsAPI.getTransactionHistory(10),
        analyticsAPI.getGeographic(7).catch(() => []), // Fallback to empty array
        analyticsAPI.getPerformance(7).catch(() => null),
        analyticsAPI.getTopSources(7, 10).catch(() => []), // Fallback to empty array
        analyticsAPI.getTopCountry(7).catch(() => ({ country: 'Unknown', requests: 0 })) // Fallback
      ])
      
      // Combine the data into extended stats
      const combinedStats: ExtendedAdminStats = {
        ...statsData,
        topCountries,
        requestsOverTime,
        recentTransactions,
        geographicData: Array.isArray(geographicData) ? geographicData : [],
        performanceMetrics: performanceMetrics ? {
          averageResponseTime: Math.round(performanceMetrics.avgResponseTime || 0),
          uptime: 99.9, // Not provided by API - using default
          errorRate: statsData.successRate ? (100 - statsData.successRate) : 0, // Calculate from success rate
          throughput: Math.round((performanceMetrics.totalRequests || 0) / 7 * 24 * 60 / 7) || 0 // Requests per minute estimate
        } : {
          averageResponseTime: 0,
          uptime: 99.9,
          errorRate: 0,
          throughput: 0
        },
        topSources: Array.isArray(topSources) ? topSources : [],
        topCountry: {
          country: topCountry.country || 'Unknown',
          requests: topCountry.requests || 0
        }
      }
      
      console.log("Combined stats with new APIs:", combinedStats)
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