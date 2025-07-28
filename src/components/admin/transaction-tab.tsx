"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Copy, Filter, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Transaction {
  id: number
  address: string
  amount: number
  timestamp: string
  txHash: string
  status: string
}

interface TransactionsTabProps {
  transactions: Transaction[]
}

export function TransactionsTab({ transactions }: TransactionsTabProps) {
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/20">
            SUCCESS
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/20">
            FAILED
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20">
            PENDING
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#4DA2FF]/20 text-[#4DA2FF] border border-[#4DA2FF]/30">
            {status.toUpperCase()}
          </Badge>
        )
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  const handleViewTransaction = (txHash: string) => {
    window.open(`https://suiexplorer.com/txblock/${txHash}?network=testnet`, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-[#C0E6FF]">Latest faucet requests and their status</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="small" className="bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/20 hover:bg-[#4DA2FF]/20">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="small" className="bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/20 hover:bg-[#4DA2FF]/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Transaction Cards */}
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx.id} className="border border-[#4DA2FF]/20 bg-[#4DA2FF]/5 hover:bg-[#4DA2FF]/10 transition-all duration-200">
            <CardContent className="p-6">
              {/* Transaction Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction #{tx.id}</h3>
                {getStatusBadge(tx.status)}
              </div>

              {/* Transaction Hash with Action Buttons */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 dark:text-[#C0E6FF] font-mono text-sm break-all flex-1 mr-4">{tx.txHash}</p>
                <div className="flex gap-2 flex-shrink-0">
                  <Button 
                    size="small" 
                    onClick={() => copyToClipboard(tx.txHash, "Transaction Hash")}
                    className="bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/20 hover:bg-[#4DA2FF]/20"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Hash
                  </Button>
                  {tx.status === "success" && (
                    <Button 
                      size="small" 
                      onClick={() => handleViewTransaction(tx.txHash)}
                      className="bg-[#4DA2FF]/10 text-[#4DA2FF] border border-[#4DA2FF]/20 hover:bg-[#4DA2FF]/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </div>

              {/* Horizontal Separator */}
              <hr className="border-[#4DA2FF]/20 mb-4" />

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-[#C0E6FF]/70 mb-1">Recipient</p>
                  <p className="font-mono text-sm break-all text-gray-900 dark:text-white">
                    {tx.address.slice(0, 10)}...{tx.address.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-[#C0E6FF]/70 mb-1">Amount</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{tx.amount} SUI</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-[#C0E6FF]/70 mb-1">Timestamp</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(tx.timestamp).toLocaleString('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                      day: '2-digit',
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button size="large" className="bg-[#4DA2FF] text-white hover:bg-[#4DA2FF]/80">
          Load More Transactions
        </Button>
      </div>
    </div>
  )
}
