'use client'
import React, { ReactNode, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'
import { Share2, ThumbsUp, Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import PostMinimalSkeletonLoader from '@/components/SkeletonLoader'
import BreadCrumb from '@/components/BreadCrumb'
import ProgressBar from '@/components/ProgresBar'

interface LayoutProps {
  content: CoreContent<Blog>
  children?: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  authorDetails?: { name: string; avatar?: string }[]
}

const PostMinimal = ({ content, next, prev, authorDetails, children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PostMinimalSkeletonLoader />
  }

  const { slug, title, images, date } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

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
                          width={40}
                          height={40}
                          className="inline-block rounded-full"
                        />
                      )}
                      <span className="absolute -right-1 -top-1.5">
                        <svg
                          className="h-4 w-4 fill-indigo-500"
                          viewBox="0 0 24 24"
                          aria-label="Verified account"
                        >
                          <g>
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                          </g>
                        </svg>
                      </span>
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
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-indigo-500">
                <Share2 size={18} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                <ThumbsUp size={18} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                <Download size={16} />
              </button>
            </div>{' '}
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
        </nav>{' '}
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
