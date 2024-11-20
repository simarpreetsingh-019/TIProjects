const mongoose = require( 'mongoose' );

const walletBalanceSchema = new mongoose.Schema( {
  address: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true } );

const WalletBalance = mongoose.model( 'WalletBalance', walletBalanceSchema );
module.exports = WalletBalance;
