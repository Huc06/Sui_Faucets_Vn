import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginDialogProps {
  onClose?: () => void
  onSwitchToSignup?: () => void
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", formData)
    // Handle login logic here
    onClose?.()
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex">
        {/* Left Side - Promotional Content */}
        <div className="flex-1 bg-gradient-to-br from-[#4DA2FF] via-[#4DA2FF] to-[#011829] p-8 flex flex-col justify-between text-white relative overflow-hidden hidden md:flex min-h-[600px]">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-3xl transform rotate-12"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-2xl transform -rotate-12"></div>
            <div className="absolute bottom-32 left-16 w-40 h-40 bg-white rounded-3xl transform rotate-45"></div>
            <div className="absolute top-60 left-40 w-16 h-16 bg-white rounded-xl transform rotate-30"></div>
          </div>

          <div className="relative z-10 flex-1">
            {/* SUI Logo */}
            <div className="flex items-center gap-2 mb-16">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#C0E6FF] to-[#4DA2FF] rounded-full mr-2"></div>
                <span className="text-2xl font-bold tracking-wide">SUI</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-12 leading-tight">
                WELCOME BACK TO SUI NETWORK
              </h1>

              {/* 3D Geometric Illustration */}
              <div className="my-16 flex justify-center">
                <div className="relative w-80 h-60">
                  {/* Main geometric shape */}
                  <div className="absolute top-8 left-8 w-48 h-36 bg-gradient-to-br from-[#C0E6FF]/80 to-[#4DA2FF]/80 rounded-3xl transform rotate-12 shadow-2xl"></div>

                  {/* Secondary shapes */}
                  <div className="absolute top-0 left-0 w-32 h-24 bg-gradient-to-br from-[#C0E6FF]/70 to-[#4DA2FF]/70 rounded-2xl transform -rotate-12 shadow-xl"></div>
                  <div className="absolute bottom-4 right-0 w-28 h-20 bg-gradient-to-br from-[#4DA2FF]/70 to-[#011829]/70 rounded-xl transform rotate-45 shadow-xl"></div>
                  <div className="absolute top-16 right-8 w-20 h-16 bg-gradient-to-br from-[#C0E6FF]/60 to-[#4DA2FF]/60 rounded-lg transform -rotate-30 shadow-lg"></div>

                  {/* Small accent shapes */}
                  <div className="absolute bottom-12 left-4 w-12 h-12 bg-gradient-to-br from-[#C0E6FF]/50 to-[#4DA2FF]/50 rounded-full shadow-md"></div>
                  <div className="absolute top-4 right-16 w-8 h-8 bg-gradient-to-br from-[#4DA2FF]/50 to-[#011829]/50 rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm opacity-90 max-w-md mt-auto pb-4">
            <p className="leading-relaxed">
              Continue your journey in the Sui ecosystem with fast, secure, and scalable blockchain technology.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 bg-white p-8 flex flex-col relative">
          {/* Top Right Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {/* Switch to Sign Up Button */}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="px-3 py-1 text-sm text-[#4DA2FF] hover:text-[#011829] hover:bg-[#4DA2FF]/5 rounded-md transition-colors font-medium"
            >
              Sign up
            </button>
            
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              ×
            </button>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-[#4DA2FF] to-[#011829] rounded-full"></div>
              <span className="text-xl font-bold text-gray-800">SUI</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your Sui account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-4 mb-6">
                <button
                  type="button"
                  className="w-full h-12 border border-[#4DA2FF]/20 hover:border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/5 transition-colors bg-transparent rounded-md flex items-center justify-center text-gray-800"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="w-full h-12 border border-[#4DA2FF]/20 hover:border-[#4DA2FF]/30 hover:bg-[#4DA2FF]/5 transition-colors bg-transparent rounded-md flex items-center justify-center text-gray-800"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="text-center text-gray-400 mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-4">Or</div>
              </div>

              {/* Email and Password Form */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium block mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 border-gray-200 focus:border-[#4DA2FF] focus:ring-[#4DA2FF] text-gray-800"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium block mb-2">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-12 border-gray-200 focus:border-[#4DA2FF] focus:ring-[#4DA2FF] pr-12 text-gray-800"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent border-none bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-[#4DA2FF] hover:text-[#011829] hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#4DA2FF] to-[#011829] hover:from-[#4DA2FF]/90 hover:to-[#011829]/90 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isFormValid}
                >
                  Sign In
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Don't have a Sui account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToSignup}
                      className="text-[#4DA2FF] hover:text-[#011829] hover:underline font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
