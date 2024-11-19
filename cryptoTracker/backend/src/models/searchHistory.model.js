// models/SearchHistory.js
const mongoose = require( 'mongoose' );

const searchHistorySchema = new mongoose.Schema( {
  query: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [ 'address', 'transaction' ],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  result: {
    type: Boolean,
    required: true,
  }
} );

// Index for faster queries and to automatically delete old entries
searchHistorySchema.index( { timestamp: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 } ); // Expire after 7 days

module.exports = mongoose.model( 'SearchHistory', searchHistorySchema );
