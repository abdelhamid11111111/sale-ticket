import { prismaMock } from '../../../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

import { POST } from '@/app/api/usrUI/tickets/route'
import { NextRequest } from 'next/server'

const asTicket = (obj: unknown) => obj as never

const mockTicket = {
  id: '1',
  quantity: 2,
  totalPrice: { toNumber: () => 100, toString: () => '100' },
  sessionId: 'session-123',
  createdAt: new Date(),
  eventId: 'event1',
  buyerId: 'buyer1',
  cityId: 'city1',
}

const validBody = {
  buyerId: 'buyer1',
  cityId: 'city1',
  eventId: 'event1',
  sessionId: 'session-123',
  totalPrice: 100,
  quantity: 2,
}

describe('Tickets API - Unit', () => {
  describe('POST /api/usrUI/tickets', () => {
    it('should create a ticket successfully', async () => {
      prismaMock.ticket.create.mockResolvedValue(asTicket(mockTicket))

      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify(validBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(201)
      expect(data.ticketId).toBe('1')
    })

    it('should return 400 if buyerId is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, buyerId: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if cityId is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, cityId: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if eventId is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, eventId: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if sessionId is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, sessionId: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if totalPrice is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, totalPrice: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should return 400 if quantity is missing', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...validBody, quantity: undefined }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it('should call prisma create with correct data', async () => {
      prismaMock.ticket.create.mockResolvedValue(asTicket(mockTicket))

      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify(validBody),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(req)

      expect(prismaMock.ticket.create).toHaveBeenCalledWith({
        data: {
          buyerId: 'buyer1',
          cityId: 'city1',
          eventId: 'event1',
          sessionId: 'session-123',
          totalPrice: 100,
          quantity: 2,
        },
      })
    })

    it('should return 400 if body is completely empty', async () => {
      const req = new NextRequest('http://localhost/api/usrUI/tickets', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })
  })
})