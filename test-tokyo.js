const { PrismaClient } = require('@prisma/client');

async function testTokyo() {
  const host = 'aws-0-ap-northeast-1.pooler.supabase.com';
  const url = `postgresql://postgres.tstkjavbwzmiivjjyiln:Naman_2005%40%40%40@${host}:6543/postgres?pgbouncer=true&connection_limit=1`;
  console.log(`Connecting to Tokyo pooler: ${host}`);
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });
  
  try {
    const count = await prisma.user.count();
    console.log(`\n🎉 SUCCESS! Connected to Tokyo. Total users:`, count);
  } catch (err) {
    console.log('Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testTokyo();
