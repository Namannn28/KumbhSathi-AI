import { PrismaClient } from "@prisma/client";

async function test() {
  console.log("Starting DB Connection test...");
  console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  try {
    await prisma.$connect();
    console.log("✅ Successful connection!");
    const count = await prisma.location.count();
    console.log("Current location count:", count);
  } catch (err: any) {
    console.error("❌ Connection failed!");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
