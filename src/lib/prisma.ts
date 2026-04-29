import { PrismaClient } from "@/generated/prisma/client";

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientInstance | undefined;
};

export const prisma: PrismaClientInstance =
  globalForPrisma.prisma ??
  new (PrismaClient as unknown as new () => PrismaClientInstance)();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
