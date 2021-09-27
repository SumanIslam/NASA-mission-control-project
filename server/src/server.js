const http = require('http');
const app = require('./app');

const { loadPlanets } = require('../src/models/planets.model')

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
  });
};
startServer();
