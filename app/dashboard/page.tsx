'use client'

import { usePrivy, useFundWallet, useCreateWallet } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Wallet, TrendingUp, Users, Settings, Plus, Pause, Play, X, ArrowUpRight, ArrowDownRight, CreditCard, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockPositions = [
  { 
    id: '1', 
    trader: { name: 'CryptoOracle', emoji: '🔮' },
    invested: 1000,
    currentValue: 1234,
    pnl: 23.4,
    status: 'active',
    trades: 12
  },
  { 
    id: '2', 
    trader: { name: 'PoliticsWhale', emoji: '🐋' },
    invested: 500,
    currentValue: 567,
    pnl: 13.4,
    status: 'active',
    trades: 8
  },
]

const mockRecentTrades = [
  { id: '1', market: 'Trump wins 2024?', action: 'BUY YES', amount: 50, price: 0.52, time: '2 min ago', trader: 'CryptoOracle' },
  { id: '2', market: 'Fed cuts rates Dec?', action: 'BUY NO', amount: 75, price: 0.38, time: '15 min ago', trader: 'PoliticsWhale' },
  { id: '3', market: 'BTC > $100k by EOY?', action: 'BUY YES', amount: 100, price: 0.67, time: '1 hr ago', trader: 'CryptoOracle' },
]

export default function DashboardPage() {
  const { ready, authenticated, user, login } = usePrivy()
  const { fundWallet } = useFundWallet()
  const { createWallet } = useCreateWallet()
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [creatingWallet, setCreatingWallet] = useState(false)

  // Get user's embedded wallet address
  const embeddedWallet = user?.linkedAccounts?.find(
    (account) => 
      account.type === 'wallet' && 'walletClientType' in account && (account as { walletClientType: string }).walletClientType === 'privy'
  )
  const walletAddress = embeddedWallet && 'address' in embeddedWallet ? embeddedWallet.address : undefined

  // Auto-create wallet if user doesn't have one
  useEffect(() => {
    const autoCreateWallet = async () => {
      if (mounted && ready && authenticated && !walletAddress && !creatingWallet) {
        setCreatingWallet(true)
        try {
          await createWallet()
          console.log('Wallet created successfully')
        } catch (error) {
          console.error('Error creating wallet:', error)
        } finally {
          setCreatingWallet(false)
        }
      }
    }
    autoCreateWallet()
  }, [mounted, ready, authenticated, walletAddress, creatingWallet, createWallet])

  const handleFundWallet = async () => {
    if (!walletAddress) return
    try {
      await fundWallet({
        address: walletAddress,
        options: {
          chain: { id: 137 }, // Polygon
          asset: 'USDC',
        },
      })
      setShowAddFunds(false)
    } catch (error) {
      console.error('Error funding wallet:', error)
    }
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle client-side mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && ready && !authenticated) {
      login()
    }
  }, [mounted, ready, authenticated, login])

  if (!mounted || !ready || !authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const totalInvested = mockPositions.reduce((acc, p) => acc + p.invested, 0)
  const totalValue = mockPositions.reduce((acc, p) => acc + p.currentValue, 0)
  const totalPnL = ((totalValue - totalInvested) / totalInvested) * 100

  const userEmail = user?.email?.address || 'User'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {userEmail}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddFunds(true)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Wallet className="w-4 h-4" />
                Add Funds
              </button>
              <Link 
                href="/leaderboard"
                className="flex items-center gap-2 bg-white border border-gray-200 text-black px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Copy New Trader
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Wallet className="w-4 h-4" />
                Portfolio Value
              </div>
              <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
              <div className={`text-sm mt-1 flex items-center gap-1 ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalPnL >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(1)}% all time
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                Total Invested
              </div>
              <div className="text-3xl font-bold">${totalInvested.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">Across {mockPositions.length} traders</div>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Users className="w-4 h-4" />
                Active Copies
              </div>
              <div className="text-3xl font-bold">{mockPositions.filter(p => p.status === 'active').length}</div>
              <div className="text-sm text-gray-500 mt-1">{mockPositions.reduce((acc, p) => acc + p.trades, 0)} trades executed</div>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Wallet className="w-4 h-4" />
                Available Balance
              </div>
              <div className="text-3xl font-bold">$2,500</div>
              <div className="text-sm text-gray-500 mt-1">Ready to deploy</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Positions */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Active Copy Positions</h2>
                  <Link href="/leaderboard" className="text-sm text-blue-600 hover:text-blue-800">
                    + Add New
                  </Link>
                </div>
                
                {mockPositions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="font-bold mb-2">No active positions</h3>
                    <p className="text-gray-500 mb-4">Start copying a trader to see your positions here</p>
                    <Link 
                      href="/leaderboard"
                      className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 text-sm font-medium"
                    >
                      Browse Traders
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {mockPositions.map((position) => (
                      <div key={position.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
                              {position.trader.emoji}
                            </div>
                            <div>
                              <div className="font-bold">{position.trader.name}</div>
                              <div className="text-sm text-gray-500">{position.trades} trades copied</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Pause">
                              {position.status === 'active' ? (
                                <Pause className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Play className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Settings">
                              <Settings className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Invested</div>
                            <div className="font-bold">${position.invested.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Current Value</div>
                            <div className="font-bold">${position.currentValue.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">P&L</div>
                            <div className={`font-bold flex items-center gap-1 ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {position.pnl >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                              {position.pnl >= 0 ? '+' : ''}{position.pnl}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold">Recent Trades</h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {mockRecentTrades.map((trade) => (
                  <div key={trade.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium">{trade.market}</div>
                      <div className="text-xs text-gray-500">{trade.time}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className={`text-xs font-bold px-2 py-1 rounded ${
                        trade.action.includes('YES') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {trade.action}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">${trade.amount}</span>
                        <span className="text-gray-400 mx-1">@</span>
                        <span className="font-mono">{trade.price}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">via {trade.trader}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Funds Modal */}
      {mounted && showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAddFunds(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-6">Add Funds</h2>

            {/* Wallet Address Display */}
            {walletAddress && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Your Wallet Address</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono flex-1 truncate">{walletAddress}</code>
                  <button 
                    onClick={copyAddress}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Copy address"
                  >
                    {copied ? (
                      <span className="text-green-600 text-xs font-medium">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {!walletAddress && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                {creatingWallet ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                    <p className="text-sm text-yellow-800">Creating your wallet...</p>
                  </div>
                ) : (
                  <p className="text-sm text-yellow-800">
                    No wallet found. A wallet will be created automatically.
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              {/* Buy with Card via MoonPay */}
              <button 
                onClick={handleFundWallet}
                disabled={!walletAddress}
                className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Buy USDC with Card
              </button>
              <p className="text-xs text-gray-500 text-center">
                Powered by MoonPay • Supports credit/debit cards, Apple Pay, Google Pay
              </p>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Manual Transfer */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Send USDC (Polygon) directly to your wallet address above
                </p>
                <a 
                  href={`https://polygonscan.com/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  View on PolygonScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

