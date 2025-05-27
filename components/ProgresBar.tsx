'use client'

import React, { useEffect, useState } from 'react'

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const totalHeight = scrollHeight - clientHeight
      const progress = (scrollTop / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 dark:from-purple-700 dark:to-indigo-700"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ProgressBar
