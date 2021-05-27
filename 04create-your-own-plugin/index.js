// Create a logger like object we can use throughout
function createLogger(loglevel) {
  const result = {},
    levels = ['debug', 'info', 'warn', 'error'];

  levels.forEach((level, index) => {
    if (index < levels.indexOf(loglevel)) {
      result[level] = () => {};
    } else {
      result[level] = function () {
        const args = Array.prototype.slice.call(arguments),
          message = require('util').format.apply(this, args);

        // Anything written to stdout that starts with a log level and a space
        // will be written to the mountebank logs.
        console.log(`${level} ${message}`);
      };
    }
  });
  return result;
}

let callbackURL;

// Mountebank passes a JSON object on the command line (in this case, the second parameter,
// since the createCommand is node index.js JSON-OBJECT
const config = JSON.parse(process.argv[2]),
  logger = createLogger(config.loglevel),
  tcpServer = require('./server');

tcpServer.createServer(config, logger).then(
  (server) => {
    // Since the protocol implementation can set the port, we have to replace that in the callbackURL
    callbackURL = config.callbackURLTemplate.replace(':port', server.port);

    const metadata = server.metadata;
    metadata.port = server.port;
    metadata.encoding = 'utf8';

    // As soon as we write to stdout, mountebank assumes we've fully initialized
    // If we write a JSON object, mountebank will capture all the metadata
    console.log(JSON.stringify(metadata));
  },
  (error) => {
    console.error(JSON.stringify(error));
    // Be sure to exit with a non-zero exit code
    process.exit(1);
  }
);
