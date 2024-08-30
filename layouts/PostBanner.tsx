import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

const PostMinimal = ({ content, next, prev, children }: LayoutProps) => {
  const { slug, title, images, date, authors } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <article className="py-16">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          <div className="mb-4 text-gray-600">
            {authors && <span className="mr-4">{authors}</span>}
            {date && <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>}
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
        <div className="prose max-w-none">{children}</div>
      </article>

      {siteMetadata.comments && (
        <div className="py-8" id="comment">
          <Comments slug={slug} />
        </div>
      )}

      <nav className="flex justify-between border-t border-gray-200 py-8">
        {prev && prev.path && (
          <Link href={`/${prev.path}`} className="text-indigo-600 hover:text-indigo-800">
            ← {prev.title}
          </Link>
        )}
        {next && next.path && (
          <Link href={`/${next.path}`} className="ml-auto text-indigo-600 hover:text-indigo-800">
            {next.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default PostMinimal
