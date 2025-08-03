"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Alert component inline since we don't have it in UI
import { Lock, User, AlertCircle, CheckCircle } from "lucide-react"
import { authAPI } from "@/api/services"
import { useToast } from "@/hooks/use-toast"
import suiVideo from "@/assets/sui-video-1.mp4"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password")
      return
    }

    setLoading(true)
    setError("")

    try {
      await authAPI.login(username.trim(), password)
      
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      })
      
      // Call the success callback to show the dashboard
      onLoginSuccess()
      
    } catch (error) {
      console.error("Login failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      setError(errorMessage)
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-end pb-8 py-4 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Background video */}
      <video
        src={suiVideo}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />

      {/* Login form container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-[#011829]/90 dark:bg-[#011829]/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-2xl border border-[#4DA2FF]/20">
          
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-[#4DA2FF]/20 border border-[#4DA2FF]/30">
                  <Lock className="h-8 w-8 text-[#4DA2FF]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Admin Login
              </CardTitle>
              <CardDescription className="text-[#C0E6FF]">
                Sign in to access the Sui Faucet admin dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <div className="border border-red-500/50 bg-red-500/10 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-red-300 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="pl-10 bg-white/10 border-[#4DA2FF]/30 text-white placeholder:text-gray-400 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 bg-white/10 border-[#4DA2FF]/30 text-white placeholder:text-gray-400 focus:border-[#4DA2FF] focus:ring-[#4DA2FF]/20"
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  size="large"
                  disabled={loading}
                  className="w-full bg-[#4DA2FF] text-white hover:bg-[#011829] transition-colors duration-200 font-medium py-3"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

                             {/* Demo credentials hint */}
               <div className="mt-6 p-4 rounded-lg bg-[#4DA2FF]/10 border border-[#4DA2FF]/20">
                 <p className="text-xs text-[#C0E6FF] text-center">
                   <strong>Demo Credentials:</strong><br />
                   Username: <code className="bg-[#011829]/50 px-1 rounded">admin</code><br />
                   Password: <code className="bg-[#011829]/50 px-1 rounded">admin</code>
                 </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 