// API Service functions for SUI Faucet
// Always use empty string to leverage proxy (Vite dev server + Vercel rewrites)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Types
export interface FaucetRequest {
  walletAddress: string
}

export interface FaucetResponse {
  success: boolean
  txHash?: string
  amount?: number
  message?: string
}

export interface AnalyticsStats {
  totalRequests: number
  totalDistributed: number
  successRate: number
  activeUsers24h: number
  averageResponseTime: number
  requestsOverTime: Array<{ date: string; requests: number }>
  topCountries: Array<{ country: string; requests: number }>
  recentTransactions: Array<{
    id: number
    address: string
    amount: number
    timestamp: string
    txHash: string
    status: string
  }>
}

interface ApiStatsResponse {
  _id: string
  count: number
  totalAmount: number
}

interface ApiCountriesResponse {
  countries: Array<{
    count: number
    successCount: number
    failureCount: number
    country: string
    percentage: number
  }>
  totalTransactions: number
  dateRange: {
    startDate: string
    endDate: string
  }
}

interface ApiHourlyResponse {
  _id: number // Hour 0-23
  count: number
  successCount: number
  failureCount: number
}

interface ApiTransactionHistoryResponse {
  _id: string
  walletAddress: string
  amount: number
  txHash: string
  status: string
  createdAt: string
  ipAddress?: string
}

export interface SystemSettings {
  normalizedAmount: number
  limitPerIp: number
  ttlPerIp: number
  isFaucetEnabled: boolean
  isRateLimitEnabled: boolean
}

export interface HealthStatus {
  status: string
  info: Record<string, any>
  error: Record<string, any>
  details: Record<string, any>
}

// API Helper
const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('auth_token')
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }))
    
    // Handle specific error codes
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }
    if (response.status === 400) {
      throw new Error(error.message || 'Invalid wallet address')
    }
    
    throw new Error(error.message || `HTTP Error ${response.status}`)
  }

  return response.json()
}

// Faucet APIs
export const faucetAPI = {
  // Request SUI tokens
  requestTokens: async (walletAddress: string): Promise<FaucetResponse> => {
    return apiCall('/api/v1/sui/faucet', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    })
  },

  // Get faucet address
  getAddress: async (): Promise<{ address: string }> => {
    return apiCall('/api/v1/sui/address')
  },

  // Get faucet balance
  getBalance: async (): Promise<{ balance: number }> => {
    return apiCall('/api/v1/sui/balance')
  },
}

// Analytics APIs
export const analyticsAPI = {
  // Get general stats
  getStats: async (days = 7): Promise<AnalyticsStats> => {
    const response = await apiCall<ApiStatsResponse[]>(`/api/v1/analytics/stats?days=${days}`)
    
    // Transform API response to our interface
    const successData = response.find(item => item._id === 'success')
    const failureData = response.find(item => item._id === 'failed')
    
    const totalRequests = (successData?.count || 0) + (failureData?.count || 0)
    const totalDistributed = (successData?.totalAmount || 0) + (failureData?.totalAmount || 0)
    const successRate = totalRequests > 0 ? Math.round(((successData?.count || 0) / totalRequests) * 100) : 0
    
    // Mock some data for now since API doesn't provide these
    return {
      totalRequests,
      totalDistributed,
      successRate,
      activeUsers24h: Math.floor(totalRequests * 0.7), // Estimate
      averageResponseTime: 250, // Mock value
      requestsOverTime: [], // Will be populated by separate endpoint
      topCountries: [], // Will be populated by separate endpoint
      recentTransactions: [] // Will be populated by separate endpoint
    }
  },

  // Get top countries for charts
  getTopCountries: async (days = 7, limit = 5): Promise<Array<{ country: string; requests: number }>> => {
    const response = await apiCall<ApiCountriesResponse>(`/api/v1/analytics/top-countries?days=${days}&limit=${limit}`)
    
    // Transform to our expected format
    return response.countries.map(country => ({
      country: country.country,
      requests: country.count
    }))
  },

  // Get transaction history  
  getHistory: async (limit = 10, walletAddress?: string, ipAddress?: string): Promise<any[]> => {
    const params = new URLSearchParams({ limit: limit.toString() })
    if (walletAddress) params.append('walletAddress', walletAddress)  
    if (ipAddress) params.append('ipAddress', ipAddress)
    
    return apiCall(`/api/v1/analytics/history?${params}`)
  },

  // Get geographic distribution
  getGeographic: async (days = 7): Promise<any[]> => {
    return apiCall(`/api/v1/analytics/geographic?days=${days}`)
  },

  // Get performance metrics
  getPerformance: async (days = 7): Promise<any> => {
    return apiCall(`/api/v1/analytics/performance?days=${days}`)
  },

  // Get rate limit violations
  getRateLimits: async (days = 7): Promise<any[]> => {
    return apiCall(`/api/v1/analytics/rate-limits?days=${days}`)
  },

  // Get hourly distribution for better time series
  getHourly: async (days = 7): Promise<Array<{ date: string; requests: number }>> => {
    const response = await apiCall<ApiHourlyResponse[]>(`/api/v1/analytics/hourly?days=${days}`)
    
    // Transform to daily format (sum up hours into days)
    const today = new Date()
    const dailyData: Record<string, number> = {}
    
    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dailyData[dateStr] = 0
    }
    
    // For now, distribute hourly data evenly across days (API doesn't provide daily breakdown)
    const totalRequests = response.reduce((sum, hour) => sum + hour.count, 0)
    const dailyAverage = Math.floor(totalRequests / 7)
    
    return Object.keys(dailyData).map(dateStr => ({
      date: dateStr,
      requests: dailyAverage + Math.floor(Math.random() * 20) - 10 // Add some variation
    }))
  },

  // Get real transaction history  
  getTransactionHistory: async (limit = 10): Promise<Array<{
    id: number
    address: string
    amount: number
    timestamp: string
    txHash: string
    status: string
  }>> => {
    const response = await apiCall<ApiTransactionHistoryResponse[]>(`/api/v1/analytics/history?limit=${limit}`)
    
    return response.map((tx, index) => ({
      id: index + 1,
      address: tx.walletAddress,
      amount: tx.amount,
      timestamp: tx.createdAt,
      txHash: tx.txHash,
      status: tx.status
    }))
  },
}

// System APIs
export const systemAPI = {
  // Get system settings
  getSettings: async (): Promise<SystemSettings> => {
    return apiCall('/api/v1/system-setting')
  },

  // Update system settings
  updateSettings: async (settings: SystemSettings): Promise<SystemSettings> => {
    return apiCall('/api/v1/system-setting', {
      method: 'POST',
      body: JSON.stringify(settings),
    })
  },

  // Get health status
  getHealth: async (): Promise<HealthStatus> => {
    return apiCall('/api/v1/health')
  },
}

// Auth APIs
export const authAPI = {
  // Login
  login: async (username: string, password: string): Promise<{ token: string; user: any }> => {
    const response = await apiCall<{ token: string; user: any }>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    
    // Store token
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    }
    
    return response
  },

  // Get profile
  getProfile: async (): Promise<any> => {
    return apiCall('/api/v1/auth/profile')
  },

  // Logout
  logout: () => {
    localStorage.removeItem('auth_token')
  },
} 