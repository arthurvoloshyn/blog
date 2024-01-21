/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const jsonServer = require('json-server');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'ryans-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'ryans-cert.pem')),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// It is necessary for a small delay, so that the request does not pass instantly, simulating a real api
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// Endpoint for login
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users = [] } = db;

    const userFromBd = users.find((user) => user.username === username && user.password === password);

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Check if the user is authorized
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

// Start server

const httpsServer = https.createServer(options, server);
const httpServer = http.createServer(server);

const PORT = 8443;
const HTTP_PORT = 8000;

httpsServer.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`);
});
