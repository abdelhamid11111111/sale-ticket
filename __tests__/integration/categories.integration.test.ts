import { NextRequest } from 'next/server'
import { prismaMock } from '../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import { GET, POST } from '@/app/api/admin/categories/route'
import { PUT, DELETE } from '@/app/api/admin/categories/[id]/route'

const asCategory = (obj: unknown) => obj as never

describe('Categories API - Integration', () => {
  // ─── POST /api/admin/categories ───────────────────────────────────────────

  describe('POST /api/admin/categories', () => {
    it('creates a category and returns 201', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null)
      prismaMock.category.create.mockResolvedValue(
        asCategory({ id: 'cat-1', name: 'Music', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: 'Music' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body.name).toBe('Music')
    })

    it('returns 400 when CategoryName is empty', async () => {
      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: '' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('input is empty')
    })

    it('returns 400 when CategoryName is missing', async () => {
      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('returns 400 when category already exists', async () => {
      prismaMock.category.findFirst.mockResolvedValue(
        asCategory({ id: 'cat-1', name: 'Music', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ CategoryName: 'Music' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('this category already exist')
    })
  })

  // ─── GET /api/admin/categories ────────────────────────────────────────────

  describe('GET /api/admin/categories', () => {
    it('returns list of categories with 200', async () => {
      prismaMock.category.findMany.mockResolvedValue(
        asCategory([
          { id: 'cat-1', name: 'Music', createdAt: new Date(), updatedAt: new Date() },
          { id: 'cat-2', name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
        ])
      )

      const res = await GET()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toHaveLength(2)
      expect(body[0].name).toBe('Music')
    })

    it('returns empty array when no categories', async () => {
      prismaMock.category.findMany.mockResolvedValue([])

      const res = await GET()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual([])
    })
  })

  // ─── PUT /api/admin/categories/[id] ──────────────────────────────────────

  describe('PUT /api/admin/categories/[id]', () => {
    const params = Promise.resolve({ id: 'cat-1' })

    it('updates a category and returns 200', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null)
      prismaMock.category.update.mockResolvedValue(
        asCategory({ id: 'cat-1', name: 'Jazz', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/categories/cat-1', {
        method: 'PUT',
        body: JSON.stringify({ CategoryName: 'Jazz' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.name).toBe('Jazz')
    })

    it('returns 400 when CategoryName is empty', async () => {
      const req = new NextRequest('http://localhost/api/admin/categories/cat-1', {
        method: 'PUT',
        body: JSON.stringify({ CategoryName: '' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('input is empty')
    })

    it('returns 400 when new name already exists', async () => {
      prismaMock.category.findFirst.mockResolvedValue(
        asCategory({ id: 'cat-2', name: 'Jazz', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/categories/cat-1', {
        method: 'PUT',
        body: JSON.stringify({ CategoryName: 'Jazz' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('this category already exist')
    })
  })

  // ─── DELETE /api/admin/categories/[id] ───────────────────────────────────

  describe('DELETE /api/admin/categories/[id]', () => {
    const params = Promise.resolve({ id: 'cat-1' })

    it('deletes a category and returns 200', async () => {
      prismaMock.category.delete.mockResolvedValue(asCategory({}))

      const req = new NextRequest('http://localhost/api/admin/categories/cat-1', {
        method: 'DELETE',
      })

      const res = await DELETE(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.message).toBe('City deleted successfully')
    })
  })
})