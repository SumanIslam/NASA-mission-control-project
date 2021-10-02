const path = require('path');
const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use()
app.use(express.json());

// serving static file using express middleware
app.use(express.static(path.join(__dirname, '..','public')))

// Routes
app.use(planetsRouter)


module.exports = app;