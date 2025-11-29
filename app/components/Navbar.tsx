'use client'

import { usePrivy } from '@privy-io/react-auth'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const displayName = user?.email?.address || 
    user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4) ||
    'User'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-serif font-bold tracking-tight">Polycopy</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/leaderboard" className="hover:text-black transition-colors">Leaderboard</Link>
          <Link href="/pools" className="hover:text-black transition-colors">Pools</Link>
          {authenticated && (
            <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
          )}
          <Link href="#how-it-works" className="hover:text-black transition-colors">How it Works</Link>
        </div>

        <div className="flex items-center gap-4">
          {ready && !authenticated && (
            <>
              <button 
                onClick={login}
                className="hidden md:block text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={login}
                className="bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Start Copying
              </button>
            </>
          )}
          
          {ready && authenticated && (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="hidden md:block text-sm font-medium text-gray-600 hover:text-black"
              >
                {displayName}
              </Link>
              <button 
                onClick={logout}
                className="bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-4">
          <Link href="/leaderboard" className="block text-sm font-medium text-gray-600 hover:text-black">
            Leaderboard
          </Link>
          <Link href="/pools" className="block text-sm font-medium text-gray-600 hover:text-black">
            Pools
          </Link>
          {authenticated && (
            <Link href="/dashboard" className="block text-sm font-medium text-gray-600 hover:text-black">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

