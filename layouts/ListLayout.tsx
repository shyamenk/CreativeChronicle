'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

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
      <nav className="flex items-center justify-between">
        <div>
          {prevPage ? (
            <Link
              href={
                currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
              }
              rel="prev"
              className="text-md text-cyan-600 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-500">Previous</span>
          )}
        </div>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          {nextPage ? (
            <Link
              href={`/${basePath}/page/${currentPage + 1}`}
              rel="next"
              className="text-md text-cyan-600 hover:underline"
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
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{title || 'Blog'}</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search posts..."
          className="mb-6 w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-gray-900 shadow-sm dark:border-[#191B28] dark:bg-[#191B28] dark:text-gray-100 dark:shadow-md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ul className="space-y-6">
          {!filteredBlogPosts.length && <p className="text-gray-500">No posts found.</p>}
          {displayPosts.map((post) => {
            const { path, title, summary, tags } = post
            return (
              <li
                key={path}
                className="rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-[#191B28] dark:shadow-md"
              >
                <article>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    <Link href={`/${path}`}>{title}</Link>
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                  </div>
                  <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{summary}</p>{' '}
                  {/* Increased font size */}
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
