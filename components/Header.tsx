'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import { ListMinus } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="py-6">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <ListMinus className="h-8 w-8 text-indigo-500" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              <Link
                href="/"
                className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Backend Almanac
              </Link>
            </h1>
          </div>
          <nav className="hidden items-center space-x-6 md:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`group relative px-1 py-2 text-base font-medium transition-all duration-200 ease-out
                      ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                      }
                    `}
                  >
                    <span className="relative z-10 transition-all duration-200 ease-out group-hover:text-lg">
                      {link.title}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2   bg-indigo-600 dark:bg-indigo-400"></span>
                    )}
                  </Link>
                )
              })}
          </nav>
          <MobileNav />
        </div>
      </div>
      <div className="container mx-auto mt-4 max-w-4xl px-4">
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>
    </header>
  )
}

export default Header
