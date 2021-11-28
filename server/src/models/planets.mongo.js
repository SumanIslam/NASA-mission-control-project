const mongoose = require('mongoose');

const planetsSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
})