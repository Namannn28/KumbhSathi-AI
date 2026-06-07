const dns = require('dns');
const net = require('net');

async function run() {
  const host = 'db.tstkjavbwzmiivjjyiln.supabase.co';
  console.log(`Resolving ${host} using dns.lookup...`);
  
  dns.lookup(host, { all: true }, (err, addresses) => {
    if (err) {
      console.log('Lookup error:', err.message);
    } else {
      console.log('Addresses:', addresses);
    }
  });

  console.log(`Connecting to ${host}:5432...`);
  const socket = new net.Socket();
  socket.setTimeout(5000);
  
  socket.on('connect', () => {
    console.log('Connected successfully!');
    socket.destroy();
  });
  
  socket.on('timeout', () => {
    console.log('Connection timed out.');
    socket.destroy();
  });
  
  socket.on('error', (err) => {
    console.log('Connection error:', err.message, err.code);
  });
  
  socket.connect(5432, host);
}

run();
