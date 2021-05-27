const net = require('net');

// A use-once date server. Clients get the date on connection and that's it!
const server = net.createServer((socket) => {
  console.log(socket.address());

  socket.on('data', buffer => {
    console.log(buffer);
    socket.write("Hello, " + buffer);
  });
});

server.listen(3000);
