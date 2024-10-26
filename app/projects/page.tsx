import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      {/* <div className="mx-auto my-10  max-w-3xl  px-4 py-2"> */}
      {/*   <div className="container py-6"> */}
      {/*     <div className="-m-4 flex flex-wrap"> */}
      {/*       {projectsData.map((d) => ( */}
      {/*         <Card */}
      {/*           key={d.title} */}
      {/*           title={d.title} */}
      {/*           description={d.description} */}
      {/*           imgSrc={d.imgSrc} */}
      {/*           href={d.href} */}
      {/*         /> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </>
  )
}
