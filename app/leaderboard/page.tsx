'use client'

import { usePrivy } from '@privy-io/react-auth'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import { ArrowUpRight, ArrowDownRight, Search, Filter, TrendingUp, Users, BarChart3 } from 'lucide-react'

// Mock data - in production this would come from Supabase
const mockTraders = [
  { id: '1', name: 'CryptoOracle', emoji: '🔮', address: '0x82a...3f1', profit: 89.2, winRate: 82, trades: 234, followers: 1205, volume: 450000, specialty: 'Crypto' },
  { id: '2', name: 'PoliticsWhale', emoji: '🐋', address: '0x91b...2c4', profit: 67.5, winRate: 76, trades: 189, followers: 892, volume: 380000, specialty: 'Politics' },
  { id: '3', name: 'DataDriven', emoji: '📊', address: '0x73c...8d2', profit: 54.3, winRate: 71, trades: 312, followers: 654, volume: 290000, specialty: 'Economics' },
  { id: '4', name: 'AlphaHunter', emoji: '🎯', address: '0x45d...1e9', profit: 48.7, winRate: 69, trades: 156, followers: 543, volume: 210000, specialty: 'Sports' },
  { id: '5', name: 'MarketMaven', emoji: '💎', address: '0x28e...7f3', profit: 42.1, winRate: 68, trades: 278, followers: 421, volume: 185000, specialty: 'Politics' },
  { id: '6', name: 'PredictionPro', emoji: '🚀', address: '0x19f...4a8', profit: 38.9, winRate: 65, trades: 198, followers: 389, volume: 165000, specialty: 'Crypto' },
  { id: '7', name: 'TrendSpotter', emoji: '👁️', address: '0x67g...2b5', profit: 35.2, winRate: 64, trades: 145, followers: 312, volume: 142000, specialty: 'Economics' },
  { id: '8', name: 'BetaWhale', emoji: '🐳', address: '0x34h...9c1', profit: 31.8, winRate: 62, trades: 267, followers: 287, volume: 128000, specialty: 'Sports' },
]

export default function LeaderboardPage() {
  const { login, authenticated } = usePrivy()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'profit' | 'winRate' | 'followers' | 'volume'>('profit')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredTraders = mockTraders
    .filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory === 'all' || t.specialty === filterCategory)
    )
    .sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold mb-3">Top Traders</h1>
            <p className="text-gray-600 text-lg">Browse and copy the most profitable Polymarket predictors</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Users className="w-4 h-4" />
                Total Traders
              </div>
              <div className="text-2xl font-bold">156</div>
            </div>
            <div className="bg-white p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                Avg. Return
              </div>
              <div className="text-2xl font-bold text-green-600">+47.2%</div>
            </div>
            <div className="bg-white p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <BarChart3 className="w-4 h-4" />
                Total Volume
              </div>
              <div className="text-2xl font-bold">$12.4M</div>
            </div>
            <div className="bg-white p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Users className="w-4 h-4" />
                Active Copiers
              </div>
              <div className="text-2xl font-bold">2,847</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search traders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="profit">Sort by Profit</option>
                <option value="winRate">Sort by Win Rate</option>
                <option value="followers">Sort by Followers</option>
                <option value="volume">Sort by Volume</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="all">All Categories</option>
                <option value="Politics">Politics</option>
                <option value="Crypto">Crypto</option>
                <option value="Sports">Sports</option>
                <option value="Economics">Economics</option>
              </select>
            </div>
          </div>

          {/* Traders Table */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Trader</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">30d Profit</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Win Rate</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Trades</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Volume</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Followers</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTraders.map((trader, index) => (
                    <tr key={trader.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                          #{index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
                            {trader.emoji}
                          </div>
                          <div>
                            <div className="font-semibold">{trader.name}</div>
                            <div className="text-xs text-gray-500">{trader.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <ArrowUpRight className="w-4 h-4" />
                          +{trader.profit}%
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${trader.winRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{trader.winRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">{trader.trades}</td>
                      <td className="py-4 px-6 font-medium">${(trader.volume / 1000).toFixed(0)}K</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          {trader.followers}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={authenticated ? undefined : login}
                          className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          {authenticated ? 'Copy' : 'Sign Up'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

