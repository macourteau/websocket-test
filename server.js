const http = require('http');
const websocket = require('websocket');
const static = require('node-static');

const staticFileServer = new static.Server('./');

const server = http.createServer((request, response) => {
  request.addListener('end', () => {
    staticFileServer.serve(request, response);
  }).resume();
});

const port = parseInt(process.env['PORT'] || '3000');

server.listen(port, () => {
  console.log(`Listening for connections on http://localhost:${port}`);
});

const websocketServer = new websocket.server({httpServer: server});

websocketServer.on('request', request => {
  const connection = request.accept(null, request.origin);
  connection.on('message', message => {
    // Convert the request to uppercase and send it back.
    connection.sendUTF(message.utf8Data.toUpperCase());
  });
});
