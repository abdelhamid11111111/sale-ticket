import { NextRequest } from 'next/server'
import { prismaMock } from '../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import { GET, POST } from '@/app/api/admin/cities/route'
import { PUT, DELETE } from '@/app/api/admin/cities/[id]/route'

const asCity = (obj: unknown) => obj as never

describe('Cities API - Integration', () => {
  // ─── POST /api/admin/cities ───────────────────────────────────────────────

  describe('POST /api/admin/cities', () => {
    it('creates a city and returns 201', async () => {
      prismaMock.city.findFirst.mockResolvedValue(null)
      prismaMock.city.create.mockResolvedValue(
        asCity({ id: 'city-1', name: 'Casablanca', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/cities', {
        method: 'POST',
        body: JSON.stringify({ CityName: 'Casablanca' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body.name).toBe('Casablanca')
    })

    it('returns 400 when CityName is empty', async () => {
      const req = new NextRequest('http://localhost/api/admin/cities', {
        method: 'POST',
        body: JSON.stringify({ CityName: '' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('input is empty')
    })

    it('returns 400 when CityName is only whitespace', async () => {
      const req = new NextRequest('http://localhost/api/admin/cities', {
        method: 'POST',
        body: JSON.stringify({ CityName: '   ' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('input is empty')
    })

    it('returns 400 when CityName is missing', async () => {
      const req = new NextRequest('http://localhost/api/admin/cities', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('returns 400 when city already exists', async () => {
      prismaMock.city.findFirst.mockResolvedValue(
        asCity({ id: 'city-1', name: 'Casablanca', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/cities', {
        method: 'POST',
        body: JSON.stringify({ CityName: 'Casablanca' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('this name already exist')
    })
  })

  // ─── GET /api/admin/cities ────────────────────────────────────────────────

  describe('GET /api/admin/cities', () => {
    it('returns list of cities with 200', async () => {
      prismaMock.city.findMany.mockResolvedValue(
        asCity([
          { id: 'city-1', name: 'Casablanca', createdAt: new Date(), updatedAt: new Date() },
          { id: 'city-2', name: 'Rabat', createdAt: new Date(), updatedAt: new Date() },
        ])
      )

      const res = await GET()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toHaveLength(2)
      expect(body[0].name).toBe('Casablanca')
    })

    it('returns empty array when no cities exist', async () => {
      prismaMock.city.findMany.mockResolvedValue([])

      const res = await GET()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual([])
    })
  })

  // ─── PUT /api/admin/cities/[id] ───────────────────────────────────────────

  describe('PUT /api/admin/cities/[id]', () => {
    const params = Promise.resolve({ id: 'city-1' })

    it('updates a city and returns 200', async () => {
      prismaMock.city.findFirst.mockResolvedValue(null)
      prismaMock.city.update.mockResolvedValue(
        asCity({ id: 'city-1', name: 'Fes', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/cities/city-1', {
        method: 'PUT',
        body: JSON.stringify({ CityName: 'Fes' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.name).toBe('Fes')
    })

    it('returns 400 when CityName is empty', async () => {
      const req = new NextRequest('http://localhost/api/admin/cities/city-1', {
        method: 'PUT',
        body: JSON.stringify({ CityName: '' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('input is empty')
    })

    it('returns 400 when city name already exists', async () => {
      prismaMock.city.findFirst.mockResolvedValue(
        asCity({ id: 'city-2', name: 'Fes', createdAt: new Date(), updatedAt: new Date() })
      )

      const req = new NextRequest('http://localhost/api/admin/cities/city-1', {
        method: 'PUT',
        body: JSON.stringify({ CityName: 'Fes' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('is city already exist')
    })
  })

  // ─── DELETE /api/admin/cities/[id] ────────────────────────────────────────

  describe('DELETE /api/admin/cities/[id]', () => {
    const params = Promise.resolve({ id: 'city-1' })

    it('deletes a city and returns 200', async () => {
      prismaMock.city.delete.mockResolvedValue(asCity({}))

      const req = new NextRequest('http://localhost/api/admin/cities/city-1', {
        method: 'DELETE',
      })

      const res = await DELETE(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.message).toBe('City deleted successfully')
    })
  })
})