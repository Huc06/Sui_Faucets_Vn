"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchAdminStats } from "@/api/stats/route"

interface AdminStats {
  totalRequests: number
  totalDistributed: number
  successRate: number
  activeUsers24h: number
  averageResponseTime: number
  topCountries: Array<{ country: string; requests: number }>
  requestsOverTime: Array<{ date: string; requests: number }>
  recentTransactions: Array<{
    id: number
    address: string
    amount: number
    timestamp: string
    txHash: string
    status: string
  }>
}

export function useAdminData() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Use the React API service instead of fetch("/api/stats")
      const data = await fetchAdminStats()
      setStats(data)
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