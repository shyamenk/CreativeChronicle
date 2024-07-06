import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { AlarmClockCheck, Timer } from 'lucide-react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* <div className="pt-6 pb-8 space-y-2 md:space-y-2">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Recent Activity 🚴
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div> */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, readingTime } = post

            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-3 xl:col-span-3">
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-3xl font-semibold leading-10">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex flex-wrap font-semibold">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              <AlarmClockCheck
                                size={20}
                                className="text-gray-600 dark:text-gray-500"
                              />
                              <p className="text-md font-medium leading-6 text-gray-500 dark:text-gray-400">
                                {readingTime.text}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                          {summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-[20px] text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex w-full items-center pt-4">
          <NewsletterForm />{' '}
        </div>
      )}
    </>
  )
}
