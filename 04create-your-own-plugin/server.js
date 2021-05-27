const net = require('net');

// what {"name": "World!"}
// where http://localhost:2525/imposters/3000/_requests
function postJSON(request, where) {
  const url = require('url'),
    parts = url.parse(where),
    driver = require(parts.protocol.replace(':', '')),
    options = {
      hostname: parts.hostname,
      port: parts.port,
      path: parts.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
  return new Promise((resolve, reject) => {
    const http = driver.request(options, (response) => {
      const packets = [];
      response.on('data', (chunk) => {
        packets.push(chunk);
      });
      response.on('end', () => {
        const buffer = Buffer.concat(packets),
          body = buffer.toString('utf8');

        if (response.statusCode !== 200) {
          reject({
            statusCode: response.statusCode,
            body: body,
          });
        } else {
          resolve(JSON.parse(body));
        }
      });
    });

    http.on('error', reject);
    http.write(JSON.stringify(request));
    http.end();
  });
}

// A use-once date server. Clients get the date on connection and that's it!
function createServer(options, logger) {
  const encoding = 'utf8';
  const server = net.createServer((socket) => {
    socket.on('data', async (buffer) => {
      const createFrom = require('./request');
      const name = createFrom(buffer.toString(encoding));
      logger.debug('request => %s', JSON.stringify(name));
      const where = 'http://localhost:2525/imposters/3000/_requests';

      const mbResponse = await postJSON(name, where);
      socket.write(mbResponse.response.data);

      // postJSON(name, where, logger).then(resp => {
      //   logger.debug("response '%s'", JSON.stringify(resp));
      //   socket.write(resp.response.data);
      // });
    });

    socket.on('end', () => {
      console.log('Closed', socket.remoteAddress, 'port', socket.remotePort);
    });
  });

  return new Promise((resolve, reject) => {
    server.listen(options.port || 0, () => {
      resolve({
        port: server.address().port,
        metadata: {},
        close: (callback) => {
          server.close(() => {
            callback();
          });
        },
      });
    });
  });
}

module.exports = {
  testRequest: { data: 'test' },
  testProxyResponse: { data: '' },
  createServer: createServer,
};
