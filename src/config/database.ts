import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient()

export let prisma: PrismaClient;

export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
