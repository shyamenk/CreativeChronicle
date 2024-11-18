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

interface LayoutProps {
  content: CoreContent<Blog>
  children?: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  authorDetails?: { name: string; avatar?: string; twitter?: string }[]
}

const PostMinimal = ({ content, next, prev, authorDetails, children }: LayoutProps) => {
  const { slug, title, images, date } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  const handleShare = () => {
    const shareTitle = `${title}`
    const shareLink = `${siteMetadata.siteUrl}/posts/${slug}`
    const formattedMessage = `${shareTitle}\n\n📖 Read More: ${shareLink} \n`
    const shareURL = `https://x.com/intent/tweet?text=${encodeURIComponent(formattedMessage)}`
    window.open(shareURL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-3xl sm:px-6 lg:px-2">
      <ProgressBar />
      <BreadCrumb />
      <article className="py-8">
        <header className="mb-8 font-serif">
          <h1 className="mb-4 font-sans text-4xl font-bold leading-tight">{title}</h1>
          <div className="mb-4 flex items-center text-gray-600">
            {authorDetails && authorDetails.length > 0 && (
              <div className="mr-6 flex items-center space-x-4">
                {authorDetails.map((author, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          width={44}
                          height={44}
                          className="inline-block rounded-full border-2 border-indigo-500 p-0.5"
                        />
                      )}
                    </div>
                    <span className="ml-2 font-sans font-bold text-indigo-500">{author.name}</span>
                  </div>
                ))}
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center space-x-2 font-sans text-gray-600">
                <Calendar size={16} />
                <time dateTime={date}>{formattedDate}</time>
              </div>
            )}
            <div className="ml-auto flex space-x-2">
              {authorDetails?.[0]?.twitter && (
                <a
                  href={`https://x.com/shyamenk07`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-indigo-500"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    aria-label="Twitter/X Profile"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>
              )}
              <button
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-indigo-500"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>
        <div className="relative mb-8 aspect-[16/9]">
          <Image
            src={displayImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="prose mb-8 max-w-none text-lg font-500">{children}</div>
        <hr className="mb-8 border-gray-200" />
        <nav className="flex items-center justify-between">
          {prev && prev.path && (
            <Link
              href={`/${prev.path}`}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ChevronLeft size={36} className="mr-2" />
              <span className="line-clamp-1">{prev.title}</span>
            </Link>
          )}

          {prev && next && <div className="mx-4 h-6 border-l-2 border-gray-500" />}

          {next && next.path && (
            <Link
              href={`/${next.path}`}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <span className="line-clamp-1">{next.title}</span>
              <ChevronRight size={36} className="ml-2" />
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
  )
}

export default PostMinimal
