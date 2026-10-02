import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEO({ 
  title = "Nexus | Premium Tech E-Commerce", 
  description = "Experience the future with Nexus. Shop premium, curated laptops, headphones, and modern tech accessories.", 
  image = "https://nexus-ecommerce.demo/hero.jpg", 
  url = "https://nexus-ecommerce.demo"
}: SEOProps) {
  
  const siteTitle = title.includes("Nexus") ? title : `${title} | Nexus`

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OpenGraph Metadata (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
