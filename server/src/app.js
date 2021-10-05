const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.routers');

const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('combined'))
app.use(express.json());

// serving static file using express middleware
app.use(express.static(path.join(__dirname, '..','public')))

// Routes
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'index.html'));
});

module.exports = app;