import { prismaMock } from '../../../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

import { POST, GET } from '@/app/api/admin/categories/route'
import { NextRequest } from 'next/server'

describe('Categories API - Unit', () => {

  describe('POST /api/admin/categories', () => {
    
    it('should create a category successfully', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null)
      prismaMock.category.create.mockResolvedValue({
        id: '1',
        name: 'Sports',
        createdAt: new Date(),
      })

      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: 'Sports' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(201)
      expect(data.name).toBe('Sports')
    })

    it('should return 400 if category name is empty', async () => {
      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: '' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if category already exists', async () => {
      prismaMock.category.findFirst.mockResolvedValue({
        id: '1',
        name: 'Sports',
        createdAt: new Date(),
      })

      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: 'Sports' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('this category already exist')
    })
  })

  describe('GET /api/admin/categories', () => {
    it('should return list of categories', async () => {
      prismaMock.category.findMany.mockResolvedValue([
        { id: '1', name: 'Sports', createdAt: new Date() },
        { id: '2', name: 'Music', createdAt: new Date() },
        { id: '3', name: 'Cinema', createdAt: new Date() },
      ])

      const res = await GET()
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data).toHaveLength(3)
    })

    it('should return empty array when no categories', async () => {
      prismaMock.category.findMany.mockResolvedValue([])

      const res = await GET()
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data).toHaveLength(0)
    })
  })
})