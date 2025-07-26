// Mock API service for React + Vite project

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

// Mock data
const mockStats: AdminStats = {
  totalRequests: 12847,
  totalDistributed: 1200000,
  successRate: 99.8,
  activeUsers24h: 1234,
  averageResponseTime: 2.3,
  topCountries: [
    { country: "Vietnam", requests: 3421 },
    { country: "United States", requests: 2156 },
    { country: "China", requests: 1876 },
    { country: "Japan", requests: 1234 },
    { country: "Korea", requests: 987 },
  ],
  requestsOverTime: [
    { date: "2024-01-01", requests: 234 },
    { date: "2024-01-02", requests: 456 },
    { date: "2024-01-03", requests: 678 },
    { date: "2024-01-04", requests: 543 },
    { date: "2024-01-05", requests: 789 },
    { date: "2024-01-06", requests: 654 },
    { date: "2024-01-07", requests: 876 },
  ],
  recentTransactions: [
    {
      id: 1,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      amount: 1,
      timestamp: "2024-01-07T10:30:00Z",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      status: "success",
    },
    {
      id: 2,
      address: "0x2345678901bcdefg2345678901bcdefg23456789",
      amount: 1,
      timestamp: "2024-01-07T10:25:00Z",
      txHash: "0xbcdefg1234567890bcdefg1234567890bcdefg12",
      status: "success",
    },
    {
      id: 3,
      address: "0x3456789012cdefgh3456789012cdefgh34567890",
      amount: 1,
      timestamp: "2024-01-07T10:20:00Z",
      txHash: "0xcdefgh1234567890cdefgh1234567890cdefgh12",
      status: "pending",
    },
    {
      id: 4,
      address: "0x4567890123defghi4567890123defghi45678901",
      amount: 1,
      timestamp: "2024-01-07T10:15:00Z",
      txHash: "0xdefghi1234567890defghi1234567890defghi12",
      status: "failed",
    },
  ],
}

// Simulate API call
export const fetchAdminStats = async (): Promise<AdminStats> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Simulate occasional errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Network error: Unable to fetch data")
  }
  
  return mockStats
}

// Additional API functions
export const refreshFaucetConfig = async (config: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log("Faucet config updated:", config)
  return { success: true }
}

export const exportTransactionData = async (format: 'csv' | 'json') => {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log(`Exporting data in ${format} format`)
  return { downloadUrl: `/exports/transactions.${format}` }
}