import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Droplet, ThumbsUp, FileText, Copy, LinkIcon, Code, PenToolIcon as Tool, Wallet } from "lucide-react"
import { useState, useEffect } from "react"
import { useDialogStore } from "@/store"
import { ConnectWalletDialog } from "@/components/dialog/connect-wallet-dialog"
import { useWallet } from "@suiet/wallet-kit"
import suiVideo from "@/assets/sui-video-1.mp4"

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { open } = useDialogStore()
  const { connected } = useWallet()

  // Listen for wallet connection changes
  useEffect(() => {
    if (connected) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [connected])

  const handleLogin = () => {
    open(<ConnectWalletDialog />)
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
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-24">
        {/* Gray wrapper around all sections */}
        <div className="bg-[#011829]/80 dark:bg-[#011829]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Section 1: Sui Testnet SUI Faucet Claim */}
        <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#C0E6FF] dark:bg-[#011829] relative z-10">
            <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-[#4DA2FF] dark:text-[#C0E6FF]" />
          </div>
          {/* Connecting line from Section 1 to Section 2 */}
          <div className="absolute left-4 sm:left-5 top-8 sm:top-10 w-px h-32 sm:h-40 md:h-48 bg-[#C0E6FF] dark:bg-[#4DA2FF] z-0"></div>
          <div className="flex-1 w-full">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">
              Sui Testnet Faucet - Get Free SUI Tokens
            </h1>
            <div className="relative rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-md dark:bg-[#030F1C] min-h-[140px] sm:min-h-[160px]">
              <form className="space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_2fr_1fr]">
                  <div className="space-y-2 p-3 rounded-lg dark:bg-[#011829]/50 hover:bg-[#4DA2FF]/5 dark:hover:bg-[#4DA2FF]/10 transition-colors duration-200">
                    <label
                      htmlFor="network"
                      className="text-sm font-medium leading-none text-black dark:text-black"
                    >
                      Select Network
                    </label>
                    <Select defaultValue="devnet">
                      <SelectTrigger id="network" className="w-full h-9 bg-white/50 dark:bg-[#030F1C]/50 border-[#C0E6FF]/30 dark:border-[#011829]/30 text-black/70 dark:text-white/70 hover:bg-[#4DA2FF]/5 dark:hover:bg-[#4DA2FF]/10 hover:border-[#4DA2FF]/50 dark:hover:border-[#4DA2FF]/50 transition-colors duration-200">
                        <SelectValue placeholder="Select Network" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 dark:bg-[#030F1C]/90 backdrop-blur-sm">
                        <SelectItem value="devnet" className="text-black/70 dark:text-white/70">Devnet</SelectItem>
                        <SelectItem value="testnet" className="text-black/70 dark:text-white/70">Testnet</SelectItem>
                        <SelectItem value="mainnet" className="text-black/70 dark:text-white/70">Mainnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 p-3 rounded-lg dark:bg-[#4DA2FF]/10">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium leading-none text-black dark:text-white font-semibold"
                    >
                      Wallet Address
                    </label>
                    <Input 
                      id="address" 
                      placeholder="Enter your Sui wallet address (0x...)" 
                      className="h-9 text-sm bg-white dark:bg-[#030F1C] border-2 border-[#4DA2FF] dark:border-[#C0E6FF] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-[#4DA2FF]/50 hover:bg-[#4DA2FF]/5 dark:hover:bg-[#4DA2FF]/10 hover:border-[#4DA2FF] dark:hover:border-[#4DA2FF] transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2 p-3 rounded-lg">
                    <label className="text-sm font-medium leading-none text-transparent">
                      &nbsp;
                    </label>
                    <button 
                      type="button"
                      className="w-full bg-[#4DA2FF] text-white shadow-md hover:bg-[#011829] dark:bg-[#4DA2FF] dark:hover:bg-[#011829] text-sm h-9 font-medium border-0 rounded-md px-3 transition-colors duration-200 cursor-pointer flex items-center justify-center"
                    >
                      Get 1.0 SUI
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Section 2: Sui RPC Access */}
        <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#C0E6FF] dark:bg-[#011829] relative z-10">
            <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#4DA2FF] dark:text-[#C0E6FF]" />
          </div>
          {/* Connecting line from Section 2 to Section 3 */}
          <div className={`absolute left-4 sm:left-5 top-8 sm:top-10 w-px bg-[#C0E6FF] dark:bg-[#4DA2FF] z-0 ${isLoggedIn ? 'h-56 sm:h-60 md:h-99' : 'h-32 sm:h-40 md:h-48'}`}></div>
          <div className="flex-1 w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">Sui Network RPC Endpoints</h2>
            <div className="relative rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-md dark:bg-[#030F1C] min-h-[140px] sm:min-h-[160px]">
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
                {!isLoggedIn ? (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-[#011829] dark:text-[#C0E6FF] mb-4">
                      Connect your wallet to access Sui network RPC endpoints and developer tools
                    </p>
                    <Button 
                      size="large"
                      className="bg-[#4DA2FF] text-white shadow-md hover:bg-[#011829] dark:bg-[#4DA2FF] dark:hover:bg-[#011829] text-sm px-6 py-3 font-medium"
                      onClick={handleLogin}
                    >
                       Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-[#011829] dark:text-[#C0E6FF]">
                      <a href="https://docs.sui.io/references/sui-api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline hover:text-[#4DA2FF]">
                        <LinkIcon className="h-4 w-4" /> API Documentation
                      </a>
                      <div className="h-4 w-px bg-[#C0E6FF] dark:bg-[#011829]" />
                      <Button 
                        size="small"
                        className="flex items-center gap-1 hover:underline text-sm px-3 py-1"
                      >
                        <Code className="h-4 w-4" /> Code Examples
                      </Button>
                      <div className="h-4 w-px bg-[#C0E6FF] dark:bg-[#011829]" />
                      <a href="https://sdk.mystenlabs.com/typescript" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline hover:text-[#4DA2FF]">
                        <Tool className="h-4 w-4" /> SDK
                      </a>
                      <div className="h-4 w-px bg-[#C0E6FF] dark:bg-[#011829]" />
                      <Button 
                        size="small"
                        className="flex items-center gap-1 hover:underline text-sm px-3 py-1"
                      >
                        <Wallet className="h-4 w-4" /> Wallet Integration
                      </Button>
                    </div>
                    <div className="w-full space-y-4">
                      <h3 className="text-center font-semibold text-[#011829] dark:text-[#C0E6FF] mb-3">
                        Available RPC Endpoints
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-md bg-[#C0E6FF] p-3 dark:bg-[#011829]">
                          <div className="flex-1">
                            <span className="font-semibold text-sm text-[#011829] dark:text-[#C0E6FF] block">Devnet HTTPS</span>
                            <span className="text-xs text-[#011829] dark:text-[#C0E6FF] opacity-80">For development and testing</span>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm text-[#011829] dark:text-[#C0E6FF] break-all font-mono bg-white dark:bg-[#030F1C] px-2 py-1 rounded">
                              https://fullnode.devnet.sui.io:443
                            </span>
                            <Button 
                              size="small"
                              className="text-[#4DA2FF] hover:text-[#011829] px-2 py-1 bg-white dark:bg-[#030F1C]"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-md bg-[#C0E6FF] p-3 dark:bg-[#011829]">
                          <div className="flex-1">
                            <span className="font-semibold text-sm text-[#011829] dark:text-[#C0E6FF] block">Testnet HTTPS</span>
                            <span className="text-xs text-[#011829] dark:text-[#C0E6FF] opacity-80">For staging and testing</span>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm text-[#011829] dark:text-[#C0E6FF] break-all font-mono bg-white dark:bg-[#030F1C] px-2 py-1 rounded">
                              https://fullnode.testnet.sui.io:443
                            </span>
                            <Button 
                              size="small"
                              className="text-[#4DA2FF] hover:text-[#011829] px-2 py-1 bg-white dark:bg-[#030F1C]"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-md bg-[#C0E6FF] p-3 dark:bg-[#011829]">
                          <div className="flex-1">
                            <span className="font-semibold text-sm text-[#011829] dark:text-[#C0E6FF] block">Mainnet HTTPS</span>
                            <span className="text-xs text-[#011829] dark:text-[#C0E6FF] opacity-80">For production applications</span>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm text-[#011829] dark:text-[#C0E6FF] break-all font-mono bg-white dark:bg-[#030F1C] px-2 py-1 rounded">
                              https://fullnode.mainnet.sui.io:443
                            </span>
                            <Button 
                              size="small"
                              className="text-[#4DA2FF] hover:text-[#011829] px-2 py-1 bg-white dark:bg-[#030F1C]"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: claim more faucets */}
        <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#C0E6FF] dark:bg-[#011829] relative z-10">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#4DA2FF] dark:text-[#C0E6FF]" />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">claim more faucets</h2>
            <div className="rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-md dark:bg-[#030F1C] min-h-[140px] sm:min-h-[160px]">
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3 flex-1">
                  <p className="text-base font-semibold text-[#011829] dark:text-[#C0E6FF]">
                    Testnet tokens sent increased by 0.01 Sui{" "}
                    <Badge
                      variant="outline"
                      className="bg-[#C0E6FF] text-[#011829] dark:bg-[#011829] dark:text-[#C0E6FF] text-xs ml-2"
                    >
                      Activity time: long-term
                    </Badge>
                  </p>
                  <p className="text-sm text-[#011829] dark:text-[#C0E6FF] leading-relaxed">
                    Join the{" "}
                    <a
                      href="https://discord.gg/y4fSbkev"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4DA2FF] underline hover:text-[#011829] dark:text-[#C0E6FF] dark:hover:text-[#4DA2FF] font-medium"
                    >
                      First Mover Discord server
                    </a>
                    , go to the <span className="font-mono bg-[#C0E6FF] dark:bg-[#011829] px-1 py-0.5 rounded text-xs">"WELCOME TO SUI" - "verify"</span> channel, and pass the verification to claim more Sui Faucets.
                  </p>
                </div>
                <button 
                  type="button"
                  className="shrink-0 w-full sm:w-auto bg-[#4DA2FF] text-white shadow-md hover:bg-[#011829] dark:bg-[#4DA2FF] dark:hover:bg-[#011829] text-sm px-6 py-3 font-medium rounded-md border-0 cursor-pointer transition-colors duration-200"
                  onClick={() => window.open('https://discord.gg/y4fSbkev', '_blank')}
                >
                  Join First Mover
                </button>
              </div>
            </div>
          </div>
        </div>
        </div> {/* End of gray wrapper */}
      </div>
    </div>
  )
}

export default HomePage
