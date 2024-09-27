import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-start divide-y md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-3">
          <h2 className="text-2xl font-semibold leading-8 text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:border-r-2 md:px-6 md:text-5xl md:leading-14">
            Things I blog about
          </h2>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t) => (
            <div key={t} className="mb-2 mr-5 mt-2 flex items-center">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="ml-2 text-sm font-semibold uppercase text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
