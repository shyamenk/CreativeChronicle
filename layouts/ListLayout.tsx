'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import { AlarmClockCheck, Calendar } from 'lucide-react'

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
    <div className="py-8">
      <nav className="flex items-center justify-between text-gray-600 dark:text-gray-400">
        <div>
          {prevPage ? (
            <Link
              href={
                currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
              }
              rel="prev"
              className="text-indigo-500 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-500">Previous</span>
          )}
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
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
      </nav>
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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
          {title || 'Blog'}
        </h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search articles..."
          className="mb-6 w-full rounded-lg border border-indigo-300  px-4 py-2 text-gray-900 shadow-sm ring-sky-50 dark:border-[#191B28] dark:bg-[#191B28] dark:text-gray-100 dark:shadow-md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ul className="space-y-8">
          {!filteredBlogPosts.length && (
            <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
          )}
          {displayPosts.map((post) => {
            const { path, title, summary, tags, date, readingTime } = post
            return (
              <li
                key={path}
                className="rounded-lg border-b border-gray-200  py-6 dark:border-gray-700 dark:bg-gray-900"
              >
                <article className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
                      <Link
                        href={`/${path}`}
                        className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {title}
                      </Link>
                    </h2>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-gray-600 dark:text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(date, 'en-US')}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlarmClockCheck size={16} />
                        <p>{readingTime.text}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-md text-gray-700 dark:text-gray-300">{summary}</p>
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
