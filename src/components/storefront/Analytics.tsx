import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function Analytics() {
  const location = useLocation()

  useEffect(() => {
    // 1. Google Analytics integration wrapper
    // In production, window.gtag will be defined by the script tag in index.html
    const handlePageView = (url: string) => {
      // @ts-ignore
      if (typeof window.gtag !== 'undefined') {
        // @ts-ignore
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: url,
        })
      }
    }

    // 2. Meta Pixel integration wrapper
    const handleMetaPixel = (url: string) => {
      // @ts-ignore
      if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        window.fbq('track', 'PageView')
      }
    }

    handlePageView(location.pathname + location.search)
    handleMetaPixel(location.pathname + location.search)
    
  }, [location])

  return null
}
