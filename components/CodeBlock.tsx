'use client'

import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  title?: string
  filename?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className = '', title, filename }) => {
  const [copied, setCopied] = useState(false)

  // Extract language from className (format: language-javascript or hljs-javascript)
  const extractLanguage = (cls: string): string => {
    const match = cls.match(/(?:language|hljs)-(\w+)/) || cls.match(/hljs (\w+)/)
    return match ? match[1] : ''
  }

  // Extract text content for copying
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node
    }
    if (React.isValidElement(node)) {
      return getTextContent(node.props.children)
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join('')
    }
    return ''
  }

  const textContent = getTextContent(children)
  const language = extractLanguage(className)
  const displayTitle = title || filename

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Add language data attribute to pre element for CSS styling
  useEffect(() => {
    if (language) {
      const preElements = document.querySelectorAll('pre')
      preElements.forEach((pre) => {
        if (pre.querySelector('code')?.textContent === textContent) {
          pre.setAttribute('data-lang', language.toUpperCase())
        }
      })
    }
  }, [language, textContent])

  return (
    <div className="group relative my-6">
      {/* Optional title */}
      {displayTitle && <div className="remark-code-title">{displayTitle}</div>}

      {/* Code content wrapper with copy button */}
      <div className="relative">
        {/* Pass through children - rehype-highlight handles the syntax highlighting */}
        {React.isValidElement(children) ? (
          React.cloneElement(children as React.ReactElement, {
            className:
              `${(children as React.ReactElement).props.className || ''} ${className}`.trim(),
            'data-lang': language.toUpperCase(),
          })
        ) : (
          <pre className={className} data-lang={language.toUpperCase()}>
            <code>{children}</code>
          </pre>
        )}

        {/* Copy button - positioned to avoid language label */}
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 opacity-0 transition-all duration-200 hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Copy code to clipboard"
          title={copied ? 'Copied!' : 'Copy code'}
          style={{ marginTop: language ? '24px' : '0' }}
        >
          {copied ? (
            <Check size={14} className="text-green-600 dark:text-green-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>

        {/* Copy feedback */}
        {copied && (
          <div
            className="absolute right-12 top-2 z-10 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
            style={{ marginTop: language ? '24px' : '0' }}
          >
            Copied!
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
