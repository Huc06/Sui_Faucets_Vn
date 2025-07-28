"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useAdminData } from "@/hooks/use-admin-data"
import { AnalyticsTab } from "@/components/admin/analytics-tab"
import { TransactionsTab } from  "@/components/admin/transaction-tab"
import suiVideo from "@/assets/sui-video-1.mp4"


export function AdminDashboard() {
  const { stats, loading, error, refreshData } = useAdminData()

  if (loading) {
    return (
      <div className="w-full min-h-screen relative flex flex-col items-center justify-center">
        <video
          src={suiVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute top-0 left-0 -z-10"
        />
        <div className="relative z-10 bg-[#011829]/80 backdrop-blur-sm rounded-xl p-8">
          <RefreshCw className="w-8 h-8 animate-spin text-[#4DA2FF]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full min-h-screen relative flex flex-col items-center justify-center">
        <video
          src={suiVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute top-0 left-0 -z-10"
        />
        <div className="relative z-10 bg-[#011829]/80 backdrop-blur-sm rounded-xl p-8 text-center">
          <p className="text-red-400 mb-4">Failed to load dashboard data</p>
          <Button 
            size="small"
            onClick={refreshData}
            className="bg-[#4DA2FF] text-white hover:bg-[#011829]"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="w-full min-h-screen relative flex flex-col items-center justify-center">
        <video
          src={suiVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute top-0 left-0 -z-10"
        />
        <div className="relative z-10 bg-[#011829]/80 backdrop-blur-sm rounded-xl p-8">
          <p className="text-white">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start py-4 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Background video using imported asset */}
      <video
        src={suiVideo}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />

      {/* Content container, centered and with responsive max-w */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-24">
        {/* Gray wrapper around all sections */}
        <div className="bg-[#011829]/80 dark:bg-[#011829]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          
          {/* Header Section */}
          <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-[#C0E6FF] dark:text-[#C0E6FF] text-sm sm:text-base">
                    Monitor and manage the Sui faucet system
                  </p>
                </div>
                <Button 
                  onClick={refreshData} 
                  size="small"
                  disabled={loading}
                  className="bg-[#4DA2FF] text-white hover:bg-[#011829] transition-colors duration-200"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {/* Stats Overview Section */}
              <div className="relative rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-md dark:bg-[#030F1C] mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">                
                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRequests.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">SUI Distributed</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats.totalDistributed / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.successRate}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Users (24h)</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers24h.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="relative rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-md dark:bg-[#030F1C]">
                <Tabs defaultValue="analytics" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                    <TabsTrigger 
                      value="analytics" 
                      className="data-[state=active]:bg-[#4DA2FF] data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                    >
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="transactions" 
                      className="data-[state=active]:bg-[#4DA2FF] data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                    >
                      Transactions
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="data-[state=active]:bg-[#4DA2FF] data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                    >
                      Settings
                    </TabsTrigger>
                    <TabsTrigger 
                      value="monitoring" 
                      className="data-[state=active]:bg-[#4DA2FF] data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                    >
                      Monitoring
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="analytics">
                    <AnalyticsTab stats={stats} />
                  </TabsContent>

                  <TabsContent value="transactions" className="space-y-4">
                     <TransactionsTab transactions={stats.recentTransactions} />
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="p-6 border border-[#4DA2FF]/20 rounded-lg bg-[#4DA2FF]/5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Settings</h3>
                      <p className="text-gray-600 dark:text-gray-400">Configuration and system settings will be displayed here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-4">
                    <div className="p-6 border border-[#4DA2FF]/20 rounded-lg bg-[#4DA2FF]/5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Monitoring</h3>
                      <p className="text-gray-600 dark:text-gray-400">Real-time system monitoring and health checks will be displayed here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
