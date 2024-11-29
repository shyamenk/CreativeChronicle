'use client'

import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'
import { Share2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import BreadCrumb from '@/components/BreadCrumb'
import ProgressBar from '@/components/ProgresBar'
import Head from 'next/head'
import { genPageMetadata } from 'app/seo'

interface LayoutProps {
  content: CoreContent<Blog>
  children?: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  authorDetails?: { name: string; avatar?: string; twitter?: string }[]
}

const PostMinimal = ({ content, next, prev, authorDetails, children }: LayoutProps) => {
  const { slug, title, images, date } = content

  const displayImage = images?.[0]
    ? `${siteMetadata.siteUrl}${images[0].startsWith('/') ? images[0] : `/${images[0]}`}`
    : `${siteMetadata.siteUrl}/static/images/site-image.png`

  const canonicalUrl = `${siteMetadata.siteUrl}/blog/${slug}`

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  const handleShare = () => {
    const shareTitle = `${title}\n\n`
    const shareLink = canonicalUrl
    const formattedMessage = `${shareTitle}📖 Read More:\n${shareLink}\n`
    const shareURL = `https://x.com/intent/tweet?text=${encodeURIComponent(formattedMessage)}`
    window.open(shareURL, '_blank', 'noopener,noreferrer')
  }

  const metadata = genPageMetadata({
    title,
    description: content.summary || siteMetadata.description,
    image: displayImage,
    url: canonicalUrl,
  })

  return (
    <>
      <Head>
        <title>{metadata.title?.toString()}</title>
        <meta name="description" content={metadata.description?.toString()} />
        <meta property="og:title" content={metadata.openGraph?.title?.toString()} />
        <meta property="og:description" content={metadata.openGraph?.description?.toString()} />
        <meta property="og:url" content={metadata.openGraph?.url?.toString()} />
        <meta property="og:image" content={metadata.openGraph?.images?.[0]?.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={metadata.twitter?.title?.toString()} />
        <meta name="twitter:description" content={metadata.twitter?.description?.toString()} />
        <meta name="twitter:image" content={metadata.twitter?.images?.[0]} />
      </Head>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ProgressBar />
        <BreadCrumb />
        <article className="py-8">
          <header className="mb-8 font-serif">
            <h1 className="mb-4 font-sans text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-4xl">
              {title}
            </h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex flex-wrap items-center space-x-4">
                {authorDetails && authorDetails.length > 0 && (
                  <div className="flex items-center space-x-2">
                    {authorDetails.map((author, index) => (
                      <div key={index} className="flex items-center">
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-indigo-500 p-0.5 dark:border-indigo-400"
                            unoptimized={!author.avatar.startsWith('/')}
                          />
                        )}
                        <span className="ml-2 font-sans font-bold text-indigo-600 dark:text-indigo-400">
                          {author.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center space-x-2 font-sans text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <time dateTime={date}>{formattedDate}</time>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {authorDetails?.[0]?.twitter && (
                  <a
                    href={`https://x.com/shyamenk07`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-indigo-100 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                    aria-label="Twitter/X Profile"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-indigo-100 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                  aria-label="Share article"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </header>
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg shadow-lg">
            <Image
              src={displayImage}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={!displayImage.startsWith(siteMetadata.siteUrl)}
            />
          </div>
          <div className="prose prose-lg mx-auto mb-8 max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
            {children}
          </div>
          <hr className="mb-8 border-gray-200 dark:border-gray-700" />
          <nav className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            {prev && prev.path && (
              <Link
                href={`/${prev.path}`}
                className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 sm:justify-end"
              >
                <ChevronLeft size={24} className="mr-2" />
                <span className="line-clamp-1 text-sm sm:text-base">{prev.title}</span>
              </Link>
            )}
            {next && next.path && (
              <Link
                href={`/${next.path}`}
                className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 sm:justify-end"
              >
                <span className="line-clamp-1 text-sm sm:text-base">{next.title}</span>
                <ChevronRight size={24} className="ml-2" />
              </Link>
            )}
          </nav>
        </article>
        {siteMetadata.comments && (
          <div className="py-8" id="comment">
            <Comments slug={slug} />
          </div>
        )}
      </div>
    </>
  )
}

export default PostMinimal
