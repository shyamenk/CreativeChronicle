import React from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { AlarmClockCheck, ArrowRight, Calendar, ChevronRight } from 'lucide-react'
import Intro from '@/components/intro'
// import NewsletterSection from '@/components/NewletterSection'

const MAX_DISPLAY = 6

const Card = ({ children, className = '' }) => (
  <div
    className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:shadow-md ${className}`}
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
  <div className={`border-t border-gray-200 p-4 ${className}`}>{children}</div>
)

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md border border-indigo-500 bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
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
        <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">Recent Articles</h2>
        {!posts.length && <p className="text-center text-base text-gray-500">No posts found.</p>}

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, readingTime, images } = post
            return (
              <Card key={slug} className="flex flex-col">
                <CardHeader>
                  <Link href={`/blog/${slug}`}>
                    <Image
                      src={images[0]}
                      alt={title}
                      width={400}
                      height={225}
                      className="aspect-video w-full rounded-t-lg object-cover"
                      priority
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">
                    <Link href={`/blog/${slug}`} className="text-gray-900 hover:text-indigo-600">
                      {title}
                    </Link>
                  </h3>

                  {/* Responsive Metadata */}
                  <div className="flex flex-wrap items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center font-bold text-indigo-500">
                      <Calendar size={12} className="mr-1" />
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </div>
                    <div className="h-3 border-r border-gray-300"></div>
                    <div className="flex items-center font-bold text-indigo-500">
                      <AlarmClockCheck size={12} className="mr-1" />
                      <span>{readingTime.text}</span>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-xs text-gray-600 sm:text-sm">{summary}</p>

                  {/* Responsive Tag Layout */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} text={tag} className="text-xs" />
                    ))}
                    {tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{tags.length - 2} more</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="px-3 py-2.5">
                  <Link
                    href={`/blog/${slug}`}
                    className="group inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-500 sm:text-sm"
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
