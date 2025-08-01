"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { systemAPI, type SystemSettings } from "@/api/services"

export function SettingsTab() {
  const [config, setConfig] = useState<SystemSettings>({
    normalizedAmount: 1,
    limitPerIp: 5,
    ttlPerIp: 3600, // 1 hour in seconds
    isFaucetEnabled: true,
    isRateLimitEnabled: true,
  })
  const [loading, setLoading] = useState(false)
  const [fetchingSettings, setFetchingSettings] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const { toast } = useToast()

  // Fetch current settings on mount
  useEffect(() => {
    let isMounted = true
    
    const fetchSettings = async () => {
      // Ensure loading state is true
      setFetchingSettings(true)
      setIsDataLoaded(false)
      
      // Minimum loading time - start immediately
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1500))
      
      try {
        // Fetch settings
        const settings = await systemAPI.getSettings()
        
        // Wait for minimum loading time to complete
        await minLoadingTime
        
        if (isMounted) {
          setConfig(settings)
          setIsDataLoaded(true)
          setShowSuccessBanner(true)
          
          // Hide success banner after 3 seconds
          setTimeout(() => {
            setShowSuccessBanner(false)
          }, 3000)
          
          toast({
            title: "Settings Loaded",
            description: "System configuration loaded successfully",
          })
        }
      } catch (error) {
        // Wait for minimum loading time even on error
        await minLoadingTime
        
                  if (isMounted) {
            // Set default values on error
            setConfig({
              normalizedAmount: 1,
              limitPerIp: 5,
              ttlPerIp: 3600,
              isFaucetEnabled: true,
              isRateLimitEnabled: true,
            })
            setIsDataLoaded(true)
            // Don't show success banner on error
            setShowSuccessBanner(false)
            
            if (error instanceof Error && error.message.includes('401')) {
              toast({
                title: "Authentication Required",
                description: "Please login to access system settings",
                variant: "destructive",
              })
            } else {
              toast({
                title: "Settings Load Failed",
                description: "Using default values",
                variant: "destructive",
              })
            }
          }
      } finally {
        if (isMounted) {
          setFetchingSettings(false)
        }
      }
    }

    fetchSettings()
    
    return () => {
      isMounted = false
    }
  }, [toast])

  const handleConfigUpdate = async () => {
    setLoading(true)
    try {
      await systemAPI.updateSettings(config)

      toast({
        title: "Configuration Updated",
        description: "Faucet settings have been successfully updated.",
      })

      setHasChanges(false)
      console.log("Config updated:", config)
    } catch (error) {
      console.error("Update failed:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SystemSettings, value: string | boolean) => {
    if (typeof value === 'boolean') {
      setConfig((prev) => ({ ...prev, [field]: value }))
    } else {
      const numValue = field === "normalizedAmount" ? Number.parseFloat(value) : Number.parseInt(value)
      setConfig((prev) => ({ ...prev, [field]: numValue }))
    }
    setHasChanges(true)
  }

  const resetToDefaults = () => {
    setConfig({
      normalizedAmount: 1,
      limitPerIp: 5,
      ttlPerIp: 3600,
      isFaucetEnabled: true,
      isRateLimitEnabled: true,
    })
    setHasChanges(true)
  }

  // Show loading state until data is loaded
  if (!isDataLoaded) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <Card className="border border-[#4DA2FF]/30 bg-gradient-to-br from-[#4DA2FF]/10 to-[#4DA2FF]/5 shadow-lg">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              {/* Enhanced Spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#4DA2FF]/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#4DA2FF] rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-[#00D2D3] rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
              </div>
              
              {/* Loading Text */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Loading System Settings
                </h3>
                <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/80">
                  Fetching configuration from server...
                </p>
              </div>
              
              {/* Progress Dots */}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#4DA2FF] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#4DA2FF] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#4DA2FF] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              
              {/* Status Text */}
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                Connecting to https://sui-faucet.weminal.xyz
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Success Banner - Show briefly after loading */}
      {showSuccessBanner && (
        <Card className="border border-green-500/30 bg-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Settings Loaded Successfully</p>
                <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">
                  System configuration is ready for editing
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                Ready
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Banner */}
      {hasChanges && (
        <Card className="border-yellow-500/30 bg-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">You have unsaved changes</p>
                <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">
                  Remember to save your configuration changes
                </p>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                Unsaved
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rate Limiting Card */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5 hover:bg-[#4DA2FF]/10 transition-all duration-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4DA2FF]/20 rounded-lg">
                <Settings className="w-5 h-5 text-[#4DA2FF]" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Rate Limiting</CardTitle>
                <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">Control request frequency and abuse prevention</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="limitPerIp" className="text-gray-900 dark:text-white">IP Rate Limit (per hour)</Label>
              <Input
                id="limitPerIp"
                type="number"
                value={config.limitPerIp}
                onChange={(e) => handleInputChange("limitPerIp", e.target.value)}
                min="1"
                max="100"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Maximum requests per IP address per hour</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ttlPerIp" className="text-gray-900 dark:text-white">TTL per IP (seconds)</Label>
              <Input
                id="ttlPerIp"
                type="number"
                value={config.ttlPerIp}
                onChange={(e) => handleInputChange("ttlPerIp", e.target.value)}
                min="60"
                max="86400"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Time to live for IP restrictions (seconds)</p>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Settings Card */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5 hover:bg-[#4DA2FF]/10 transition-all duration-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4DA2FF]/20 rounded-lg">
                <Settings className="w-5 h-5 text-[#4DA2FF]" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Distribution Settings</CardTitle>
                <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">Configure token amounts and wallet limits</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="normalizedAmount" className="text-gray-900 dark:text-white">Amount per Request (SUI)</Label>
              <Input
                id="normalizedAmount"
                type="number"
                step="0.1"
                value={config.normalizedAmount}
                onChange={(e) => handleInputChange("normalizedAmount", e.target.value)}
                min="0.1"
                max="10"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">SUI tokens distributed per request</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  id="isFaucetEnabled"
                  type="checkbox"
                  checked={config.isFaucetEnabled}
                  onChange={(e) => handleInputChange("isFaucetEnabled", e.target.checked)}
                  className="rounded border-[#4DA2FF]/30 text-[#4DA2FF] focus:ring-[#4DA2FF]/20"
                />
                <Label htmlFor="isFaucetEnabled" className="text-gray-900 dark:text-white">Enable Faucet</Label>
              </div>
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Toggle faucet on/off</p>

              <div className="flex items-center space-x-2">
                <input
                  id="isRateLimitEnabled"
                  type="checkbox"
                  checked={config.isRateLimitEnabled}
                  onChange={(e) => handleInputChange("isRateLimitEnabled", e.target.checked)}
                  className="rounded border-[#4DA2FF]/30 text-[#4DA2FF] focus:ring-[#4DA2FF]/20"
                />
                <Label htmlFor="isRateLimitEnabled" className="text-gray-900 dark:text-white">Enable Rate Limiting</Label>
              </div>
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Enable IP-based rate limiting</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Configuration Summary */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Current Configuration</CardTitle>
          <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">Overview of active faucet settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.limitPerIp}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Requests per IP</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{Math.round(config.ttlPerIp / 3600)}h</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">IP TTL (hours)</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.normalizedAmount}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">SUI per request</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.isFaucetEnabled ? "ON" : "OFF"}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Faucet status</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleConfigUpdate} 
              size="large" 
              disabled={loading || !hasChanges} 
              className="flex-1 bg-[#4DA2FF] text-white hover:bg-[#4DA2FF]/80"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Updating..." : "Save Configuration"}
            </Button>

            <Button 
              size="large" 
              onClick={resetToDefaults} 
              className="flex-1 bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>

          {!hasChanges && (
            <div className="flex items-center gap-2 mt-4 text-sm text-green-400">
              <CheckCircle className="w-4 h-4" />
              Configuration is up to date
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
