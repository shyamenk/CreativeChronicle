'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { Menu, X } from 'lucide-react'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        aria-label={navShow ? 'Close Menu' : 'Open Menu'}
        onClick={onToggleNav}
        className="fixed right-4 top-4 z-50 rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        {navShow ? (
          <X className="h-6 w-6 text-gray-800" />
        ) : (
          <Menu className="h-6 w-6 text-gray-800" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center space-y-8">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-2xl font-bold tracking-wide text-gray-900 transition-colors hover:text-gray-600"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
