"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FaucetConfig {
  rateLimit: number
  walletLimit: number
  amount: number
  maxBalance: number
}

export function SettingsTab() {
  const [config, setConfig] = useState<FaucetConfig>({
    rateLimit: 5,
    walletLimit: 1,
    amount: 1,
    maxBalance: 1000,
  })
  const [loading, setLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  const handleConfigUpdate = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configuration Updated",
        description: "Faucet settings have been successfully updated.",
      })

      setHasChanges(false)
      console.log("Config updated:", config)
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FaucetConfig, value: string) => {
    const numValue = field === "amount" ? Number.parseFloat(value) : Number.parseInt(value)
    setConfig((prev) => ({ ...prev, [field]: numValue }))
    setHasChanges(true)
  }

  const resetToDefaults = () => {
    setConfig({
      rateLimit: 5,
      walletLimit: 1,
      amount: 1,
      maxBalance: 1000,
    })
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
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
              <Label htmlFor="rateLimit" className="text-gray-900 dark:text-white">IP Rate Limit (per hour)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={config.rateLimit}
                onChange={(e) => handleInputChange("rateLimit", e.target.value)}
                min="1"
                max="100"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Maximum requests per IP address per hour</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletLimit" className="text-gray-900 dark:text-white">Wallet Limit (per day)</Label>
              <Input
                id="walletLimit"
                type="number"
                value={config.walletLimit}
                onChange={(e) => handleInputChange("walletLimit", e.target.value)}
                min="1"
                max="10"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Maximum requests per wallet per day</p>
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
              <Label htmlFor="amount" className="text-gray-900 dark:text-white">Amount per Request (SUI)</Label>
              <Input
                id="amount"
                type="number"
                step="0.1"
                value={config.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                min="0.1"
                max="10"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">SUI tokens distributed per request</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBalance" className="text-gray-900 dark:text-white">Max Faucet Balance (SUI)</Label>
              <Input
                id="maxBalance"
                type="number"
                value={config.maxBalance}
                onChange={(e) => handleInputChange("maxBalance", e.target.value)}
                min="100"
                max="10000"
                className="border-[#4DA2FF]/30 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20 text-gray-900 dark:text-white bg-white dark:bg-[#030F1C]"
              />
              <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">Maximum balance to maintain in faucet wallet</p>
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
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.rateLimit}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Requests/hour per IP</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.walletLimit}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Requests/day per wallet</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.amount}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">SUI per request</p>
            </div>
            <div className="text-center p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
              <p className="text-2xl font-bold text-[#4DA2FF]">{config.maxBalance}</p>
              <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Max balance (SUI)</p>
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
