const dns = require('dns');
const net = require('net');
const { PrismaClient } = require('@prisma/client');

const regions = [
  'ap-south-1',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'sa-east-1',
  'ca-central-1'
];

async function checkRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  
  // 1. Resolve host
  const ip = await new Promise((resolve) => {
    dns.lookup(host, (err, address) => {
      if (err) resolve(null);
      else resolve(address);
    });
  });
  
  if (!ip) {
    console.log(`Region ${region}: DNS lookup failed for ${host}`);
    return;
  }
  
  // 2. Check TCP ports 5432 and 6543
  const checkPort = (port) => new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.on('connect', () => { socket.destroy(); resolve(true); });
    socket.on('timeout', () => { socket.destroy(); resolve(false); });
    socket.on('error', () => { socket.destroy(); resolve(false); });
    socket.connect(port, host);
  });
  
  const port5432 = await checkPort(5432);
  const port6543 = await checkPort(6543);
  
  console.log(`Region ${region}: IP = ${ip}, Port 5432 = ${port5432}, Port 6543 = ${port6543}`);
  
  if (port5432 || port6543) {
    const port = port6543 ? 6543 : 5432;
    const url = `postgresql://postgres.tstkjavbwzmiivjjyiln:Naman_2005%40%40%40@${host}:${port}/postgres?pgbouncer=true&connection_limit=1`;
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      const count = await prisma.user.count();
      console.log(`\n🎉 🎉 🎉 SUCCESS! Connected to region ${region} on port ${port}. Total users:`, count);
      process.exit(0);
    } catch (err) {
      console.log(`Region ${region}: Prisma error on port ${port}: ${err.message.split('\n')[0]}`);
    } finally {
      await prisma.$disconnect();
    }
  }
}

async function run() {
  console.log("Starting full region check...");
  for (const region of regions) {
    await checkRegion(region);
  }
  console.log("Finished all region checks.");
}

run();
