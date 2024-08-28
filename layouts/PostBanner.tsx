import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { slug, title, images } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="text-center dark:border-gray-700">
          <div className="relative mx-auto max-w-3xl pb-10">
            <Bleed>
              <div className="relative mx-auto aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-md">
                <Image
                  src={displayImage}
                  alt={title}
                  layout="responsive"
                  width={800}
                  height={400}
                  className="object-cover"
                />
              </div>
            </Bleed>
          </div>
          <div className="relative pt-4">
            <PageTitle>{title}</PageTitle>
          </div>
        </div>
        <div className="prose mx-auto max-w-4xl py-4 text-md dark:prose-invert">{children}</div>
        {siteMetadata.comments && (
          <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
            <Comments slug={slug} />
          </div>
        )}
        <footer>
          <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
            {prev && prev.path && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${prev.path}`}
                  className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && next.path && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${next.path}`}
                  className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </SectionContainer>
  )
}
