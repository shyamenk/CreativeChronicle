import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div className="mx-auto mt-8 max-w-4xl">
        <div className="space-y-2 pb-6 pt-4">
          <h1 className="border-b border-gray-200 dark:border-gray-700 pb-2 text-4xl font-semibold leading-tight text-gray-600 dark:text-gray-300 sm:text-4xl sm:leading-tight">
            About the Author
          </h1>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <div className="text-md text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-md text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
          </div>
          <div className="max-w-none pb-8 pt-8 text-md font-normal text-gray-700 dark:text-gray-300 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
