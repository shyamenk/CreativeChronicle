import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import { Terminal } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-indigo-50 py-8 dark:bg-[#191B28]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Terminal className="w-18 h-18 text-indigo-500" strokeWidth={3} />
            <h1 className="relative text-3xl font-extrabold text-gray-800 dark:text-gray-100">
              <Link href="/" className=" hover:text-indigo-500 dark:hover:text-indigo-400">
                Dev Brew
              </Link>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-[17px] font-semibold text-gray-700 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            {/* <ThemeSwitch /> */}
            <MobileNav />
          </div>
        </div>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
      </div>
    </header>
  )
}

export default Header
