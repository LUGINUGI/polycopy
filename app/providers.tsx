'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  if (!privyAppId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-gray-600">NEXT_PUBLIC_PRIVY_APP_ID environment variable is not set.</p>
        </div>
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'light',
          accentColor: '#2563eb',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'all-users',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}

