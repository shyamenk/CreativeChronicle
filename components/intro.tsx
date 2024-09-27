import React from 'react'
import { BookOpen, TrendingUp, Users } from 'lucide-react'
const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-indigo-400">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
)

const Intro = () => (
  <div className="relative z-10 mb-24">
    <h1
      className={`mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl`}
    >
      Backend <span className="text-gray-600 dark:text-indigo-400">Almanac</span>
    </h1>
    <p className="mb-10 max-w-4xl text-lg text-gray-700 dark:text-gray-300">
      A blog dedicated to exploring the depths of backend development, sharing insights, and
      discussing the latest trends in server-side technologies. Whether you're a seasoned developer
      or just starting your journey in backend engineering, Backend Almanac is your go-to resource
      for in-depth articles, tutorials, and industry insights.
    </p>
    <div className="mb-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <FeatureItem
        Icon={BookOpen}
        title="In-Depth Articles"
        description="Comprehensive guides and tutorials covering a wide range of backend topics."
      />
      <FeatureItem
        Icon={TrendingUp}
        title="Trending Technologies"
        description="Stay updated with the latest backend frameworks, languages, and tools."
      />
      <FeatureItem
        Icon={Users}
        title="Community Insights"
        description="Learn from real-world experiences shared by our community of developers."
      />
    </div>
  </div>
)

export default Intro
