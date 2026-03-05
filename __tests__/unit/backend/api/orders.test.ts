import { prismaMock } from '../../../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

import { GET } from '@/app/api/admin/orders/route'
import { NextRequest } from 'next/server'

const asTicket = (obj: unknown) => obj as never

const mockTicket = {
  id: '1',
  quantity: 2,
  totalPrice: { toNumber: () => 100, toString: () => '100' },
  sessionId: 'session-1',
  createdAt: new Date(),
  eventId: 'event1',
  buyerId: 'buyer1',
  cityId: 'city1',
  event: {
    id: 'event1',
    title: 'Mavericks vs Suns',
    description: 'NBA Game',
    location: 'Arena',
    price: { toNumber: () => 50, toString: () => '50' },
    eventDate: new Date(),
    image: '/uploads/test.jpg',
    categoryId: 'cat1',
    cityId: 'city1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  buyer: {
    id: 'buyer1',
    name: 'WIN',
    email: 'win@test.com',
    phone: '0646283546',
    createdAt: new Date(),
  },
  city: {
    id: 'city1',
    name: 'Tangier',
    createdAt: new Date(),
  },
}

describe('Orders API - Unit', () => {
  describe('GET /api/admin/orders', () => {
    it('should return paginated orders', async () => {
      prismaMock.ticket.count.mockResolvedValue(2)
      prismaMock.ticket.findMany.mockResolvedValue(
        asTicket([mockTicket, { ...mockTicket, id: '2' }])
      )

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=&from=&to='
      )
      const res = await GET(req)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.data).toHaveLength(2)
      expect(data.Pagination.currentPage).toBe(1)
    })

    it('should return 400 for invalid page', async () => {
      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=0'
      )
      const res = await GET(req)
      expect(res.status).toBe(400)
    })

    it('should filter orders by buyer name only not event name', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=WIN&from=&to='
      )
      await GET(req)

      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            buyer: {
              name: { contains: 'WIN', mode: 'insensitive' },
            },
          }),
        })
      )
    })

    it('should NOT find Mavericks when searching by event name', async () => {
      prismaMock.ticket.count.mockResolvedValue(0)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([]))

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=Mavericks&from=&to='
      )
      const res = await GET(req)
      const data = await res.json()

      // search is buyer name only so Mavericks (event name) returns 0
      expect(data.data).toHaveLength(0)

      // confirm where condition searches buyer name not event title
      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            buyer: {
              name: { contains: 'Mavericks', mode: 'insensitive' },
            },
          }),
        })
      )
    })

    it('should filter orders by date range', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const from = '2026-03-01'
      const to = '2026-03-31'

      const req = new NextRequest(
        `http://localhost/api/admin/orders?page=1&search=&from=${from}&to=${to}`
      )
      await GET(req)

      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: {
              gte: new Date(from),
              lte: new Date(to),
            },
          }),
        })
      )
    })

    it('should not apply date filter when from or to is missing', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=&from=&to='
      )
      await GET(req)

      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({
            createdAt: expect.anything(),
          }),
        })
      )
    })

    it('should return correct pagination info', async () => {
      prismaMock.ticket.count.mockResolvedValue(12)
      prismaMock.ticket.findMany.mockResolvedValue(
        asTicket(Array(6).fill(mockTicket))
      )

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=&from=&to='
      )
      const res = await GET(req)
      const data = await res.json()

      expect(data.Pagination.totalPage).toBe(2) // 12 items / 6 per page
      expect(data.Pagination.hasNextPage).toBe(true)
      expect(data.Pagination.hasPrevPage).toBe(false)
    })

    it('should return hasPrevPage true on page 2', async () => {
      prismaMock.ticket.count.mockResolvedValue(12)
      prismaMock.ticket.findMany.mockResolvedValue(
        asTicket(Array(6).fill(mockTicket))
      )

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=2&search=&from=&to='
      )
      const res = await GET(req)
      const data = await res.json()

      expect(data.Pagination.hasPrevPage).toBe(true)
      expect(data.Pagination.hasNextPage).toBe(false)
    })

    it('should return empty data when no orders found', async () => {
      prismaMock.ticket.count.mockResolvedValue(0)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([]))

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&search=&from=&to='
      )
      const res = await GET(req)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.data).toHaveLength(0)
    })
  })
})