import React from 'react'

const Intro = () => {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
      {/* Background Gradient Layers */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-slow-spin h-[35vh] w-[35vh] rounded-full bg-gradient-to-br 
            from-indigo-400/20 via-purple-400/10 to-pink-400/10  blur-3xl dark:from-indigo-600/10 dark:via-purple-600/10  dark:to-pink-600/10 md:h-[50vh] md:w-[50vh]"
          />
        </div>
        <div className="absolute inset-0">
          <div
            className="animate-float absolute left-1/4 top-1/4 h-24 w-24 rounded-full bg-indigo-400/10 
            blur-xl dark:bg-indigo-600/10 
            md:h-32 
            md:w-32"
          />
          <div
            className="animate-float-delayed absolute bottom-1/4 right-1/4 h-20 w-20 rounded-full bg-purple-400/10 
            blur-xl dark:bg-purple-600/10 
            md:h-24 
            md:w-24"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-6 text-center md:space-y-8">
            {/* Ping Badge */}
            <div
              className="inline-flex items-center justify-center gap-2 
              rounded-full 
              border border-indigo-300/20 
              bg-white/30 
              px-4 
              py-2 
              shadow-sm dark:border-indigo-700/20 
              dark:bg-gray-800/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
              </span>
              <span className="bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-sm font-medium text-transparent dark:from-indigo-400 dark:to-purple-400">
                Welcome to the Future of Backend Development
              </span>
            </div>

            {/* Heading */}
            <div className="mt-4 space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block text-gray-900 dark:text-gray-100">Backend Almanac</span>
                <span className="relative mt-1 block">
                  <span
                    className="absolute -inset-1 block 
                    bg-gradient-to-r 
                    from-indigo-600 via-purple-600 to-pink-600 
                    opacity-10 blur-2xl dark:from-indigo-400 
                    dark:via-purple-400 
                    dark:to-pink-400"
                  />
                  <span
                    className="relative 
                    bg-gradient-to-r 
                    from-indigo-700 via-purple-700 to-pink-700 
                    bg-clip-text text-transparent dark:from-indigo-500 
                    dark:via-purple-500 dark:to-pink-500"
                  >
                    Your Guide to Excellence
                  </span>
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p
              className="mx-auto max-w-2xl 
              px-4 text-sm 
              leading-relaxed 
              text-gray-700 
              backdrop-blur-sm 
              dark:text-gray-300 
              sm:text-base 
              md:text-lg"
            >
              Discover in-depth backend development resources, from expert tutorials to cutting-edge
              trends. Level up your server-side engineering skills with our comprehensive guides and
              insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
