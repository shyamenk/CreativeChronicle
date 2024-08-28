import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="mx-16 mb-4 text-left text-lg font-bold leading-8 text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-9 md:text-4xl md:leading-12">
      {children}
    </h1>
  )
}
