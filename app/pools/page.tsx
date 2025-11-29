'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Users, TrendingUp, Wallet, ArrowUpRight, Shield, Zap, BarChart3 } from 'lucide-react'

// Mock data
const mockPools = [
  {
    id: '1',
    name: 'Alpha Politics Pool',
    description: 'Top 5 political market traders combined. Diversified exposure to election and policy markets.',
    aum: 450000,
    performance30d: 34.2,
    minInvestment: 100,
    traders: ['CryptoOracle', 'PoliticsWhale', 'DataDriven'],
    risk: 'Medium',
    category: 'Politics'
  },
  {
    id: '2',
    name: 'Crypto Momentum Fund',
    description: 'Aggressive crypto-focused pool tracking BTC, ETH, and altcoin prediction markets.',
    aum: 320000,
    performance30d: 52.8,
    minInvestment: 250,
    traders: ['CryptoOracle', 'AlphaHunter'],
    risk: 'High',
    category: 'Crypto'
  },
  {
    id: '3',
    name: 'Conservative Blend',
    description: 'Lower volatility pool focused on high-probability outcomes across all categories.',
    aum: 680000,
    performance30d: 18.5,
    minInvestment: 50,
    traders: ['DataDriven', 'MarketMaven', 'TrendSpotter'],
    risk: 'Low',
    category: 'Mixed'
  },
  {
    id: '4',
    name: 'Sports Insider',
    description: 'Sports betting specialists with proven track records in major leagues.',
    aum: 210000,
    performance30d: 28.9,
    minInvestment: 100,
    traders: ['BetaWhale', 'AlphaHunter'],
    risk: 'Medium',
    category: 'Sports'
  },
]

export default function PoolsPage() {
  const { login, authenticated } = usePrivy()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPools = mockPools.filter(
    pool => selectedCategory === 'all' || pool.category === selectedCategory
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'High': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold mb-3">Trading Pools</h1>
            <p className="text-gray-600 text-lg">Diversified exposure to multiple top traders in a single investment</p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Diversified Risk</h3>
                <p className="text-sm text-gray-600">Spread your investment across multiple proven traders</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Auto-Rebalancing</h3>
                <p className="text-sm text-gray-600">Pools automatically adjust to optimize performance</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Curated Selection</h3>
                <p className="text-sm text-gray-600">Only top-performing traders make it into pools</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['all', 'Politics', 'Crypto', 'Sports', 'Mixed'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'All Pools' : category}
              </button>
            ))}
          </div>

          {/* Pools Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPools.map((pool) => (
              <div key={pool.id} className="bg-white border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pool.name}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getRiskColor(pool.risk)}`}>
                        {pool.risk} Risk
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-5 h-5" />
                        +{pool.performance30d}%
                      </div>
                      <div className="text-xs text-gray-500">30d return</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6">{pool.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">AUM</div>
                      <div className="font-bold">${(pool.aum / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Min. Investment</div>
                      <div className="font-bold">${pool.minInvestment}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Traders</div>
                      <div className="font-bold">{pool.traders.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs text-gray-500">Includes:</span>
                    <div className="flex flex-wrap gap-1">
                      {pool.traders.map((trader, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {trader}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={authenticated ? undefined : login}
                    className="w-full bg-black text-white py-3 font-medium hover:bg-blue-600 transition-colors"
                  >
                    {authenticated ? 'Invest in Pool' : 'Sign Up to Invest'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

