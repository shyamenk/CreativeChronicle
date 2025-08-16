'use client'

import React, { useState } from 'react'
import NextImage, { ImageProps } from 'next/image'
import { getContextualBlurDataURL } from '@/lib/image-utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  context?: 'blog' | 'avatar' | 'hero' | 'thumbnail'
  showLoadingState?: boolean
  fallbackSrc?: string
  onLoadComplete?: () => void
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  context = 'blog',
  showLoadingState = true,
  fallbackSrc = '/static/images/site-image.png',
  onLoadComplete,
  onError,
  className = '',
  alt,
  placeholder = 'blur',
  blurDataURL,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(props.src)

  const handleLoad = () => {
    setIsLoading(false)
    onLoadComplete?.()
  }

  const handleError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn('Image failed to load:', props.src)
    setHasError(true)
    setIsLoading(false)

    // Fallback to default image if provided
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }

    onError?.(error)
  }

  // Generate contextual blur data URL if not provided
  const finalBlurDataURL = blurDataURL || getContextualBlurDataURL(context)

  const baseClassName = `transition-opacity duration-300 ${
    isLoading ? 'opacity-0' : 'opacity-100'
  } ${className}`

  return (
    <div className="relative overflow-hidden">
      {/* Loading State */}
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
          {/* Optional loading spinner for hero images */}
          {context === 'hero' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {hasError && !fallbackSrc && (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg
              className="mx-auto h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      {!hasError && (
        <NextImage
          {...props}
          src={imageSrc}
          alt={alt}
          placeholder={placeholder}
          blurDataURL={finalBlurDataURL}
          className={baseClassName}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}

export default OptimizedImage
