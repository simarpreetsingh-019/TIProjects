// routes/bitcoin.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Load environment variables
const BlockCypher_APIKEY = process.env.BLOCKCYPHER_API_KEY;

// Function to add delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Endpoint to get Bitcoin transactions for a specific date using BlockCypher
router.get("/txbyDate", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res
      .status(400)
      .json({ error: "Please provide a date in YYYY-MM-DD format" });
  }

  try {
    // Set headers for server-sent events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const startDate = new Date(date).setUTCHours(0, 0, 0, 0) / 1000;
    const endDate = new Date(date).setUTCHours(23, 59, 59, 999) / 1000;

    // BlockCypher provides transaction data by address, not by block range directly
    // To get all transactions for a day, you would need to analyze the blockchain or integrate further.

    // Note: This is a simplified representation for proof of concept purposes
    res.write(
      `event: done\ndata: "Fetching transactions by date is not directly supported for Bitcoin"\n\n`
    );
    res.end();
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Endpoint to get Bitcoin transaction details by transaction hash
router.get("/tx", async (req, res) => {
  const txHash = req.query.tx_hash;

  if (!txHash) {
    return res.status(400).json({ error: "Please provide a transaction hash" });
  }

  let retryCount = 0;
  let maxRetries = 5;

  while (retryCount < maxRetries) {
    try {
      // Use BlockCypher API to get transaction details
      const blockCypherUrl = `https://api.blockcypher.com/v1/btc/main/txs/${txHash}?token=${BlockCypher_APIKEY}`;
      const response = await axios.get(blockCypherUrl);

      if (response.data) {
        const txData = response.data;

        // Extract necessary details
        const transactionDetails = {
          hash: txData.hash,
          from: txData.inputs.map((input) => input.addresses).flat(),
          to: txData.outputs.map((output) => output.addresses).flat(),
          amount: txData.total / 1e8, // Convert from satoshis to BTC
          blockHeight: txData.block_height,
          confirmed: txData.confirmed,
        };

        return res.json(transactionDetails);
      } else {
        return res.status(404).json({ error: "Transaction not found" });
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Too many requests, wait before retrying
        retryCount++;
        console.log(`Rate limit hit. Retrying ${retryCount}/${maxRetries}...`);
        await sleep(2000); // Wait for 2 seconds before retrying
      } else {
        console.error("Error fetching transaction:", error.message);
        return res
          .status(500)
          .json({ error: "Failed to fetch transaction details" });
      }
    }
  }

  // If all retries fail, return an error
  res.status(429).json({ error: "Too many requests. Please try again later." });
});

// Endpoint to get all transactions for a Bitcoin wallet address
router.get("/walletTransactions", async (req, res) => {
  const walletAddress = req.query.address;

  if (!walletAddress) {
    return res.status(400).json({ error: "Please provide a wallet address" });
  }

  try {
    // Use BlockCypher API to get all transactions for the wallet address
    const blockCypherUrl = `https://api.blockcypher.com/v1/btc/main/addrs/${walletAddress}/full?token=${BlockCypher_APIKEY}`;
    const response = await axios.get(blockCypherUrl);

    if (response.data && response.data.txs) {
      // Extract transactions from the response
      const transactions = response.data.txs.map((tx) => {
        const type = tx.inputs.some((input) =>
          input.addresses.includes(walletAddress)
        )
          ? "outgoing"
          : "incoming";

        return {
          hash: tx.hash,
          from: tx.inputs.map((input) => input.addresses).flat(),
          to: tx.outputs.map((output) => output.addresses).flat(),
          amount: tx.total / 1e8, // Convert from satoshis to BTC
          blockHeight: tx.block_height,
          timestamp: tx.confirmed
            ? new Date(tx.confirmed).toLocaleString()
            : "Unconfirmed",
          type: type,
        };
      });

      res.json({ transactions });
    } else {
      res
        .status(404)
        .json({ error: "No transactions found for the given wallet address" });
    }
  } catch (error) {
    console.error("Error fetching wallet transactions:", error.message);
    res.status(500).json({ error: "Failed to fetch wallet transactions" });
  }
});

module.exports = router;
