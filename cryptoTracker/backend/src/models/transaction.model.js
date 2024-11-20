const mongoose = require( 'mongoose' );

const transactionSchema = new mongoose.Schema( {
  transactionId: { type: String, required: true, unique: true },
  hash: { type: String, required: true, index: true }, // Indexed for faster querying by hash
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  block: { type: String, required: true },
  timestamp: { type: Date, required: true, index: true },
  level: { type: Number, required: true }, // Additional field: level
  status: { type: String, required: true }, // Additional field: status (e.g., applied, failed)
  gasUsed: { type: Number }, // Additional field: gas used in the transaction
  storageUsed: { type: Number }, // Additional field: storage used by the transaction
  bakerFee: { type: Number }, // Additional field: baker fee in Tez (ꜩ)
}, { timestamps: true } );

const Transaction = mongoose.model( 'Transaction', transactionSchema );
module.exports = Transaction;
