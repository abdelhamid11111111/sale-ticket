import { prismaMock } from '../../../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

jest.mock('@/lib/upload', () => ({
  saveFile: jest.fn().mockResolvedValue('/uploads/test-image.jpg'),
}))

import { POST, GET } from '@/app/api/admin/events/route'
import { NextRequest } from 'next/server'

const mockEvent = {
  id: '1',
  title: 'F1 Movie',
  description: 'A great movie',
  location: 'Cinema City',
  price: { toNumber: () => 50, toString: () => '50' },
  eventDate: new Date(Date.now() + 86400000),
  image: '/uploads/test.jpg',
  categoryId: 'cat1',
  cityId: 'city1',
  createdAt: new Date(),
  updatedAt: new Date(),
  category: { id: 'cat1', name: 'Cinema', createdAt: new Date() },
  city: { id: 'city1', name: 'Casablanca', createdAt: new Date() },
}

const createFormData = (overrides: Record<string, string> = {}) => {
  const formData = new FormData()
  const defaults: Record<string, string> = {
    title: 'F1 Movie',
    description: 'A great movie',
    location: 'Cinema City',
    price: '50',
    eventDate: new Date(Date.now() + 86400000).toISOString(),
    categoryId: 'cat1',
    cityId: 'city1',
    ...overrides,
  }
  Object.entries(defaults).forEach(([k, v]) => formData.append(k, v))

  // add a mock image file
  const blob = new Blob(['image'], { type: 'image/jpeg' })
  const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })
  formData.append('image', file)

  return formData
}

describe('Events API - Unit', () => {
  describe('POST /api/admin/events', () => {
    it('should create an event successfully', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)
      prismaMock.event.create.mockResolvedValue(mockEvent as unknown as never)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: createFormData(),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(201)
      expect(data.title).toBe('F1 Movie')
    })

    it('should return 400 if title is missing', async () => {
      const formData = new FormData()
      formData.append('description', 'A great movie')
      formData.append('location', 'Cinema City')
      formData.append('price', '50')
      formData.append('eventDate', new Date(Date.now() + 86400000).toISOString())
      formData.append('categoryId', 'cat1')
      formData.append('cityId', 'city1')

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: formData,
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if event already exists', async () => {
      prismaMock.event.findFirst.mockResolvedValue(mockEvent  as unknown as never)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: createFormData(),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('event already exist')
    })

    it('should return 400 if event date is in the past', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: createFormData({
          eventDate: new Date(Date.now() - 86400000).toISOString(), // yesterday
        }),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('Event date must be in the future')
    })

    it('should return 400 if price is negative', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: createFormData({ price: '-10' }),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('price is not valid')
    })

    it('should return 400 if price is not a number', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: createFormData({ price: 'abc' }),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('price is not valid')
    })

    it('should return 400 if no image is provided', async () => {
      prismaMock.event.findFirst.mockResolvedValue(null)

      // formData without image
      const formData = new FormData()
      formData.append('title', 'F1 Movie')
      formData.append('description', 'A great movie')
      formData.append('location', 'Cinema City')
      formData.append('price', '50')
      formData.append('eventDate', new Date(Date.now() + 86400000).toISOString())
      formData.append('categoryId', 'cat1')
      formData.append('cityId', 'city1')

      const req = new NextRequest('http://localhost/api/admin/events', {
        method: 'POST',
        body: formData,
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })
  })

  describe('GET /api/admin/events', () => {
    it('should return paginated events', async () => {
      prismaMock.event.count.mockResolvedValue(2)
      prismaMock.event.findMany.mockResolvedValue([
        mockEvent  as unknown as never ,
        { ...mockEvent, id: '2', title: 'Marty Supreme' }  as unknown as never,
      ])

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.data).toHaveLength(2)
      expect(data.Pagination.currentPage).toBe(1)
    })

    it('should return 400 for page less than 1', async () => {
      const req = new NextRequest('http://localhost/api/admin/events?page=0')
      const res = await GET(req)
      expect(res.status).toBe(400)
    })

    it('should filter by search title', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue([mockEvent  as unknown as never])

      const req = new NextRequest(
        'http://localhost/api/admin/events?page=1&search=F1'
      )
      await GET(req)

      expect(prismaMock.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            title: { contains: 'F1', mode: 'insensitive' },
          }),
        })
      )
    })

    it('should filter by categoryId', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue([mockEvent  as unknown as never])

      const req = new NextRequest(
        'http://localhost/api/admin/events?page=1&categoryId=cat1'
      )
      await GET(req)

      expect(prismaMock.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            categoryId: 'cat1',
          }),
        })
      )
    })

    it('should filter by both search and categoryId', async () => {
      prismaMock.event.count.mockResolvedValue(1)
      prismaMock.event.findMany.mockResolvedValue([mockEvent as unknown as never])

      const req = new NextRequest(
        'http://localhost/api/admin/events?page=1&search=F1&categoryId=cat1'
      )
      await GET(req)

      expect(prismaMock.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            categoryId: 'cat1',
            title: { contains: 'F1', mode: 'insensitive' },
          },
        })
      )
    })

    it('should return correct pagination info', async () => {
      prismaMock.event.count.mockResolvedValue(12)
      prismaMock.event.findMany.mockResolvedValue(
        Array(5).fill(mockEvent)
      )

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const data = await res.json()

      expect(data.Pagination.totalPage).toBe(3) // 12 items / 5 per page
      expect(data.Pagination.hasNextPage).toBe(true)
      expect(data.Pagination.hasPrevPage).toBe(false)
    })

    it('should return hasNextPage false on last page', async () => {
      prismaMock.event.count.mockResolvedValue(5)
      prismaMock.event.findMany.mockResolvedValue(
        Array(5).fill(mockEvent) 
      )

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const data = await res.json()

      expect(data.Pagination.hasNextPage).toBe(false)
      expect(data.Pagination.hasPrevPage).toBe(false)
    })

    it('should return hasPrevPage true on page 2', async () => {
      prismaMock.event.count.mockResolvedValue(10)
      prismaMock.event.findMany.mockResolvedValue(
        Array(5).fill(mockEvent) 
      )

      const req = new NextRequest('http://localhost/api/admin/events?page=2')
      const res = await GET(req)
      const data = await res.json()

      expect(data.Pagination.hasPrevPage).toBe(true)
    })

    it('should return empty data when no events found', async () => {
      prismaMock.event.count.mockResolvedValue(0)
      prismaMock.event.findMany.mockResolvedValue([])

      const req = new NextRequest('http://localhost/api/admin/events?page=1')
      const res = await GET(req)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.data).toHaveLength(0)
      expect(data.Pagination.totalPage).toBe(0)
    })
  })
})