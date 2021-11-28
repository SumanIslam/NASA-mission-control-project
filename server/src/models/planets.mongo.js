const mongoose = require('mongoose');

const planetsSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
});

// Connects planetsSchema with 'planets' Model
const planetsModel = mongoose.model('Planet', planetsSchema);

module.exports = planetsModel;