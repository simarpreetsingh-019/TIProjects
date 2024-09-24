const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  address: { type: String, required: true },
  caseName: { type: String, required: true },
  event: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  result: { type: String, required: true },
});

module.exports = mongoose.model('Log', logSchema);
