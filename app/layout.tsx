import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import { Open_Sans } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    creator: siteMetadata.twitter,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={`${openSans.variable} relative bg-gradient-to-b from-gray-50 via-indigo-50/10 to-white pl-[calc(100vw-100%)] font-sans text-black antialiased`}
      >
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient Orb */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* <div className="animate-slow-spin h-[45vh] w-[45vh] rounded-full bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-pink-400/20 blur-3xl md:h-[50vh] md:w-[50vh]" /> */}
          </div>

          {/* Floating Elements */}
          {/* <div className="absolute inset-0"> */}
          {/*   <div className="animate-float absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-indigo-400/20 blur-xl" /> */}
          {/*   <div className="animate-float-delayed absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-purple-400/20 blur-xl" /> */}
          {/* </div> */}

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
        </div>

        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="relative flex min-h-screen flex-col justify-between">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="e742e652-bd05-48b4-9a51-7f3e442980b1"
          defer
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
