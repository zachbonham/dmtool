import { describe, it, expect } from 'vitest'
import { formatDate, generateId, clamp, uuidToToken, tokenToUuid, isUuid } from '../utils'

describe('utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-02-25')
      const result = formatDate(date)
      expect(result).toContain('February')
      expect(result).toContain('25')
      expect(result).toContain('2025')
    })
  })

  describe('generateId', () => {
    it('generates a string id', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })

    it('generates unique ids', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })
  })

  describe('clamp', () => {
    it('returns value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('returns min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('returns max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('uuidToToken', () => {
    it('converts UUID to base64 token', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000'
      const token = uuidToToken(uuid)
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
      // Base64url should not contain +, /, or = (but can contain - and _)
      expect(token).not.toContain('+')
      expect(token).not.toContain('/')
      expect(token).not.toContain('=')
    })

    it('produces consistent output for same UUID', () => {
      const uuid = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
      const token1 = uuidToToken(uuid)
      const token2 = uuidToToken(uuid)
      expect(token1).toBe(token2)
    })

    it('produces different tokens for different UUIDs', () => {
      const uuid1 = '123e4567-e89b-12d3-a456-426614174000'
      const uuid2 = '987f6543-21ab-cdef-0123-456789abcdef'
      const token1 = uuidToToken(uuid1)
      const token2 = uuidToToken(uuid2)
      expect(token1).not.toBe(token2)
    })

    it('handles lowercase UUID', () => {
      const uuid = 'abcdef12-3456-7890-abcd-ef1234567890'
      const token = uuidToToken(uuid)
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })

    it('handles uppercase UUID', () => {
      const uuid = 'ABCDEF12-3456-7890-ABCD-EF1234567890'
      const token = uuidToToken(uuid)
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })
  })

  describe('tokenToUuid', () => {
    it('converts token back to UUID', () => {
      const originalUuid = '123e4567-e89b-12d3-a456-426614174000'
      const token = uuidToToken(originalUuid)
      const resultUuid = tokenToUuid(token)
      expect(resultUuid).toBe(originalUuid)
    })

    it('performs round-trip conversion correctly', () => {
      const testUuids = [
        '00000000-0000-0000-0000-000000000000',
        'ffffffff-ffff-ffff-ffff-ffffffffffff',
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        '987f6543-21ab-cdef-0123-456789abcdef'
      ]

      testUuids.forEach(uuid => {
        const token = uuidToToken(uuid)
        const result = tokenToUuid(token)
        expect(result).toBe(uuid)
      })
    })

    it('throws error for invalid token', () => {
      expect(() => tokenToUuid('invalid-token-!@#$')).toThrow('Invalid token format')
    })

    it('throws error for empty token', () => {
      expect(() => tokenToUuid('')).toThrow('Invalid token format')
    })

    it('handles tokens with URL-safe characters', () => {
      // Even though current implementation doesn't use - and _, test should handle them
      const uuid = '123e4567-e89b-12d3-a456-426614174000'
      const token = uuidToToken(uuid)
      const result = tokenToUuid(token)
      expect(result).toBe(uuid)
    })
  })

  describe('isUuid', () => {
    it('returns true for valid lowercase UUID', () => {
      expect(isUuid('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    })

    it('returns true for valid uppercase UUID', () => {
      expect(isUuid('123E4567-E89B-12D3-A456-426614174000')).toBe(true)
    })

    it('returns true for valid mixed case UUID', () => {
      expect(isUuid('a1B2c3D4-e5F6-7890-aBcD-ef1234567890')).toBe(true)
    })

    it('returns true for all zeros UUID', () => {
      expect(isUuid('00000000-0000-0000-0000-000000000000')).toBe(true)
    })

    it('returns true for all fs UUID', () => {
      expect(isUuid('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(true)
    })

    it('returns false for UUID without hyphens', () => {
      expect(isUuid('123e4567e89b12d3a456426614174000')).toBe(false)
    })

    it('returns false for UUID with wrong hyphen positions', () => {
      expect(isUuid('123e4567-e89b12-d3a4-56-426614174000')).toBe(false)
    })

    it('returns false for UUID with invalid characters', () => {
      expect(isUuid('123g4567-e89b-12d3-a456-426614174000')).toBe(false)
    })

    it('returns false for too short string', () => {
      expect(isUuid('123e4567-e89b-12d3-a456')).toBe(false)
    })

    it('returns false for too long string', () => {
      expect(isUuid('123e4567-e89b-12d3-a456-426614174000-extra')).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isUuid('')).toBe(false)
    })

    it('returns false for base64 token', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000'
      const token = uuidToToken(uuid)
      expect(isUuid(token)).toBe(false)
    })

    it('returns false for random string', () => {
      expect(isUuid('not-a-uuid-at-all')).toBe(false)
    })
  })
})