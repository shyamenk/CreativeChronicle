'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import { Server } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="py-6">
      <div className="container mx-auto max-w-3xl bg-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Server className="h-8 w-8 text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              <Link
                href="/"
                className="hidden text-3xl font-bold text-gray-700 dark:text-gray-300 sm:block "
              >
                Backend Almanac
              </Link>
            </h1>
          </div>
          {/* Desktop Navigation */}
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
                    <span className="relative z-10 font-bold transition-all duration-200 ease-out group-hover:text-lg">
                      {link.title}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2 bg-indigo-600 dark:bg-indigo-400"></span>
                    )}
                  </Link>
                )
              })}
          </nav>
          <ThemeSwitch />
          {/* Mobile Navigation Toggle */}
          <MobileNav />
        </div>
      </div>
      {/* Separator Line */}
      <div className="container mx-auto mt-4 max-w-4xl px-4">
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>
    </header>
  )
}
export default Header
