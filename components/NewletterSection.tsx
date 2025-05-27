import React from 'react'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { Mail } from 'lucide-react'

const NewsletterSection = ({ siteMetadata }) => {
  if (!siteMetadata.newsletter?.provider) return null

  return (
    <section className="my-16 rounded-lg bg-gray-50 p-8 shadow-sm">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center">
          <Mail className="mr-3 h-8 w-8 text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-900">Stay Updated with Backend Almanac</h2>
        </div>
        <p className="mb-6 text-gray-600">
          Get the latest insights on backend technologies delivered straight to your inbox.
        </p>
        <NewsletterForm />
      </div>
    </section>
  )
}

export default NewsletterSection
