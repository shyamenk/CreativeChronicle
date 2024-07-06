import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 mt-2 text-sm font-bold uppercase text-cyan-500 dark:text-cyan-500 dark:hover:text-cyan-600"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
