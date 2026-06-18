import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const url = process.env.DATABASE_URL
if (!url) {
  throw new Error("DATABASE_URL is required")
}

function createPrismaClient(): PrismaClient {
  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url })
  }
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
