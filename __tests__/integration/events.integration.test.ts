import { NextRequest } from 'next/server'
import { prismaMock } from '../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/upload', () => ({ saveFile: jest.fn().mockResolvedValue('/uploads/img.jpg') }))

import { GET, POST } from '@/app/api/admin/events/route'
import { PUT, DELETE, GET as GET_BY_ID } from '@/app/api/admin/events/[id]/route'

const asEvent = (obj: unknown) => obj as never

const futureDate = new Date(Date.now() + 86400000 * 30).toISOString() // 30 days ahead

const mockEvent = {
  id: 'event-1',
  title: 'Rock Concert',
  description: 'A great show',
  location: 'Arena',
  price: '50',
  eventDate: new Date(futureDate),
  image: '/uploads/img.jpg',
  categoryId: 'cat-1',
  cityId: 'city-1',
  category: { id: 'cat-1', name: 'Music', createdAt: new Date(), updatedAt: new Date() },
  city: { id: 'city-1', name: 'Casablanca', createdAt: new Date(), updatedAt: new Date() },
  createdAt: new Date(),
  updatedAt: new Date(),
}

const buildFormData = (overrides: Record<string, string | File> = {}) => {
  const formData = new FormData()
  const defaults: Record<string, string> = {
    title: 'Rock Concert',
    description: 'A great show',
    location: 'Arena',
    price: '50',
    eventDate: futureDate,
    categoryId: 'cat-1',
    cityId: 'city-1',
  }
  const merged = { ...defaults, ...overrides }
  for (const [key, value] of Object.entries(merged)) {
    formData.append(key, value)
  }
  // default image
  if (!overrides.image) {
    formData.append('image', new File(['img'], 'img.jpg', { type: 'image/jpeg' }))
  }
  return formData
}

describe('Events API - Integration', () => {
  // ─── POST /api/admin/events ───────────────────────────────────────────────

  describe('POST /api/admin/events', () => {
    it('creates an event and returns 201', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)
      prismaMock.event.create.mockResolvedValue(asEvent(mockEvent))

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: buildFormData(),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body.title).toBe('Rock Concert')
    })

    it('returns 400 when title is missing', async () => {
      const formData = buildFormData({ title: '' })
      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: formData,
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('returns 400 when event already exists', async () => {
      prismaMock.event.findFirst.mockResolvedValue(asEvent(mockEvent))

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: buildFormData(),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('event already exist')
    })

    it('returns 400 when eventDate is in the past', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: buildFormData({ eventDate: '2020-01-01T00:00:00Z' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('Event date must be in the future')
    })

    it('returns 400 when price is negative', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: buildFormData({ price: '-10' }),
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('price is not valid')
    })

    it('returns 400 when image is missing', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const formData = new FormData()
      formData.append('title', 'Rock Concert')
      formData.append('description', 'A great show')
      formData.append('location', 'Arena')
      formData.append('price', '50')
      formData.append('eventDate', futureDate)
      formData.append('categoryId', 'cat-1')
      formData.append('cityId', 'city-1')
      // no image appended

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: formData,
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })
  })

  // ─── GET /api/admin/events ────────────────────────────────────────────────

  describe('GET /api/admin/events', () => {
    it('returns paginated events with 200', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue(asEvent([mockEvent]))

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data).toHaveLength(1)
      expect(body.data[0].title).toBe('Rock Concert')
      expect(body.Pagination.currentPage).toBe(1)
    })

    it('returns 400 when page is invalid (0)', async () => {
      const req = new NextRequest('http://localhost/api/admin/events?page=0')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('page must be positive number')
    })

    it('filters by search query', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue(asEvent([mockEvent]))

      const req = new NextRequest('http://localhost/api/admin/events?page=1&search=Rock')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(prismaMock.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            title: expect.objectContaining({ contains: 'Rock' }),
          }),
        })
      )
    })

    it('filters by categoryId', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue(asEvent([mockEvent]))

      const req = new NextRequest('http://localhost/api/admin/events?page=1&categoryId=cat-1')
      const res = await GET(req)

      expect(res.status).toBe(200)
      expect(prismaMock.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ categoryId: 'cat-1' }),
        })
      )
    })

    it('returns correct pagination info', async () => {
      prismaMock.event.count.mockResolvedValue(12)
      prismaMock.event.findMany.mockResolvedValue(asEvent([mockEvent]))

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const body = await res.json()

      expect(body.Pagination.totalPage).toBe(3)
      expect(body.Pagination.hasNextPage).toBe(true)
      expect(body.Pagination.hasPrevPage).toBe(false)
    })

    it('returns empty data when no events match', async () => {
      prismaMock.event.count.mockResolvedValue(0)
      prismaMock.event.findMany.mockResolvedValue([])

      const req = new NextRequest('http://localhost/api/admin/events?page=1&search=nonexistent')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data).toHaveLength(0)
      expect(body.Pagination.totalItems).toBe(0)
    })
  })

  // ─── GET /api/admin/events/[id] ───────────────────────────────────────────

  describe('GET /api/admin/events/[id]', () => {
    const params = Promise.resolve({ id: 'event-1' })

    it('returns a single event by id', async () => {
      prismaMock.event.findUnique.mockResolvedValue(asEvent(mockEvent))

      const req = new NextRequest('http://localhost/api/admin/events/event-1')
      const res = await GET_BY_ID(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.title).toBe('Rock Concert')
    })

    it('returns null when event not found', async () => {
      prismaMock.event.findUnique.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events/not-found')
      const res = await GET_BY_ID(req, { params })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toBeNull()
    })
  })

  // ─── PUT /api/admin/events/[id] ───────────────────────────────────────────

  describe('PUT /api/admin/events/[id]', () => {
    const params = Promise.resolve({ id: 'event-1' })

    it('updates an event and returns 201', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)
      prismaMock.event.findUnique.mockResolvedValue(asEvent(mockEvent))
      prismaMock.event.update.mockResolvedValue(asEvent({ ...mockEvent, title: 'Updated Concert' }))

      const req = new NextRequest('http://localhost/api/admin/events/event-1', {
        method: 'PUT',
        body: buildFormData({ title: 'Updated Concert' }),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body.title).toBe('Updated Concert')
    })

    it('returns 400 when required field is missing', async () => {
      const req = new NextRequest('http://localhost/api/admin/events/event-1', {
        method: 'PUT',
        body: buildFormData({ title: '' }),
      })

      const res = await PUT(req, { params })
      expect(res.status).toBe(400)
    })

    it('returns 400 when title already taken by another event', async () => {
      prismaMock.event.findFirst.mockResolvedValue(
        asEvent({ ...mockEvent, id: 'event-2', title: 'Rock Concert' })
      )

      const req = new NextRequest('http://localhost/api/admin/events/event-1', {
        method: 'PUT',
        body: buildFormData(),
      })

      const res = await PUT(req, { params })
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('event already exist')
    })
  })

  // ─── DELETE /api/admin/events/[id] ────────────────────────────────────────

  describe('DELETE /api/admin/events/[id]', () => {
    const params = Promise.resolve({ id: 'event-1' })

    it('deletes an event and returns 200', async () => {
      prismaMock.event.delete.mockResolvedValue(asEvent({}))

      const req = new NextRequest('http://localhost/api/admin/events/event-1', {
        method: 'DELETE',
      })

      const res = await DELETE(req, { params })
      expect(res.status).toBe(200)
    })
  })
})