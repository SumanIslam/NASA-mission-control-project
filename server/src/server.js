const http = require('http');

require('dotenv').config()

const app = require('./app');

const { mongoConnect } = require('./services/mongo.js');
const { loadPlanets } = require('../src/models/planets.model');
const { loadLaunchData } = require('../src/models/launches.model');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanets();
  await loadLaunchData();

  server.listen(PORT, () => {
    try  {
      console.log(`server is running on port ${PORT}...`);
    } catch(err) {
      console.log(err.message);
    }
  })
};

startServer();
