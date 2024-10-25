import React from 'react'

const Intro = () => (
  <div className="relative z-10 mb-24">
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-slow-spin from-indigo-300/8 h-[500px] w-[500px] rounded-full bg-gradient-to-r to-transparent blur-xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <div className="animate-reverse-slow-spin from-indigo-300/8 h-[300px] w-[300px] rounded-full bg-gradient-to-l to-transparent blur-lg" />
      </div>
      <div className="relative px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-6 py-2 text-sm text-indigo-500">
              Welcome to the Future of Backend Development
            </div>
            <h1 className="mt-6 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:to-gray-400 sm:text-6xl lg:text-7xl">
              Backend{' '}
              <span className="relative">
                <span className="absolute -inset-1 block bg-gradient-to-r from-indigo-500 to-indigo-600 opacity-20 blur-2xl" />
                <span className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                  Almanac
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Welcome to Backend Almanac: your authoritative source for backend development
              insights. Dive into in-depth articles, tutorials, and the latest server-side trends.
              Whether you're a seasoned pro or just starting out, we've got the resources you need
              to elevate your backend engineering journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Intro
