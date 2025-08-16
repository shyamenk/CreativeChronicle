'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

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

  const displayTitle = title || filename

  // GitHub-style code block wrapper that works with Prism.js
  return (
    <div className="relative my-6 group">
      {/* Title bar (optional) */}
      {displayTitle && <div className="remark-code-title">{displayTitle}</div>}

      {/* The children should be the pre element with Prism classes */}
      <div className="relative">
        {React.isValidElement(children) ? (
          React.cloneElement(children as React.ReactElement, {
            className:
              `${(children as React.ReactElement).props.className || ''} github-code-block`.trim(),
          })
        ) : (
          <pre className={`github-code-block ${className}`}>
            <code>{children}</code>
          </pre>
        )}

        {/* GitHub-style copy button */}
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 opacity-0 transition-all duration-200 hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Copy code to clipboard"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check size={14} className="text-green-600 dark:text-green-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>

        {/* Copied tooltip */}
        {copied && (
          <div className="absolute right-12 top-2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-gray-100 dark:text-gray-900">
            Copied!
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
