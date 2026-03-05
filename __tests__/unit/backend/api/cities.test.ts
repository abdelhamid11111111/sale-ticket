import { prismaMock } from '../../../../__mocks__/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

import { POST, GET } from '@/app/api/admin/cities/route'
import { NextRequest } from 'next/server'

describe('Cities API - Unit', () => {

  describe("POST /api/admin/cities", () => {
    
    it("should create a city successfully", async () => {
      prismaMock.city.findFirst.mockResolvedValue(null);
      prismaMock.city.create.mockResolvedValue({
        id: "1",
        name: "Casablanca",
        createdAt: new Date(),
      });

      const req = new NextRequest("http://localhost/api/admin/cities", {
        method: "POST",
        body: JSON.stringify({ CityName: "Casablanca" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.name).toBe("Casablanca");
    });

    it("should return 400 if city name is empty", async () => {
      const req = new NextRequest("http://localhost/api/admin/cities", {
        method: "POST",
        body: JSON.stringify({ CityName: "" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("should return 400 if city already exists", async () => {
      prismaMock.city.findFirst.mockResolvedValue({
        id: "1",
        name: "Casablanca",

        createdAt: new Date(),
      });

      const req = new NextRequest("http://localhost/api/admin/cities", {
        method: "POST",
        body: JSON.stringify({ CityName: "Casablanca" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/admin/cities", () => {
    it("should return list of cities", async () => {
      prismaMock.city.findMany.mockResolvedValue([
        { id: "1", name: "Casablanca", 
        createdAt: new Date(), },
        { id: "2", name: "Rabat", 
        createdAt: new Date(), },
      ]);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveLength(2);
    });
  });
});
