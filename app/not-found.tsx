import Link from '@/components/Link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 dark:bg-gray-900 dark:text-white">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-white md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl dark:text-gray-300">
          Sorry we couldn&apos;t find this page.
        </p>
        <p className="mb-8 dark:text-gray-400">
          But don&apos;t worry, you can find plenty of other things on our homepage.
        </p>
        <Link href="/">
          <Button variant="primary" size="default">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
