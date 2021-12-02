const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanets } = require('../src/models/planets.model');

const PORT = process.env.PORT || 5000;

const MONGO_URL = 'mongodb+srv://nasa-api:dvqACJDfrdgH60Rq@sandbox.ccsps.mongodb.net/nasa?retryWrites=true&w=majority&ssl=true'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready');
})

mongoose.connection.on('error', (err) => {
  console.error(err);
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
  });
};
startServer();
