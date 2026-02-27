// Utility functions

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Convert UUID to URL-friendly base64 token
 * Removes hyphens from UUID and encodes as base64url
 */
export const uuidToToken = (uuid: string): string => {
  // Remove hyphens from UUID
  const hex = uuid.replace(/-/g, '')
  
  // Convert hex to bytes
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
  
  // Convert to base64
  const base64 = btoa(String.fromCharCode(...bytes))
  
  // Make URL-safe (base64url encoding)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Convert base64url token back to UUID
 */
export const tokenToUuid = (token: string): string => {
  try {
    // Add padding if needed
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) {
      base64 += '='
    }
    
    // Decode base64 to bytes
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    
    // Convert bytes to hex
    const hex = Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // Format as UUID
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  } catch (error) {
    throw new Error('Invalid token format')
  }
}

/**
 * Check if a string is a valid UUID format
 */
export const isUuid = (str: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}