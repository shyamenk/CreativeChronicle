'use client'
import { useState, useEffect } from 'react'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { X } from 'lucide-react'

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    setIsVisible(true)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <X size={24} />
      </button>
      <NewsletterForm />
      <button
        onClick={handleClose}
        className="mt-4 w-full rounded bg-cyan-500 py-2 text-white hover:bg-cyan-600 dark:bg-cyan-400 dark:hover:bg-cyan-300"
      >
        Maybe Later
      </button>
    </div>
  )
}

export default NewsletterPopup
