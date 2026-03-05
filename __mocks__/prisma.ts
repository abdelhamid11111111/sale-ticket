import { mockDeep, mockReset } from 'jest-mock-extended'
import type { PrismaClient } from '../lib/generated/prisma/client'

export const prismaMock = mockDeep<PrismaClient>()

beforeEach(() => {
  mockReset(prismaMock)
})