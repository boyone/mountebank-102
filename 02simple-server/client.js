const net = require('net');

const client = new net.Socket();
client.connect({ port: 3000 }, "", () => {
  client.write(`World!\r\n`);
});
client.on('data', (data) => {
  console.log(`Server says: ${data.toString('utf-8')}`);
  client.destroy();
});