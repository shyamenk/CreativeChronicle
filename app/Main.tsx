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
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <Intro />
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Recent Articles</h2>
        {!posts.length && <p className="text-center text-lg text-gray-500">No posts found.</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
                      className="aspect-video w-full object-cover"
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                    <Link href={`/blog/${slug}`} className="text-gray-900 hover:text-indigo-600">
                      {title}
                    </Link>
                  </h3>
                  <div className="mb-2 flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center font-bold text-indigo-500">
                      <Calendar size={14} className="mr-1" />
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </div>
                    <div className="h-4 border-r border-gray-300"></div>
                    <div className="flex items-center font-bold text-indigo-500">
                      <AlarmClockCheck size={14} className="mr-1" />
                      <span>{readingTime.text}</span>
                    </div>
                  </div>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">{summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                    {tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{tags.length - 2} more</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${slug}`}
                    className="group inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Read more
                    <ChevronRight
                      size={16}
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
        <div className="mb-16 text-center">
          <Link href="/blog" passHref>
            <Button as="a">
              View all posts
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
      {/* <NewsletterSection siteMetadata={siteMetadata} /> */}
    </div>
  )
}
