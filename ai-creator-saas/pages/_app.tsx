import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'

// Pages that don't require authentication
const publicPages = ['/', '/login', '/signup']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything on the server side
  if (!isClient) {
    return null
  }

  const isPublicPage = publicPages.includes(router.pathname)

  return (
    <div className="min-h-screen bg-dark-bg">
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      )}
    </div>
  )
}
