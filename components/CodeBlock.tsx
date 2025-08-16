'use client'

import React, { useState } from 'react'
import { Check, Copy, FileText } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  title?: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className = '',
  title,
  language,
  filename,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false)

  // Extract language from className (format: language-javascript)
  const extractedLanguage = className.match(/language-(\w+)/)?.[1] || language || 'text'

  // Get the code content from children
  const getCodeContent = (): string => {
    if (typeof children === 'string') {
      return children
    }

    // Handle React elements (like <pre><code>content</code></pre>)
    if (React.isValidElement(children)) {
      const props = children.props as { children?: React.ReactNode }
      if (props.children) {
        if (typeof props.children === 'string') {
          return props.children
        }
        if (React.isValidElement(props.children)) {
          const codeProps = props.children.props as { children?: string }
          return codeProps.children || ''
        }
      }
    }

    return ''
  }

  const codeContent = getCodeContent()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const displayLanguage = extractedLanguage.toUpperCase()
  const displayTitle = title || filename

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      {/* Header with title/filename and language */}
      {(displayTitle || extractedLanguage !== 'text') && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            {displayTitle && (
              <>
                <FileText size={14} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {displayTitle}
                </span>
              </>
            )}
          </div>
          {extractedLanguage !== 'text' && (
            <span className="rounded bg-gray-200 px-2 py-1 text-xs font-mono font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {displayLanguage}
            </span>
          )}
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre className={`overflow-x-auto p-4 text-sm leading-relaxed ${className}`}>
          <code className="font-mono">{children}</code>
        </pre>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md bg-gray-200 p-2 opacity-0 transition-all duration-200 hover:bg-gray-300 group-hover:opacity-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Copy code to clipboard"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check size={16} className="text-green-600 dark:text-green-400" />
          ) : (
            <Copy size={16} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Copied feedback */}
        {copied && (
          <div className="absolute right-14 top-3 rounded bg-gray-800 px-2 py-1 text-xs text-white dark:bg-gray-200 dark:text-gray-800">
            Copied!
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
