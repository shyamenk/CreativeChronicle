import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="max-w-md overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-700">
    {imgSrc && (
      <div className="relative h-64 overflow-hidden">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-full w-full object-cover object-center"
            width={544}
            height={306}
          />
        )}
      </div>
    )}
    <div className="p-6">
      <div className="mb-4 flex items-baseline">
        <div className="h-0.5 w-12 bg-indigo-500"></div>
        <h2 className="ml-2 text-xl font-bold tracking-tight text-indigo-700 dark:text-white">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
      </div>
      <p className="mb-4 text-md text-gray-600 dark:text-gray-300">{description}</p>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center text-md font-medium font-semibold text-indigo-600 transition-colors duration-300 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          aria-label={`Link to ${title}`}
        >
          Learn more
          <svg
            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  </div>
)

export default Card
