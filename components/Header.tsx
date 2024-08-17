import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="bg-white py-8 dark:bg-[#191B28]">
      <div className="container mx-auto mb-10 max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-auto text-cyan-500"
            >
              <path d="M6 15l6-6 6 6" />
              <path d="M6 9l6 6 6-6" />
            </svg>

            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100">
              <Link href="/" className="hover:text-cyan-500 dark:hover:text-cyan-400">
                The Daily Brew
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
                  className="font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            {/* <ThemeSwitch /> */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
