// routes/ethereum.js
const express = require("express");
const axios = require("axios");
const web3 = require("web3");
const router = express.Router();

// Load environment variables
const Etherscan_APIKEY = process.env.ETHERSCAN_API_KEY;

// Initialize Web3 for unit conversion

// Function to add delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Endpoint to get Ethereum transactions based on a specific date using SSE
router.get("/txbyDate", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res
      .status(400)
      .json({ error: "Please provide a date in YYYY-MM-DD format" });
  }

  try {
    // Set headers for server-sent events
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const startDate = Math.floor(new Date(date).setUTCHours(0, 0, 0, 0) / 1000);
    const endDate = Math.floor(
      new Date(date).setUTCHours(23, 59, 59, 999) / 1000
    );

    // Get the block numbers
    const startBlockUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${startDate}&closest=before&apikey=${Etherscan_APIKEY}`;
    const startBlockResponse = await axios.get(startBlockUrl);
    const startBlockNumber = startBlockResponse.data.result;

    const endBlockUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${endDate}&closest=after&apikey=${Etherscan_APIKEY}`;
    const endBlockResponse = await axios.get(endBlockUrl);
    const endBlockNumber = endBlockResponse.data.result;

    if (startBlockNumber && endBlockNumber) {
      let transactions = [];
      let promises = [];

      for (
        let block = parseInt(startBlockNumber);
        block <= parseInt(endBlockNumber);
        block++
      ) {
        const blockDetailsUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${block.toString(
          16
        )}&boolean=true&apikey=${Etherscan_APIKEY}`;

        promises.push(axios.get(blockDetailsUrl));

        // Batch the requests
        if (promises.length >= 10) {
          const responses = await Promise.all(promises);
          responses.forEach((response) => {
            if (response.data && response.data.result) {
              const blockData = response.data.result;
              if (blockData.transactions && blockData.transactions.length > 0) {
                blockData.transactions.forEach((tx) => {
                  transactions.push({
                    hash: tx.hash,
                    from: tx.from,
                    to: tx.to,
                    value: web3.utils.fromWei(tx.value, "ether"), // Convert value from wei to ether
                  });

                  // Send response if we have accumulated 5 transactions
                  if (transactions.length >= 5) {
                    const dataToSend = transactions.slice(0, 5);
                    transactions = transactions.slice(5);
                    res.write(`data: ${JSON.stringify(dataToSend)}\n\n`);
                  }
                });
              }
            }
          });
          promises = [];
          await sleep(200); // Rate limiting
        }
      }

      // Handle any remaining promises
      if (promises.length > 0) {
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
          if (response.data && response.data.result) {
            const blockData = response.data.result;
            if (blockData.transactions && blockData.transactions.length > 0) {
              blockData.transactions.forEach((tx) => {
                transactions.push({
                  hash: tx.hash,
                  from: tx.from,
                  to: tx.to,
                  value: web3.utils.fromWei(tx.value, "ether"), // Convert value from wei to ether
                });

                // Send response if we have accumulated 5 transactions
                if (transactions.length >= 5) {
                  const dataToSend = transactions.slice(0, 5);
                  transactions = transactions.slice(5);
                  res.write(`data: ${JSON.stringify(dataToSend)}\n\n`);
                }
              });
            }
          }
        });
      }

      // Send any remaining transactions
      if (transactions.length > 0) {
        res.write(`data: ${JSON.stringify(transactions)}\n\n`);
      }

      res.write(`event: done\ndata: "All transactions have been sent"\n\n`);
      res.end();
    } else {
      res.status(404).json({ error: "No block found in the given date range" });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Endpoint to get Ethereum transaction details
// Endpoint to get Ethereum transaction details based on a transaction hash
router.get("/tx", async (req, res) => {
  const txHash = req.query.tx_hash;

  if (!txHash) {
    return res.status(400).json({ error: "Please provide a transaction hash" });
  }

  try {
    // Use Etherscan API to get transaction details
    const etherscanUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${Etherscan_APIKEY}`;
    const response = await axios.get(etherscanUrl);

    if (response.data && response.data.result) {
      const txData = response.data.result;

      // Extract the block number
      const blockNumber = txData.blockNumber;

      // Make another request to get the block details
      const blockDetailsUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${parseInt(
        blockNumber
      ).toString(16)}&boolean=true&apikey=${Etherscan_APIKEY}`;
      const blockResponse = await axios.get(blockDetailsUrl);

      if (blockResponse.data && blockResponse.data.result) {
        const blockData = blockResponse.data.result;

        // Extract the timestamp from the block data and calculate age
        const blockTimestamp = parseInt(blockData.timestamp, 16); // Block timestamp in seconds
        const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const ageInSeconds = currentTime - blockTimestamp;

        // Convert age to a more human-readable format (days, hours, minutes)
        const ageInDays = Math.floor(ageInSeconds / (60 * 60 * 24));
        const ageInHours = Math.floor(
          (ageInSeconds % (60 * 60 * 24)) / (60 * 60)
        );
        const ageInMinutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
        const age = `${ageInDays} days, ${ageInHours} hours, ${ageInMinutes} minutes`;

        // Extract only the necessary fields
        const transactionDetails = {
          hash: txData.hash,
          from: txData.from,
          to: txData.to,
          amount: web3.utils.fromWei(txData.value, "ether"), // Convert value from wei to ether
          blockNumber: parseInt(txData.blockNumber),
          age: age,
        };

        res.json(transactionDetails);
      } else {
        res.status(404).json({ error: "Block details not found" });
      }
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
    res.status(500).json({ error: "Failed to fetch transaction details" });
  }
});

router.get("/walletTransactions", async (req, res) => {
  const walletAddress = req.query.address;

  if (!walletAddress) {
    return res.status(400).json({ error: "Please provide a wallet address" });
  }

  try {
    // Use Etherscan API to get all transactions for the wallet address
    const etherscanUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${Etherscan_APIKEY}`;
    const response = await axios.get(etherscanUrl);

    if (
      response.data &&
      response.data.result &&
      Array.isArray(response.data.result)
    ) {
      // Extract transactions from the response
      const transactions = response.data.result.map((tx) => {
        const type =
          tx.from.toLowerCase() === walletAddress.toLowerCase()
            ? "outgoing"
            : "incoming";
        return {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          amount: web3.utils.fromWei(tx.value, "ether"), // Convert value from wei to ether
          blockNumber: tx.blockNumber,
          timestamp: new Date(tx.timeStamp * 1000).toLocaleString(), // Convert timestamp to a readable date format
          type: type, // Specify if the transaction is incoming or outgoing
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
