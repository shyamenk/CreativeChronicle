/**
 * Utility functions for image optimization and blur data URL generation
 */

/**
 * Generates a simple blur data URL for image placeholders
 * This creates a 10x10 pixel image with a neutral gray color
 */
export function generateBlurDataURL(color = '#f3f4f6'): string {
  // Create a simple 10x10 SVG with the specified color
  const svg = `
    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="${color}"/>
    </svg>
  `.trim()

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

/**
 * Generates a more sophisticated blur data URL with gradient
 * This creates a subtle gradient that works well with most images
 */
export function generateGradientBlurDataURL(startColor = '#f3f4f6', endColor = '#e5e7eb'): string {
  const svg = `
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${startColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${endColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" fill="url(#grad)"/>
    </svg>
  `.trim()

  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

/**
 * Generates theme-aware blur data URL
 * Uses different colors for light and dark themes
 */
export function generateThemeAwareBlurDataURL(isDark = false): string {
  if (isDark) {
    return generateGradientBlurDataURL('#374151', '#1f2937')
  }
  return generateGradientBlurDataURL('#f3f4f6', '#e5e7eb')
}

/**
 * Gets appropriate blur data URL based on image context
 * Different types of content may benefit from different placeholder styles
 */
export function getContextualBlurDataURL(
  context: 'blog' | 'avatar' | 'hero' | 'thumbnail' = 'blog'
): string {
  switch (context) {
    case 'avatar':
      return generateGradientBlurDataURL('#e0e7ff', '#c7d2fe') // Indigo tones
    case 'hero':
      return generateGradientBlurDataURL('#ddd6fe', '#c4b5fd') // Purple tones
    case 'thumbnail':
      return generateBlurDataURL('#f9fafb') // Light gray
    case 'blog':
    default:
      return generateGradientBlurDataURL('#f3f4f6', '#e5e7eb') // Default gray gradient
  }
}
