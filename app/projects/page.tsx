import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="dark:divide-mauve mx-auto max-w-4xl divide-y divide-gray-300 px-4 py-2">
        <div className="space-y-2 pb-6 pt-4">
          <h1 className="text-mauve-12 dark:text-mauve text-3xl font-extrabold leading-tight sm:text-4xl sm:leading-tight">
            Recent Works
          </h1>
        </div>
        <div className="container py-6">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
