'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { AlarmClockCheck } from 'lucide-react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Recent Posts</h1>
      </header>
      <ul className="space-y-6">
        {!posts.length && (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags, readingTime } = post

          return (
            <li
              key={slug}
              className="rounded-lg border border-gray-300 bg-indigo-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-sm"
            >
              <article>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {title}
                    </Link>
                  </h2>
                  <time dateTime={date} className="text-gray-500 dark:text-gray-400">
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                </div>
                <div className="mt-2 flex items-center justify-between text-gray-600 dark:text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <AlarmClockCheck size={20} />
                    <p className="text-sm">{readingTime.text}</p>
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{summary}</p>
                <div className="mt-2 flex justify-between text-base font-medium">
                  <Link
                    href={`/blog/${slug}`}
                    className="font-bold text-gray-600 hover:text-indigo-500 dark:hover:text-cyan-400"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="font-bold text-gray-700 dark:hover:text-cyan-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="mt-8 text-center">
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
