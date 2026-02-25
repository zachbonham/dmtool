import { describe, it, expect } from 'vitest'
import { formatDate, generateId, clamp } from '../utils'

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
})