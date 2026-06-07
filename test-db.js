const { PrismaClient } = require('@prisma/client');

async function checkRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const url = `postgresql://postgres.tstkjavbwzmiivjjyiln:Naman_2005%40%40%40@${host}:6543/postgres?pgbouncer=true&connection_limit=1`;
  console.log(`Checking region ${region} with url:`, url.replace(/Naman_2005.*/, 'XXX'));
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });
  
  try {
    const count = await prisma.user.count();
    console.log(`🎉 SUCCESS! Connected to ${region}. Total users:`, count);
  } catch (err) {
    console.log(`Error for ${region}:`);
    console.log(err.message || err);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  await checkRegion('us-east-1');
  await checkRegion('us-east-2');
}

run();
