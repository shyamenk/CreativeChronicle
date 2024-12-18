import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className = '' }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`mr-3 text-sm font-bold uppercase text-primary-500 hover:text-primary-600 ${className}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
