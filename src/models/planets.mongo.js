const mongoose = require('mongoose');

const planetsSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
});

// Connects planetsSchema with 'planets' Model
module.exports = mongoose.model('Planet', planetsSchema);
