import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const BreadCrumb = () => {
  const pathname = usePathname() || '/'
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <nav className="mb-2 font-bold tracking-wide text-gray-600 dark:text-gray-400">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          return (
            <React.Fragment key={segment}>
              <li>
                <ChevronRight size={16} className="text-gray-400 dark:text-gray-600" />
              </li>
              <li>
                <Link
                  href={segmentPath}
                  className={`capitalize hover:text-gray-800 dark:hover:text-gray-200 ${
                    isLast
                      ? 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {decodeURIComponent(segment)}
                </Link>
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default BreadCrumb
