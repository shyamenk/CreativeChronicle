import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { AlarmClockCheck, ArrowRight, Calendar } from 'lucide-react'
import IntroComponent from '@/components/intro'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="mx-auto max-w-3xl  py-6">
      <header className="mb-10">
        <IntroComponent />
      </header>
      <div className="mb-8">
        <div className="space-y-2 pb-6 pt-4">
          <h1 className="gradient-text border-b pb-2 text-4xl font-extrabold leading-tight text-transparent sm:text-6xl sm:leading-tight">
            Recent Articles
          </h1>
        </div>
        <ul className="space-y-8">
          {!posts.length && (
            <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, readingTime } = post
            return (
              <li key={slug} className="border-b border-gray-200 pb-8 dark:border-gray-700">
                <article>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    <Link
                      href={`/blog/${slug}`}
                      className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {title}
                    </Link>
                  </h3>
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
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-md font-medium text-gray-600 transition-colors dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            aria-label="All posts"
          >
            <span>See all posts</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="mt-16 rounded-lg bg-gray-100 p-6 dark:bg-indigo-900">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            Stay updated with Backend Almanac
          </h2>
          <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
            Get <strong>practical tips</strong> on <strong>Linux</strong>, <strong>AWS</strong>,{' '}
            <strong>Docker</strong>, and more delivered to your inbox.
            <strong>Streamline your workflow</strong> and <strong>save development time</strong>.
          </p>
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
