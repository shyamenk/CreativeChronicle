import React from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { AlarmClockCheck, ArrowRight, Calendar, ChevronRight } from 'lucide-react'
import Intro from '@/components/intro'
import { getContextualBlurDataURL } from '@/lib/image-utils'

const MAX_DISPLAY = 6

const Card = ({ children, className = '' }) => (
  <div
    className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500 dark:hover:shadow-indigo-500/10 ${className}`}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
)

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-gray-200 p-4 dark:border-gray-700 ${className}`}>{children}</div>
)

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-400 dark:to-purple-500 dark:text-gray-900 dark:hover:from-indigo-500 dark:hover:to-purple-600 dark:focus:ring-offset-gray-900 ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <Intro />
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          Recent Articles
        </h2>
        {!posts.length && (
          <p className="text-center text-base text-gray-500 dark:text-gray-400">No posts found.</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags, readingTime, images } = post
            return (
              <Card key={slug} className="flex flex-col">
                <CardHeader>
                  <Link href={`/blog/${slug}`}>
                    <Image
                      src={images[0]}
                      alt={`Featured image for blog post: ${title}`}
                      width={400}
                      height={225}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      priority={index < 2}
                      placeholder="blur"
                      blurDataURL={getContextualBlurDataURL('blog')}
                      className="aspect-video w-full rounded-t-lg object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">
                    <Link
                      href={`/blog/${slug}`}
                      className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent transition-all hover:from-indigo-600 hover:to-purple-600 dark:from-gray-100 dark:to-gray-300 dark:hover:from-indigo-400 dark:hover:to-purple-400"
                    >
                      {title}
                    </Link>
                  </h3>

                  {/* Responsive Metadata */}
                  <div className="flex flex-wrap items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center font-bold text-indigo-600 dark:text-indigo-400">
                      <Calendar size={12} className="mr-1" />
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </div>
                    <div className="h-3 border-r border-gray-300 dark:border-gray-600"></div>
                    <div className="flex items-center font-bold text-indigo-600 dark:text-indigo-400">
                      <AlarmClockCheck size={12} className="mr-1" />
                      <span>{readingTime.text}</span>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                    {summary}
                  </p>

                  {/* Responsive Tag Layout */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} text={tag} className="text-xs" />
                    ))}
                    {tags.length > 2 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{tags.length - 2} more
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="bg-gray-50 px-3 py-2.5 dark:bg-gray-800">
                  <Link
                    href={`/blog/${slug}`}
                    className="group inline-flex items-center text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 sm:text-sm"
                  >
                    Read more
                    <ChevronRight
                      size={14}
                      className="ml-1 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {posts.length > MAX_DISPLAY && (
        <div className="mb-8 text-center">
          <Link href="/blog" passHref>
            <Button as="a" className="px-3 py-1.5 text-sm sm:px-4 sm:py-2">
              View all posts
              <ArrowRight size={14} className="ml-1.5 sm:ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
