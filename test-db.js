const { Client } = require('pg');

async function testConn() {
  // Test pooler with transaction mode (port 6543)
  const connectionString = 'postgresql://postgres.tstkjavbwzmiivjjyiln:Naman_2005%40%40%40@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require';
  console.log("Connecting to pooler URL:", connectionString.replace(/Naman_2005.*/, 'XXX'));
  
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Successfully connected to the database via pooler!");
    const res = await client.query('SELECT COUNT(*) FROM "User"');
    console.log("Total users in database:", res.rows[0].count);
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.end();
  }
}

testConn();
