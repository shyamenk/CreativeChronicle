'use client'

import { useState, useRef, ReactNode } from 'react'

interface PreProps {
  children: ReactNode
  className?: string
  'data-language'?: string
}

const CustomPre = ({ children, className = '', ...props }: PreProps) => {
  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  // Extract language from className or props
  const getLanguage = (): string => {
    if (props['data-language']) return props['data-language']
    const langMatch = className.match(/(?:language|hljs)-(\w+)/)
    return langMatch ? langMatch[1] : ''
  }

  const language = getLanguage()

  const onEnter = () => {
    setHovered(true)
  }

  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = () => {
    setCopied(true)
    if (textInput.current) {
      const text = textInput.current.textContent || ''
      navigator.clipboard.writeText(text)
    }
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="group relative my-6">
      {/* Language label */}
      {language && (
        <div className="absolute right-2 top-2 z-10 rounded bg-black/10 px-2 py-1 text-xs font-mono font-semibold uppercase text-black/60 dark:bg-white/10 dark:text-white/60">
          {language}
        </div>
      )}

      <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
        {/* Copy button */}
        {hovered && (
          <button
            aria-label="Copy code"
            className={`absolute right-2 z-20 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
              language ? 'top-10' : 'top-2'
            } ${
              copied
                ? 'border-green-400 focus:border-green-400 focus:outline-none'
                : 'border-gray-300'
            }`}
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={copied ? 'text-green-400' : 'text-gray-300'}
            >
              {copied ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              )}
            </svg>
          </button>
        )}

        <pre className={`${className} github-pre`} {...props}>
          {children}
        </pre>
      </div>
    </div>
  )
}

export default CustomPre
