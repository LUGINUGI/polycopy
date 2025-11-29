import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Trader = {
  id: string
  wallet_address: string
  display_name: string
  avatar_url: string | null
  total_profit: number
  win_rate: number
  total_trades: number
  followers_count: number
  created_at: string
}

export type Pool = {
  id: string
  name: string
  description: string
  total_aum: number
  performance_30d: number
  min_investment: number
  traders: string[]
  created_at: string
}

export type CopyPosition = {
  id: string
  user_id: string
  trader_id: string | null
  pool_id: string | null
  amount_invested: number
  current_value: number
  status: 'active' | 'paused' | 'closed'
  created_at: string
}

