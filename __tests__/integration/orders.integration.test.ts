import { NextRequest } from 'next/server'
import { prismaMock } from '../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import { GET } from '@/app/api/admin/orders/route'

const asTicket = (obj: unknown) => obj as never

const mockTicket = {
  id: 'ticket-1',
  totalPrice: 150,
  quantity: 3,
  sessionId: 'session-1',
  buyerId: 'buyer-1',
  eventId: 'event-1',
  cityId: 'city-1',
  createdAt: new Date('2026-03-01T10:00:00Z'),
  updatedAt: new Date('2026-03-01T10:00:00Z'),
  event: {
    id: 'event-1',
    title: 'Rock Concert',
    price: '50',
    image: '/img.jpg',
    eventDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  buyer: {
    id: 'buyer-1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  city: {
    id: 'city-1',
    name: 'Casablanca',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

describe('Orders API - Integration', () => {
  // ─── GET /api/admin/orders ────────────────────────────────────────────────

  describe('GET /api/admin/orders', () => {
    it('returns paginated orders with 200', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest('http://localhost/api/admin/orders?page=1')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data).toHaveLength(1)
      expect(body.data[0].buyer.name).toBe('John Doe')
    })

    it('returns 400 when page is 0', async () => {
      const req = new NextRequest('http://localhost/api/admin/orders?page=0')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('page must be positive number')
    })

    it('returns 400 when page is negative', async () => {
      const req = new NextRequest('http://localhost/api/admin/orders?page=-1')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(400)
      expect(body.error).toBe('page must be positive number')
    })

    it('filters by buyer name', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest('http://localhost/api/admin/orders?page=1&search=John')
      const res = await GET(req)

      expect(res.status).toBe(200)
      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            buyer: { name: expect.objectContaining({ contains: 'John' }) },
          }),
        })
      )
    })

    it('does NOT filter by event name (known limitation - search matches buyer only)', async () => {
      prismaMock.ticket.count.mockResolvedValue(0)
      prismaMock.ticket.findMany.mockResolvedValue([])

      const req = new NextRequest('http://localhost/api/admin/orders?page=1&search=Rock Concert')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data).toHaveLength(0)
    })

    it('applies date range filter when from and to are provided', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest(
        'http://localhost/api/admin/orders?page=1&from=2026-01-01&to=2026-12-31'
      )
      const res = await GET(req)

      expect(res.status).toBe(200)
      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: expect.objectContaining({
              gte: expect.any(Date),
              lte: expect.any(Date),
            }),
          }),
        })
      )
    })

    it('does NOT apply date filter when only "from" is provided', async () => {
      prismaMock.ticket.count.mockResolvedValue(1)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest('http://localhost/api/admin/orders?page=1&from=2026-01-01')
      await GET(req)

      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({ createdAt: expect.anything() }),
        })
      )
    })

    it('returns correct pagination info', async () => {
      prismaMock.ticket.count.mockResolvedValue(14)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest('http://localhost/api/admin/orders?page=1')
      const res = await GET(req)
      const body = await res.json()

      expect(body.Pagination.totalPage).toBe(3) // ceil(14/6) = 3
      expect(body.Pagination.hasNextPage).toBe(true)
      expect(body.Pagination.hasPrevPage).toBe(false)
      expect(body.Pagination.totalItems).toBe(14)
    })

    it('returns correct hasPrevPage on page 2', async () => {
      prismaMock.ticket.count.mockResolvedValue(14)
      prismaMock.ticket.findMany.mockResolvedValue(asTicket([mockTicket]))

      const req = new NextRequest('http://localhost/api/admin/orders?page=2')
      const res = await GET(req)
      const body = await res.json()

      expect(body.Pagination.hasPrevPage).toBe(true)
      expect(body.Pagination.currentPage).toBe(2)
      expect(body.Pagination.offset).toBe(6)
    })

    it('returns empty data when no orders found', async () => {
      prismaMock.ticket.count.mockResolvedValue(0)
      prismaMock.ticket.findMany.mockResolvedValue([])

      const req = new NextRequest('http://localhost/api/admin/orders?page=1')
      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data).toHaveLength(0)
      expect(body.Pagination.totalItems).toBe(0)
      expect(body.Pagination.totalPage).toBe(0)
    })
  })
})