'use client'

import { usePrivy } from '@privy-io/react-auth'
import { ArrowRight, Check, Zap, BarChart3, Users, TrendingUp, Shield, Wallet } from "lucide-react"
import Navbar from './components/Navbar'
import Link from 'next/link'

export default function Home() {
  const { login, authenticated } = usePrivy()

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              <span>Copy the best Polymarket traders automatically</span>
            </div>
            <h1 className="text-5xl lg:text-7xl leading-[1.1] font-serif font-medium text-black mb-6">
              Automate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400">
                Polymarket Wins
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Polycopy automatically mirrors the trades of top Polymarket predictors. Pick a whale, add funds, and let their alpha become yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {authenticated ? (
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-all group"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <button 
                  onClick={login}
                  className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-all group"
                >
                  Start Copying Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
              <Link 
                href="/leaderboard"
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-black px-8 py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                View Top Traders
              </Link>
            </div>
          </div>
          
          {/* Abstract Visual */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full min-h-[400px] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-gradient-to-l from-cyan-400 via-green-400 to-yellow-300 blur-3xl opacity-20 rounded-full pointer-events-none" />
            
            {/* Floating Cards Visual */}
            <div className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end lg:pr-20">
              <div className="relative w-80 h-96 bg-white shadow-2xl border border-gray-100 p-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">🐋</div>
                  <div>
                    <div className="text-sm font-bold">PredictionKing</div>
                    <div className="text-xs text-green-600">+312% All Time</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Win Rate</span>
                    <span className="font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Trades</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Followers</span>
                    <span className="font-bold">892</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="text-xs text-green-800 font-medium mb-1">Latest Trade</div>
                  <div className="text-sm font-bold">Fed Rate Cut in Dec?</div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-500">Bought YES @ 0.62</span>
                    <span className="font-mono text-green-600">$25,000</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-black text-white p-3 text-xs font-mono shadow-lg animate-pulse">
                  ✓ Auto-copying...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-black">$2.4M+</div>
            <div className="text-sm text-gray-500 mt-1">Total Volume Copied</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">847</div>
            <div className="text-sm text-gray-500 mt-1">Active Copiers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">+67%</div>
            <div className="text-sm text-gray-500 mt-1">Avg. Copier Returns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">156</div>
            <div className="text-sm text-gray-500 mt-1">Whales Tracked</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3">How It Works</h2>
            <h3 className="text-3xl lg:text-4xl font-serif text-black">
              Start copy trading in under 2 minutes
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                step: "01",
                title: "Pick a Trader",
                desc: "Browse our leaderboard of verified top performers. Filter by win rate, volume, or market category."
              },
              {
                icon: Wallet,
                step: "02",
                title: "Add Funds",
                desc: "Connect your wallet and allocate USDC. Set your max position size and risk parameters."
              },
              {
                icon: TrendingUp,
                step: "03",
                title: "Auto-Copy",
                desc: "When your trader makes a move, we mirror it in your wallet instantly. Sit back and watch."
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all bg-white group">
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Dark */}
      <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-1 w-12 bg-blue-500 mb-6"></div>
              <h2 className="text-4xl lg:text-5xl font-serif mb-8">
                Smart Copy <br />
                Execution
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Our engine monitors Polymarket 24/7. When a tracked wallet executes a trade, Polycopy replicates it proportionally in your account within seconds.
              </p>
              
              <div className="space-y-6">
                {[
                  "Real-time trade mirroring",
                  "Proportional position sizing",
                  "Customizable risk limits",
                  "Non-custodial (your keys, your funds)"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 flex items-center justify-center text-black rounded-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <Link href="/leaderboard" className="mt-10 inline-flex items-center gap-2 border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors">
                VIEW TOP TRADERS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              {/* Visual Diagram */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 lg:p-12">
                 <div className="relative z-10 flex flex-col items-center">
                    {/* Top Node */}
                    <div className="bg-white text-black p-4 rounded shadow-lg text-center w-48">
                       <div className="font-bold">Top Trader</div>
                       <div className="text-xs text-gray-500">0x82...3a1</div>
                    </div>
                    
                    {/* Lines */}
                    <div className="h-12 w-0.5 bg-gray-700 my-2 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    </div>

                    {/* Middle Logic */}
                    <div className="bg-blue-900/30 border border-blue-800 p-6 rounded w-full max-w-sm backdrop-blur-sm">
                       <div className="flex justify-between items-center mb-4 text-sm text-blue-200">
                          <span>Trade Detected</span>
                          <span className="font-mono text-xs bg-blue-900 px-2 py-1 rounded">0.8s</span>
                       </div>
                       <div className="space-y-2">
                          <div className="h-1.5 bg-blue-500/20 rounded w-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-3/4 animate-pulse"></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Copying position...</span>
                            <span className="text-green-400">Active</span>
                          </div>
                       </div>
                    </div>

                    {/* Lines */}
                    <div className="h-12 w-0.5 bg-gray-700 my-2"></div>

                    {/* Bottom Nodes */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                       <div className="bg-gray-800 p-3 rounded border border-gray-700 text-center">
                          <div className="text-xs text-gray-400 mb-1">Your Wallet</div>
                          <div className="font-bold text-green-400">Copied ✓</div>
                       </div>
                       <div className="bg-gray-800 p-3 rounded border border-gray-700 text-center">
                          <div className="text-xs text-gray-400 mb-1">+847 others</div>
                          <div className="font-bold text-green-400">Copied ✓</div>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Decorative gradient glow behind */}
              <div className="absolute -z-10 inset-0 bg-blue-600 blur-[100px] opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Traders Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif mb-2">Top Performers This Week</h2>
              <p className="text-gray-600">The most profitable traders you can copy right now</p>
            </div>
            <Link href="/leaderboard" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View Full Leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "CryptoOracle", emoji: "🔮", profit: "+89%", winRate: "82%", trades: 234, followers: 1205 },
              { name: "PoliticsWhale", emoji: "🐋", profit: "+67%", winRate: "76%", trades: 189, followers: 892 },
              { name: "DataDriven", emoji: "📊", profit: "+54%", winRate: "71%", trades: 312, followers: 654 },
            ].map((trader, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                    {trader.emoji}
                  </div>
                  <div>
                    <div className="font-bold">{trader.name}</div>
                    <div className="text-xs text-gray-500">{trader.followers} followers</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-bold text-green-600">{trader.profit}</div>
                    <div className="text-xs text-gray-500">30d return</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Win Rate</div>
                    <div className="font-bold">{trader.winRate}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Trades</div>
                    <div className="font-bold">{trader.trades}</div>
                  </div>
                </div>
                <button 
                  onClick={authenticated ? undefined : login}
                  className="w-full mt-4 bg-black text-white py-3 text-sm font-medium group-hover:bg-blue-600 transition-colors"
                >
                  {authenticated ? 'Copy Trader' : 'Sign Up to Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-100/50 to-transparent blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl lg:text-6xl font-serif mb-8">
            Stop Guessing. <br /> Start Copying.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have automated their Polymarket strategy. Let the whales do the research—you just ride the wave.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={authenticated ? undefined : login}
               className="w-full sm:w-auto bg-black text-white px-10 py-4 text-sm font-bold hover:bg-gray-800 transition-colors"
             >
               {authenticated ? 'GO TO DASHBOARD' : 'GET STARTED FREE'}
             </button>
             <Link 
               href="/leaderboard"
               className="w-full sm:w-auto bg-white border border-black text-black px-10 py-4 text-sm font-bold hover:bg-gray-50 transition-colors text-center"
             >
               EXPLORE TRADERS
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2 mb-6">
                   <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
                     P
                   </div>
                   <span className="text-2xl font-serif font-bold">Polycopy</span>
                 </div>
                 <p className="text-gray-500 max-w-xs">
                   The smartest way to trade prediction markets. Copy the best, beat the rest.
                 </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-gray-300">PLATFORM</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li><Link href="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
                  <li><Link href="/pools" className="hover:text-white">Pools</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                  <li><a href="#" className="hover:text-white">API Access</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-gray-300">RESOURCES</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
           </div>
           
           <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
              <div>© 2024 Polycopy. All rights reserved.</div>
              <div className="flex gap-6 mt-4 md:mt-0">
                 <a href="#" className="hover:text-white">Twitter</a>
                 <a href="#" className="hover:text-white">Discord</a>
                 <a href="#" className="hover:text-white">GitHub</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  )
}
