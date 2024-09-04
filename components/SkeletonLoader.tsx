import React from 'react'

const PostMinimalSkeletonLoader = () => {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 sm:px-6 lg:px-8">
      <nav className="mb-2 text-gray-600">
        <ol className="flex items-center space-x-2">
          <li className="flex items-center">
            <div className="h-6 w-16 rounded bg-gray-200"></div>
          </li>
          <li>
            <div className="text-gray-400"></div>
          </li>
          <li className="flex items-center">
            <div className="h-6 w-16 rounded bg-gray-200"></div>
          </li>
          <li>
            <div className="text-gray-400"></div>
          </li>
          <li className="flex items-center">
            <div className="h-6 w-16 rounded bg-gray-200"></div>
          </li>
        </ol>
      </nav>

      <article className="py-16">
        <header className="mb-8">
          <div className="mb-4 h-10 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-4 flex items-center">
            <div className="mr-6 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-gray-200"></div>
              <div className="h-4 w-32 rounded bg-gray-200"></div>
            </div>
            <div className="ml-auto flex space-x-2">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="h-10 w-10 rounded-full bg-gray-200"></div>
              ))}
            </div>
          </div>
        </header>
        <div className="relative mb-8 aspect-[16/9] rounded-lg bg-gray-200"></div>
        <div className="mb-8 space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="h-4 w-full rounded bg-gray-200"></div>
          ))}
        </div>
        <hr className="mb-8 border-gray-200" />
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-9 w-9 rounded-full bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-24 rounded bg-gray-200"></div>
            <div className="ml-2 h-9 w-9 rounded-full bg-gray-200"></div>
          </div>
        </nav>
      </article>
      <div className="py-8">
        <div className="h-40 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}

export default PostMinimalSkeletonLoader
