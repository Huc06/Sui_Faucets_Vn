// Faucet API service for React + Vite

interface FaucetRequest {
  address: string
  amount: number
  network: 'testnet' | 'devnet'
}

interface FaucetResponse {
  success: boolean
  txHash?: string
  message: string
  balance?: number
}

// Mock faucet service
export const requestSuiTokens = async (request: FaucetRequest): Promise<FaucetResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate validation
  if (!request.address || request.address.length < 20) {
    throw new Error("Invalid wallet address")
  }
  
  // Simulate rate limiting
  if (Math.random() < 0.1) {
    throw new Error("Rate limit exceeded. Please try again later.")
  }
  
  // Simulate success response
  return {
    success: true,
    txHash: `0x${Math.random().toString(16).substring(2, 50)}`,
    message: `Successfully sent ${request.amount} SUI to your wallet`,
    balance: Math.floor(Math.random() * 1000)
  }
}

export const checkFaucetStatus = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    isOnline: true,
    balance: 95847,
    dailyLimit: 1000,
    requestsToday: 234,
    nextRefill: "2024-01-08T00:00:00Z"
  }
}