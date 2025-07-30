"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { authAPI } from "@/api/services"
import { useToast } from "@/hooks/use-toast"
import { LogIn, Eye, EyeOff } from "lucide-react"

interface AdminLoginProps {
  onLoginSuccess?: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await authAPI.login(username, password)
      
      toast({
        title: "Login Successful",
        description: "You are now authenticated for admin operations",
      })

      // Reset form
      setUsername("")
      setPassword("")
      
      // Call success callback
      onLoginSuccess?.()
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[#4DA2FF]/10">
            <LogIn className="w-6 h-6 text-[#4DA2FF]" />
          </div>
        </div>
        <CardTitle className="text-gray-900 dark:text-white">Admin Login</CardTitle>
        <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">
          Enter your credentials to access admin features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter admin username"
            className="text-gray-900 dark:text-white bg-white dark:bg-[#030F1C] border-[#4DA2FF]/20"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter admin password"
              className="text-gray-900 dark:text-white bg-white dark:bg-[#030F1C] border-[#4DA2FF]/20 pr-10"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#4DA2FF]"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          onClick={handleLogin}
          disabled={loading || !username || !password}
          size="large"
          className="w-full bg-[#4DA2FF] text-white hover:bg-[#011829] disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <p>Default credentials for testing:</p>
          <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
            admin / password
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 