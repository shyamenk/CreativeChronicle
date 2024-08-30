import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'
import { Share2, ThumbsUp, Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  authorDetails?: { name: string; avatar?: string }[]
}

const PostMinimal = ({ content, next, prev, authorDetails, children }: LayoutProps) => {
  const { slug, title, images, date } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <article className="py-16">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold leading-tight">{title}</h1>
          <div className="mb-4 flex items-center text-gray-600">
            {authorDetails && authorDetails.length > 0 && (
              <div className="mr-6 flex items-center space-x-4">
                {authorDetails.map((author, index) => (
                  <div key={index} className="flex items-center">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        width={40}
                        height={40}
                        className="inline-block rounded-full"
                      />
                    )}
                    <span className="ml-2 font-semibold text-indigo-500">{author.name}</span>
                  </div>
                ))}
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center space-x-2 text-gray-600">
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
        <div className="prose mb-8 max-w-none">{children}</div>
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
