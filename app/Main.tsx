import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { AlarmClockCheck, ArrowRight, Calendar } from 'lucide-react'

const MAX_DISPLAY = 5



export default function Home({ posts }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="relative mb-8">
        <h1 className="relative z-10 pb-2 text-2xl font-bold text-indigo-500 dark:text-gray-100 sm:text-3xl">
          Recent Posts
        </h1>
        <hr className="absolute bottom-0 left-0 mt-2 w-1/4 border-t border-indigo-200 dark:border-gray-700" />
      </header>
      <ul className="space-y-8">
        {!posts.length && (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags, readingTime } = post
          return (
            <li
              key={slug}
              className="border-b border-gray-200  dark:border-gray-700 dark:bg-gray-900"
            >
              <article>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
                  <Link
                    href={`/blog/${slug}`}
                    className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {title}
                  </Link>
                </h2>
                <div className="mb-4 flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlarmClockCheck size={16} />
                      <p>{readingTime.text}</p>
                    </div>
                  </div>
                </div>
                <p className="mb-6 text-base text-gray-700 dark:text-gray-300">{summary}</p>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            aria-label="All posts"
          >
            <span>All Posts</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="mt-12">
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
