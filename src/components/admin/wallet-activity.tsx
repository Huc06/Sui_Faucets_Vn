"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Wallet, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { analyticsAPI } from "@/api/services"
import { useToast } from "@/hooks/use-toast"

export function WalletActivity() {
  const [walletAddress, setWalletAddress] = useState("")
  const [activityData, setActivityData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!walletAddress.trim()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid wallet address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const data = await analyticsAPI.getWalletActivity(walletAddress.trim(), 30)
      setActivityData(data)
      setSearched(true)
      
      toast({
        title: "Search Complete",
        description: "Wallet activity data retrieved successfully",
      })
    } catch (error) {
      console.error("Failed to fetch wallet activity:", error)
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to retrieve wallet activity",
        variant: "destructive",
      })
      setActivityData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[#4DA2FF]" />
            Wallet Activity Search
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">
            Search for specific wallet activity and transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter Sui wallet address (0x...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white dark:bg-[#030F1C] border-[#4DA2FF]/30 focus:border-[#4DA2FF] text-gray-900 dark:text-white"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading}
                size="small"
                className="bg-[#4DA2FF] text-white hover:bg-[#011829] transition-colors duration-200"
              >
                <Search className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            
            {/* Demo Addresses */}
            <div className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">
              <span className="font-medium">Demo addresses:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  '0xf843f93556205b046d35da053eef3b62da1874b30d656cd10720c11ed9c92d9e',
                  '0xd15d3a3472d074baa16e5e6dba32e4d373e4eb4b6224d66c7bcb4a34c5ec8e65',
                  '0x0a7b8caa26fb1c7c3b84c1f8dd51d8416b232c3e7e48b5eb0254ed2a83170c79'
                ].map((addr, index) => (
                  <button
                    key={index}
                    onClick={() => setWalletAddress(addr)}
                    className="px-2 py-1 bg-[#4DA2FF]/10 text-[#4DA2FF] rounded text-xs hover:bg-[#4DA2FF]/20 transition-colors duration-200 font-mono"
                  >
                    {addr.slice(0, 8)}...{addr.slice(-6)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {searched && (
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#4DA2FF]" />
              Activity Results
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">
              Activity data for the past 30 days
              {walletAddress && (
                <>
                  <br />
                  <span className="text-xs font-mono bg-[#4DA2FF]/10 px-2 py-1 rounded">
                    {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
                  </span>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activityData ? (
              <div className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-[#4DA2FF]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Requests</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {activityData.totalRequests || 0}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-[#4DA2FF]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {activityData.successRate ? `${activityData.successRate}%` : 'N/A'}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#4DA2FF]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Active</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {activityData.lastActivity ? new Date(activityData.lastActivity).toLocaleDateString() : 'Never'}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-[#4DA2FF]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {activityData.totalAmount ? `${activityData.totalAmount} SUI` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(activityData.country || activityData.ipAddress || activityData.averageResponseTime) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activityData.country && (
                      <div className="p-3 rounded-lg bg-[#4DA2FF]/5 border border-[#4DA2FF]/10">
                        <span className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Country</span>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{activityData.country}</div>
                      </div>
                    )}
                    {activityData.ipAddress && (
                      <div className="p-3 rounded-lg bg-[#4DA2FF]/5 border border-[#4DA2FF]/10">
                        <span className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">IP Address</span>
                        <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">{activityData.ipAddress}</div>
                      </div>
                    )}
                    {activityData.averageResponseTime && (
                      <div className="p-3 rounded-lg bg-[#4DA2FF]/5 border border-[#4DA2FF]/10">
                        <span className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Avg Response Time</span>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{activityData.averageResponseTime}ms</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Activity Details */}
                {activityData.transactions && activityData.transactions.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#4DA2FF]" />
                      Recent Transactions ({activityData.transactions.length})
                    </h4>
                    {activityData.transactions.slice(0, 10).map((tx: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg bg-white dark:bg-[#011829]/20 border border-[#4DA2FF]/10 hover:bg-[#4DA2FF]/5 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {tx.amount || tx.normalizedAmount || '1.0'} SUI
                              </span>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  tx.status === 'success' 
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}
                              >
                                {tx.status || 'unknown'}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-[#C0E6FF]/70 font-mono">
                              {tx.txHash && (
                                <span>
                                  TX: {tx.txHash.slice(0, 12)}...{tx.txHash.slice(-10)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">
                              {tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : 'Unknown date'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {tx.timestamp ? new Date(tx.timestamp).toLocaleTimeString() : 'Unknown time'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-[#C0E6FF]/70">
                      No transaction history found for this wallet address
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-[#C0E6FF]/70">
                  No activity data found for this wallet address
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 