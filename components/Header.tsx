import headerNavLinks from '@/data/headerNavLinks'
import Avatar from 'public/static/images/avatar-dark.png'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-8">
      <div className="flex items-center gap-2">
        <div className="mt-5">
          <Link href={'/'}>
            <Image className="" src={Avatar} alt="user-avatar" width={120} height={150} />
          </Link>
        </div>
        {/* <div className="ml-0">
          <a
            href="/"
            aria-label="{siteMetadata.headerTitle}"
            className="hidden h-6 text-2xl font-semibold dark:text-gray-300 sm:block"
          >
            {siteMetadata.headerTitle}
          </a>
        </div> */}
      </div>

      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        {/* <SearchButton /> */}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
