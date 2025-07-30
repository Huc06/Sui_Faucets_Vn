"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Activity, Database, RefreshCw, Bell, TrendingUp } from "lucide-react"

export function MonitoringTab() {
  const systemMetrics = [
    {
      label: "Faucet Balance",
      value: "850 SUI",
      status: "warning",
      icon: Database,
      description: "Balance below recommended threshold",
      trend: "-5.2%",
    },
    {
      label: "API Response Time",
      value: "2.3s",
      status: "good",
      icon: Activity,
      description: "Average response time is healthy",
      trend: "-12%",
    },
    {
      label: "Error Rate",
      value: "0.2%",
      status: "good",
      icon: CheckCircle,
      description: "Error rate within acceptable limits",
      trend: "-0.1%",
    },
    {
      label: "Queue Length",
      value: "0",
      status: "good",
      icon: Activity,
      description: "No pending requests in queue",
      trend: "0%",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Low Balance Warning",
      message: "Faucet balance below 1000 SUI threshold",
      timestamp: "2 hours ago",
      severity: "medium",
    },
    {
      id: 2,
      type: "success",
      title: "System Recovery",
      message: "All services restored to normal operation",
      timestamp: "5 minutes ago",
      severity: "low",
    },
    {
      id: 3,
      type: "info",
      title: "High Traffic Alert",
      message: "Request volume 20% above average for this time",
      timestamp: "1 hour ago",
      severity: "low",
    },
    {
      id: 4,
      type: "error",
      title: "Rate Limit Exceeded",
      message: "Multiple IPs hitting rate limits",
      timestamp: "3 hours ago",
      severity: "high",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/20">
            HEALTHY
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20">
            WARNING
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/20">
            ERROR
          </Badge>
        )
      default:
        return <Badge className="bg-[#4DA2FF]/20 text-[#4DA2FF] border border-[#4DA2FF]/30">{status.toUpperCase()}</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      default:
        return <CheckCircle className="w-5 h-5 text-[#4DA2FF]" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">High</Badge>
      case "medium":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Medium
          </Badge>
        )
      case "low":
        return <Badge className="bg-[#4DA2FF]/20 text-[#4DA2FF] border border-[#4DA2FF]/30">Low</Badge>
      default:
        return <Badge className="bg-[#4DA2FF]/20 text-[#4DA2FF] border border-[#4DA2FF]/30">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label} className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5 hover:bg-[#4DA2FF]/10 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      metric.status === "good"
                        ? "bg-green-500/20"
                        : metric.status === "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        metric.status === "good"
                          ? "text-green-400"
                          : metric.status === "warning"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    />
                  </div>
                  {getStatusBadge(metric.status)}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">{metric.description}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#4DA2FF]" />
                    <span className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">{metric.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Bell className="w-5 h-5 text-[#4DA2FF]" />
                  Recent Alerts
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">System notifications and warnings</CardDescription>
              </div>
              <Button size="small" className="bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/20">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <Card key={alert.id} className="p-4 border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{alert.title}</p>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70 mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-600 dark:text-[#C0E6FF]/70">{alert.timestamp}</p>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Performance Metrics</CardTitle>
            <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Uptime</p>
                  <p className="text-2xl font-bold text-green-400">99.8%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Requests/hour</p>
                  <p className="text-2xl font-bold text-[#4DA2FF]">1.2k</p>
                </div>
                <Activity className="w-8 h-8 text-[#4DA2FF]" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#C0E6FF]/70">Avg Latency</p>
                  <p className="text-2xl font-bold text-[#4DA2FF]">45ms</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#4DA2FF]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">System Actions</CardTitle>
          <CardDescription className="text-gray-600 dark:text-[#C0E6FF]/70">Quick actions for system management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="small" className="h-auto p-4 flex flex-col items-center gap-2 bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/20">
              <RefreshCw className="w-6 h-6" />
              <span>Restart Services</span>
            </Button>
            <Button size="small" className="h-auto p-4 flex flex-col items-center gap-2 bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/20">
              <Database className="w-6 h-6" />
              <span>Clear Cache</span>
            </Button>
            <Button size="small" className="h-auto p-4 flex flex-col items-center gap-2 bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/20">
              <Bell className="w-6 h-6" />
              <span>Test Alerts</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
