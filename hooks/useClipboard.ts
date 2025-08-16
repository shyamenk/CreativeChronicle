import { useState } from 'react'

interface UseClipboardOptions {
  timeout?: number
}

interface UseClipboardReturn {
  copied: boolean
  copy: (text: string) => Promise<void>
  error: string | null
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}): UseClipboardReturn {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = async (text: string): Promise<void> => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported')
      }

      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(null)

      // Reset copied state after timeout
      setTimeout(() => {
        setCopied(false)
      }, timeout)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to copy')
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return { copied, copy, error }
}
