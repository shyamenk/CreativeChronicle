import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
              <span>{siteMetadata.author}</span>
              <span className="hidden sm:inline">•</span>
              <span>{`© ${new Date().getFullYear()}`}</span>
              <span className="hidden sm:inline">•</span>
              <Link href="/" className="text-sm text-gray-600 hover:underline sm:inline">
                {siteMetadata.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
