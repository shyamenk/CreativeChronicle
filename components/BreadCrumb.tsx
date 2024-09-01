import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const BreadCrumb = () => {
  const pathname = usePathname() || '/'
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <nav className="mb-8 text-gray-600">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <Home size={16} className="mr-1" />
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`
          return (
            <React.Fragment key={segment}>
              <li>
                <ChevronRight size={16} className="text-gray-400" />
              </li>
              <li>
                <Link
                  href={segmentPath}
                  className={`capitalize text-gray-600 hover:text-gray-800 ${index === pathSegments.length - 1 ? 'text-indigo-500' : ''}`}
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
