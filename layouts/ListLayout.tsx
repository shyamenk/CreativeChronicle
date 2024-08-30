'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import { AlarmClockCheck, Calendar, Search } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex items-center justify-between py-8 text-gray-600 dark:text-gray-400">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="text-indigo-500 hover:underline"
        >
          Previous
        </Link>
      ) : (
        <span className="cursor-not-allowed text-gray-500">Previous</span>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="text-indigo-500 hover:underline"
        >
          Next
        </Link>
      ) : (
        <span className="cursor-not-allowed text-gray-500">Next</span>
      )}
    </div>
  )
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
  title,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className="mx-auto max-w-3xl py-6">
      <header className="mb-16">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </header>
      <main>
        <ul className="space-y-8">
          {!filteredBlogPosts.length && (
            <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
          )}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags, readingTime } = post
            return (
              <li key={path} className="border-b border-gray-200 pb-8 dark:border-gray-700">
                <article>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    <Link
                      href={`/${path}`}
                      className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {title}
                    </Link>
                  </h2>
                  <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </div>
                    <div className="flex items-center">
                      <AlarmClockCheck size={14} className="mr-1" />
                      <span>{readingTime.text}</span>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </main>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
