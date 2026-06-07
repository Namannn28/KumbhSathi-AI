const { PrismaClient } = require('@prisma/client');

async function testConn() {
  process.env.DATABASE_URL = 'postgresql://postgres.tstkjavbwzmiivjjyiln:Naman_2005%40%40%40@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';
  console.log("Connecting using Prisma with DATABASE_URL:", process.env.DATABASE_URL.replace(/Naman_2005.*/, 'XXX'));
  
  const prisma = new PrismaClient();
  
  try {
    const count = await prisma.user.count();
    console.log("Successfully connected! Total users in database:", count);
  } catch (err) {
    console.error("Prisma connection failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConn();
