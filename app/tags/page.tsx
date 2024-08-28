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
      <div className="divide-mauve-200 dark:divide-mauve-800 mx-auto flex max-w-4xl flex-col items-start justify-start divide-y md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-3">
          <h2 className="text-mauve-900 dark:text-mauve-50 text-2xl font-extrabold leading-8 tracking-tight sm:text-3xl sm:leading-9 md:border-r-2 md:px-6 md:text-4xl md:leading-10">
            Things I blog about
          </h2>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && (
            <p className="text-mauve-500 dark:text-mauve-400">No tags found.</p>
          )}
          {sortedTags.map((t) => (
            <div key={t} className="mb-2 mr-5 mt-2 flex items-center">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="text-mauve-600 dark:text-mauve-300 ml-2 text-sm font-semibold uppercase"
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
