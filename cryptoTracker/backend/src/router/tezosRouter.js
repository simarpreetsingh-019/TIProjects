const express = require( "express" );
const axios = require( "axios" );
const router = express.Router();

const Transaction = require( "../models/transaction.model" );
const WalletBalance = require( "../models/wallet.model" );
const SearchHistory = require( '../models/searchHistory.model' );

const Tezos_API_URL = "https://api.tzkt.io/v1";     // TzKT API endpoint
const Tezos_RPC_URL = "https://mainnet.api.tez.ie"; // Tezos RPC endpoint

// Helper function to sleep/pause execution for a certain time
const sleep = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

// -------------------------- Tezos API Routes -------------------------------

/**
 * @route GET /txbyDate
 * @description Fetches Tezos transactions for a specific date (YYYY-MM-DD).
 * @queryParam {string} date - The date for which transactions are to be fetched.
 * @example GET http://localhost:3000/tezos/txbyDate?date=2023-01-01
 */
router.get( "/txbyDate", async ( req, res ) =>
{
  const { date } = req.query;

  if ( !date )
  {
    return res
      .status( 400 )
      .json( { error: "Please provide a date in YYYY-MM-DD format" } );
  }

  try
  {
    // Set headers for server-sent events (streaming response)
    res.setHeader( "Content-Type", "text/event-stream" );
    res.setHeader( "Cache-Control", "no-cache" );
    res.setHeader( "Connection", "keep-alive" );

    // Define the date range for transactions (entire day)
    const startDate = new Date( date ).toISOString();
    const endDate = new Date( new Date( date ).setUTCHours( 23, 59, 59 ) ).toISOString();

    // Fetch transactions from the TzKT API based on the date
    const transactionsUrl = `${ Tezos_API_URL }/operations/transactions?timestamp.ge=${ startDate }&timestamp.le=${ endDate }&limit=50`;
    console.log( "Fetching transactions from:", transactionsUrl );

    const response = await axios.get( transactionsUrl );

    // Check if transactions are found and return them
    if ( response.data && response.data.length > 0 )
    {
      for ( let tx of response.data )
      {
        const transactionData = {
          transactionId: tx.id,
          hash: tx.hash,
          from: tx.sender.address,
          to: tx.target ? tx.target.address : "Contract",
          amount: tx.amount / 1000000, // Convert from mutez to Tez
          block: tx.block,
          timestamp: tx.timestamp,
          level: tx.level,
          status: tx.status,
          gasUsed: tx.gasUsed,
          storageUsed: tx.storageUsed,
          bakerFee: tx.bakerFee ? ( tx.bakerFee / 1e6 ).toFixed( 6 ) : 0, // Convert from µꜩ to ꜩ
        };

        // Check if the transaction already exists in MongoDB based on hash
        const existingTransaction = await Transaction.findOne( { transactionId: tx.id } );

        if ( !existingTransaction )
        {
          // Insert transaction if it doesn't already exist
          await Transaction.create( transactionData );
        } else
        {
          console.log( `Transaction with id ${ tx.id } already exists. Skipping insertion.` );
        }

        // Send transaction data as a streamed response
        res.write( `data: ${ JSON.stringify( transactionData ) }\n\n` );
      }

      res.write( `event: done\ndata: "All transactions have been sent"\n\n` );
      res.end();
    } else
    {
      console.log( "No transactions found" );
      res.status( 404 ).json( { error: "No transactions found on the given date" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching transactions:", error.message );
    res.status( 500 ).json( {
      error: "Failed to fetch transactions",
      details: error.message,
    } );
  }
} );

/**
 * @route GET /tx
 * @description Fetches Tezos transaction details by transaction hash.
 * @queryParam {string} tx_hash - The transaction hash to fetch details for.
 * @example GET http://localhost:3000/tezos/tx?tx_hash=oox1...z0p
 */
router.get( "/tx", async ( req, res ) =>
{
  const txHash = req.query.tx_hash;

  if ( !txHash )
  {
    return res.status( 400 ).json( { error: "Please provide a transaction hash" } );
  }

  try
  {
    // Fetch cached transactions from MongoDB
    const cachedTransactions = await Transaction.find( { hash: txHash } );

    // Initialize an array to collect transactions (both cached and newly fetched)
    let allTransactions = [ ...cachedTransactions ];

    // Fetch transactions from the API
    console.log( `Fetching transactions from API for hash: ${ txHash }` );
    const transactionUrl = `${ Tezos_API_URL }/operations/transactions/${ txHash }`;
    const response = await axios.get( transactionUrl );
    const txDataArray = response.data;

    if ( !txDataArray || txDataArray.length === 0 )
    {
      // If no new transactions are found, return only cached transactions
      return res.json( allTransactions );
    }

    // Prepare an array to store new transaction details
    const newTransactions = [];

    for ( let txData of txDataArray )
    {
      const transactionDetails = {
        transactionId: txData.id,
        hash: txData.hash,
        from: txData.sender ? txData.sender.address : "N/A",  // Handle missing sender address
        to: txData.target ? txData.target.address : "Contract",  // Handle transactions involving contracts
        amount: txData.amount ? txData.amount / 1000000 : 0,  // µꜩ to ꜩ conversion
        block: txData.block,  // Block reference
        timestamp: txData.timestamp,  // Or `new Date(txData.timestamp).toISOString()` if you want to format it
        level: txData.level,  // Level in blockchain
        status: txData.status,  // Transaction status (e.g., applied, failed)
        gasUsed: txData.gasUsed || 0,  // Handle missing gasUsed
        storageUsed: txData.storageUsed || 0,  // Handle missing storageUsed
        bakerFee: txData.bakerFee ? ( txData.bakerFee / 1e6 ).toFixed( 6 ) : 0,  // µꜩ to ꜩ conversion for bakerFee
      };

      // Only insert new transactions into DB
      const existingTransaction = await Transaction.findOne( {
        transactionId: transactionDetails.transactionId,
      } );

      if ( !existingTransaction )
      {
        newTransactions.push( transactionDetails );
        await Transaction.create( transactionDetails );
      }
    }

    // Combine cached and newly fetched transactions
    allTransactions = allTransactions.concat( newTransactions );

    // Return all transactions
    res.json( allTransactions );
  } catch ( error )
  {
    console.error( "Error fetching transaction:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch transaction details" } );
  }
} );

/**
 * @route GET /walletTransactions
 * @description Fetches all transactions for a given Tezos wallet address.
 * @queryParam {string} address - The wallet address to fetch transactions for.
 * @example GET http://localhost:3000/tezos/walletTransactions?address=tz1....
 */
router.get( "/walletTransactions", async ( req, res ) =>
{
  const walletAddress = req.query.address;

  if ( !walletAddress )
  {
    return res.status( 400 ).json( { error: "Please provide a wallet address" } );
  }

  try
  {
    // Fetch cached transactions from MongoDB
    const cachedTransactions = await Transaction.find( {
      $or: [ { from: walletAddress }, { to: walletAddress } ],
    } );

    // Initialize an array to collect transactions (both cached and newly fetched)
    let allTransactions = [ ...cachedTransactions ];

    console.log( `Fetching transactions from API for wallet_address: ${ walletAddress }` );
    const transactionsUrl = `${ Tezos_API_URL }/accounts/${ walletAddress }/operations?type=transaction`;
    const response = await axios.get( transactionsUrl );

    if ( response.data && response.data.length > 0 )
    {
      const newTransactions = [];

      await Promise.all( response.data.map( async ( tx ) =>
      {
        const type =
          tx.sender.address.toLowerCase() === walletAddress.toLowerCase()
            ? "outgoing"
            : "incoming";

        const transactionDetails = {
          transactionId: tx.id || 'defaultId', // Ensure the transactionId exists or provide a default
          hash: tx.hash, // Ensure this exists
          from: tx.sender?.address || 'unknown', // Handle cases where the sender address might not exist
          to: tx.target?.address || "Contract", // Ensure the 'to' address is properly set
          amount: tx.amount / 1000000, // Convert from µꜩ (mutez) to ꜩ (tez)
          block: tx.block || tx.level || 'defaultBlock', // Ensure block or level is set
          timestamp: new Date( tx.timestamp ).toLocaleString(), // Convert to a readable format
          level: tx.level || 0, // Ensure level exists
          status: tx.status || 'unknown', // Set a default status if not present
          gasUsed: tx.gasUsed || 0, // Handle missing gasUsed
          storageUsed: tx.storageUsed || 0, // Handle missing storageUsed
          bakerFee: tx.bakerFee ? ( tx.bakerFee / 1e6 ).toFixed( 6 ) : 0, // Convert bakerFee from mutez to ꜩ
          type: type, // Transaction type: outgoing or incoming
        };

        // Only insert new transactions into DB
        const existingTransaction = await Transaction.findOne( {
          hash: tx.hash,
          from: tx.sender.address,
          to: tx.target.address,
        } );

        if ( !existingTransaction )
        {
          newTransactions.push( transactionDetails );
          await Transaction.create( transactionDetails );
        }
      } ) );

      // Combine cached and newly fetched transactions into a flat array
      allTransactions = allTransactions.concat( newTransactions );

      return res.json( allTransactions ); // Return the flat array of transactions
    } else
    {
      return res
        .status( 404 )
        .json( { error: "No transactions found for the given wallet address" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching wallet transactions:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch wallet transactions" } );
  }
} );

/**
 * @route GET /recentTransactions
 * @description Fetches recent transactions on the Tezos network.
 * @queryParam {number} limit - Optional limit on the number of transactions to fetch (default is 1000).
 * @example GET http://localhost:3000/tezos/recentTransactions?limit=100
 */
router.get( "/recentTransactions", async ( req, res ) =>
{
  const limit = req.query.limit ? parseInt( req.query.limit ) : 1000;

  try
  {
    // Fetch recent transactions from the TzKT API
    const transactionsUrl = `${ Tezos_API_URL }/operations/transactions?limit=${ limit }&sort.desc=id`;
    console.log( "Recent Transactions URL:", transactionsUrl ); // Log the URL for debugging

    const response = await axios.get( transactionsUrl );

    if ( response.data && response.data.length > 0 )
    {
      // Initialize an array to store new transaction details
      const newTransactions = [];

      // Use Promise.all to properly handle async operations within the loop
      await Promise.all(
        response.data.map( async ( tx ) =>
        {
          const transactionDetails = {
            transactionId: tx.id,
            hash: tx.hash,
            from: tx.sender.address,
            to: tx.target ? tx.target.address : "Contract",
            amount: tx.amount / 1000000, // Convert from mutez to Tez
            block: tx.block,
            timestamp: tx.timestamp,
            level: tx.level,
            status: tx.status,
            gasUsed: tx.gasUsed || 0,
            storageUsed: tx.storageUsed || 0,
            bakerFee: tx.bakerFee ? ( tx.bakerFee / 1e6 ).toFixed( 6 ) : 0, // Convert from µꜩ to ꜩ
          };

          // Check if the transaction already exists in the database
          const existingTransaction = await Transaction.findOne( {
            transactionId: transactionDetails.transactionId,
          } );

          // If the transaction doesn't exist, save it to the database
          if ( !existingTransaction )
          {
            await Transaction.create( transactionDetails );
            newTransactions.push( transactionDetails );
          }
        } )
      );

      // Return the flat array of newly inserted transactions
      res.json( newTransactions );
    } else
    {
      res.status( 404 ).json( { error: "No recent transactions found" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching recent transactions:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch recent transactions" } );
  }
} );

/**
 * @route GET /walletBalance
 * @description Fetches the balance of a given Tezos wallet address.
 * @queryParam {string} address - The wallet address to fetch balance for.
 * @example GET http://localhost:3000/tezos/walletBalance?address=tz1...
 */
router.get( "/walletBalance", async ( req, res ) =>
{
  const walletAddress = req.query.address;

  if ( !walletAddress )
  {
    return res.status( 400 ).json( { error: "Please provide a wallet address" } );
  }

  try
  {
    // Check if the balance is cached in the database
    const cachedBalance = await WalletBalance.findOne( { address: walletAddress } );

    if ( cachedBalance )
    {
      console.log( "Fetching balance from DB" );
      return res.json( { balance: cachedBalance.balance } );
    }

    // If not found in DB, fetch from the TzKT API
    console.log( "Fetching balance from API" );
    const balanceUrl = `${ Tezos_API_URL }/accounts/${ walletAddress }`;
    const response = await axios.get( balanceUrl );

    if ( response.data )
    {
      const balance = response.data.balance / 1000000; // Convert from µꜩ to ꜩ

      // Insert the balance into the database
      const newBalance = new WalletBalance( {
        address: walletAddress,
        balance: balance,
      } );
      await newBalance.save();

      return res.json( { balance } );
    } else
    {
      res.status( 404 ).json( { error: "Wallet not found" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching wallet balance:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch wallet balance" } );
  }
} );

/**
 * @route GET /balAndTransaction
 * @description Fetches both balance and transaction data for a given wallet address.
 * @queryParam {string} address - The wallet address to fetch data for.
 * @example GET http://localhost:3000/tezos/balAndTransaction?address=tz1....
 */
router.get( "/balAndTransaction", async ( req, res ) =>
{
  const walletAddress = req.query.address;

  if ( !walletAddress )
  {
    return res.status( 400 ).json( { error: "Please provide a valid wallet address" } );
  }

  try
  {
    // Check if balance is cached in the database
    const cachedBalance = await WalletBalance.findOne( { address: walletAddress } );

    // Check if transactions are cached in the database
    const cachedTransactions = await Transaction.find( {
      $or: [ { from: walletAddress }, { to: walletAddress } ],
    } );

    let balance, transactions;

    // If balance is not cached, fetch from API and save in DB
    if ( cachedBalance )
    {
      console.log( "Fetching balance from DB" );
      balance = cachedBalance.balance;
    } else
    {
      console.log( "Fetching balance from API" );
      const balanceResponse = await axios.get( `${ Tezos_API_URL }/accounts/${ walletAddress }` );
      balance = balanceResponse.data.balance / 1000000; // Convert from µꜩ to ꜩ

      const newBalance = new WalletBalance( {
        address: walletAddress,
        balance: balance,
      } );
      await newBalance.save();
    }

    // If transactions are not cached, fetch from API and save in DB
    if ( cachedTransactions.length > 0 )
    {
      console.log( "Fetching transactions from DB" );
      transactions = cachedTransactions;
    } else
    {
      console.log( "Fetching transactions from API" );
      const transactionsUrl = `${ Tezos_API_URL }/accounts/${ walletAddress }/operations?type=transaction&limit=10000`;
      const transactionResponse = await axios.get( transactionsUrl );

      transactions = transactionResponse.data.map( ( tx ) =>
      {
        const type =
          tx.sender.address.toLowerCase() === walletAddress.toLowerCase()
            ? "outgoing"
            : "incoming";
        return {
          hash: tx.hash,
          from: tx.sender.address,
          to: tx.target ? tx.target.address : "Contract",
          amount: tx.amount / 1000000, // Convert from µꜩ to ꜩ
          blockNumber: tx.level,
          timestamp: new Date( tx.timestamp ).toLocaleString(), // Convert timestamp to readable format
          type: type,
        };
      } );

      // Insert fetched transactions into the database
      await Transaction.insertMany( transactions );
    }

    // Combine balance and transaction data into a single response
    const data = {
      balance,
      transactions,
    };

    res.json( data );
  } catch ( error )
  {
    console.error( "An error occurred while fetching data:", error );
    res.status( 500 ).json( {
      error: "An error occurred while fetching balance and transactions",
    } );
  }
} );

// ------------------ Token Transfers ( pending to implement with db ) ----------------------

/**
 * @route GET /tokenTransfers
 * @description Fetches token transfers for a specific contract.
 * @queryParam {string} contractAddress - The contract address to fetch token transfers for.
 * @example GET http://localhost:3000/tezos/tokenTransfers?contractAddress=KT1....
 */
router.get( '/tokenTransfers', async ( req, res ) =>
{
  const contractAddress = req.query.contractAddress;

  if ( !contractAddress )
  {
    return res.status( 400 ).json( { error: 'Please provide a valid contract address' } );
  }

  try
  {
    // Fetch transactions from the DB for the contract address
    const dbTransactions = await Transaction.find( { to: contractAddress } );

    // Fetch new token transfers from the API
    const transfersUrl = `https://api.tzkt.io/v1/tokens/transfers?contract=${ contractAddress }&limit=10000`;
    const response = await axios.get( transfersUrl );

    const apiTransactions = response.data;

    // Check for any new transactions
    const newTransactions = apiTransactions.filter( ( tx ) =>
      !dbTransactions.some( dbTx => dbTx.transactionId === tx.id )
    );

    // Insert new transactions into the DB
    const transactionsToInsert = newTransactions.map( ( tx ) => ( {
      transactionId: tx.id,
      hash: tx.hash,
      from: tx.from ? tx.from.address : 'Unknown',
      to: tx.to ? tx.to.address : 'Contract',
      amount: tx.amount / 1000000,
      timestamp: tx.timestamp,
    } ) );

    await Transaction.insertMany( transactionsToInsert );

    // Combine DB and API results for the response
    const combinedResults = [ ...dbTransactions, ...transactionsToInsert ];

    res.json( { transfers: combinedResults } );
  } catch ( error )
  {
    console.error( 'Error fetching token transfers:', error.message );
    res.status( 500 ).json( { error: 'Failed to fetch token transfers' } );
  }
} );

/**
 * @route GET /operations
 * @description Fetches operations for a given wallet address and operation type.
 * @queryParam {string} address - The wallet address to fetch operations for.
 * @queryParam {string} type - The type of operation (e.g., transaction, delegation, endorsement).
 * @example GET http://localhost:3000/tezos/operations?address=tz1...&type=transaction
 */
router.get( "/operations", async ( req, res ) =>
{
  const { address, type } = req.query;

  if ( !address || !type )
  {
    return res.status( 400 ).json( {
      error:
        "Please provide a wallet address or enter the type of operation in query. The valid types are transactions, delegations, endorsements, etc.",
    } );
  }

  try
  {
    // Fetch operations using TzKT API
    const operationsUrl = `${ Tezos_API_URL }/accounts/${ address }/operations?type=${ type }&limit=100`;
    const response = await axios.get( operationsUrl );

    res.json( response.data );
  } catch ( error )
  {
    console.error( "Error fetching operations:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch operations" } );
  }
} );

/**
 * @route GET /delegation
 * @description Fetches the delegation information for a given wallet address.
 * @queryParam {string} address - The wallet address to fetch delegation information for.
 * @example GET http://localhost:3000/tezos/delegation?address=tz1...
 */
router.get( "/delegation", async ( req, res ) =>
{
  const { address } = req.query;

  // Validate the address parameter
  if ( !address )
  {
    return res
      .status( 400 )
      .json( { error: "Please provide a valid wallet address" } );
  }

  try
  {
    // Fetch the delegation information for the specified wallet address
    const delegationUrl = `${ Tezos_API_URL }/accounts/${ address }/delegation`;
    const response = await axios.get( delegationUrl );

    // Return the delegation information
    res.json( response.data );
  } catch ( error )
  {
    console.error( "Error fetching delegation info:", error.message );
    if ( error.response )
    {
      // Log the error response from the API
      console.error( "API Response:", error.response.data );
    }
    res.status( 500 ).json( { error: "Failed to fetch delegation information" } );
  }
} );

// -------------------------- Utility Functions --------------------------

/**
 * Validates the format of a Tezos wallet address.
 * Tezos addresses must start with tz1, tz2, tz3, KT1, or KT2 and have 33 characters following the prefix.
 *
 * @param {string} address - The Tezos wallet address to validate.
 * @returns {boolean} - Returns true if the address is valid, otherwise false.
 */
function isValidTezosAddress ( address )
{
  const tezosAddressPattern = /^(tz1|tz2|tz3|KT1|KT2)[1-9A-Za-z]{33}$/;
  return tezosAddressPattern.test( address );
}

/**
 * Validates the date format (YYYY-MM-DD).
 *
 * @param {string} date - The date string to validate.
 * @returns {boolean} - Returns true if the date is in the correct format, otherwise false.
 */
function isValidDateFormat ( date )
{
  return /^\d{4}-\d{2}-\d{2}$/.test( date );
}

// -------------------- Additional Routes --------------------

/**
 * @route GET /timePeriodData
 * @description Fetch historical transaction data within a specified date range.
 *
 * @queryParam {string} startDate - Required, start date in YYYY-MM-DD format.
 * @queryParam {string} endDate - Required, end date in YYYY-MM-DD format.
 * @returns {Array} List of transactions or an error message.
 * @example GET http://localhost:3000/tezos/timePeriodData?startDate=2023-01-01&endDate=2023-02-01
 */
router.get( "/timePeriodData", async ( req, res ) =>
{
  let { startDate, endDate } = req.query;

  // Validate required parameters
  if ( !startDate || !endDate )
  {
    return res
      .status( 400 )
      .json( { error: "Please provide valid start and end dates" } );
  }

  // Validate date format
  if ( !isValidDateFormat( startDate ) || !isValidDateFormat( endDate ) )
  {
    return res
      .status( 400 )
      .json( { error: "Start date and end date must be in YYYY-MM-DD format" } );
  }

  // Convert to Date objects for comparison
  let start = new Date( startDate );
  let end = new Date( endDate );

  // Check if startDate is after endDate, and if so, swap them
  if ( start > end )
  {
    [ start, end ] = [ end, start ]; // Swap start and end
  }
  console.log( "Start Date:", start );
  console.log( "End Date:", end );

  // Build the URL for historical data
  let timePeriodDataUrl = `${ Tezos_API_URL }/operations/transactions?timestamp.ge=${ start.toISOString().split( "T" )[ 0 ]
    }&timestamp.le=${ end.toISOString().split( "T" )[ 0 ] }&limit=10000`;
  console.log( "Time Period Data URL:", timePeriodDataUrl );

  try
  {
    let response = await axios.get( timePeriodDataUrl );
    console.log( "API Response:", response.data );

    // Check if the response is valid and contains transaction data
    if ( response.data && response.data.length > 0 )
    {
      // Map the response to the desired format
      const formattedTransactions = response.data.map( ( tx ) => ( {
        transactionId: tx.id, // Using 'id' from the original response
        hash: tx.hash,
        from: tx.sender?.address, // Optional chaining in case sender is undefined
        to: tx.target?.address, // Optional chaining in case target is undefined
        amount: tx.amount,
        block: tx.block,
        timestamp: tx.timestamp,
      } ) );

      // If the initial fetch was limited (10000 transactions), fetch again for completeness
      if ( response.data.length === 10000 )
      {
        const additionalUrl = `${ Tezos_API_URL }/operations/transactions?timestamp.ge=${ start.toISOString().split( "T" )[ 0 ]
          }&timestamp.le=${ end.toISOString().split( "T" )[ 0 ] }&limit=10000`;
        console.log( "Additional Fetch URL:", additionalUrl );

        const additionalResponse = await axios.get( additionalUrl );
        console.log( "Additional API Response:", additionalResponse.data );

        // Map additional transactions
        const additionalFormattedTransactions = additionalResponse.data.map(
          ( tx ) => ( {
            transactionId: tx.id,
            hash: tx.hash,
            from: tx.sender?.address,
            to: tx.target?.address,
            amount: tx.amount,
            block: tx.block,
            timestamp: tx.timestamp,
          } )
        );

        // Combine results
        return res.json( {
          transactions: [
            ...formattedTransactions,
            ...additionalFormattedTransactions,
          ],
        } );
      }

      return res.json( { transactions: formattedTransactions } );
    } else
    {
      return res
        .status( 404 )
        .json( { error: "No transactions found for the specified date range." } );
    }
  } catch ( error )
  {
    console.error( "Error fetching historical data:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch historical data" } );
  }
} );

/**
 * @route GET /timePeriodDataWithAddress
 * @description Fetch historical transaction data within a specified date range, optionally filtered by Tezos wallet address.
 *
 * @queryParam {string} address - Optional, Tezos wallet address to filter by.
 * @queryParam {string} startDate - Required, start date in YYYY-MM-DD format.
 * @queryParam {string} endDate - Required, end date in YYYY-MM-DD format.
 * @returns {Array} List of transactions or an error message.
 * @example GET http://localhost:3000/tezos/timePeriodDataWithAddress?startDate=2023-01-01&endDate=2023-02-01&address=tz1XXXX
 */

router.get( "/timePeriodDataWithAddress", async ( req, res ) =>
{
  const { address, startDate, endDate } = req.query;

  // Validate required parameters
  if ( !startDate || !endDate )
  {
    return res.status( 400 ).json( { error: "Please provide valid start and end dates" } );
  }

  // Validate date format
  if ( !isValidDateFormat( startDate ) || !isValidDateFormat( endDate ) )
  {
    return res.status( 400 ).json( { error: "Start date and end date must be in YYYY-MM-DD format" } );
  }

  // Ensure start date is earlier than the end date
  if ( new Date( startDate ) >= new Date( endDate ) )
  {
    return res.status( 400 ).json( { error: "Start date must be earlier than end date" } );
  }

  // Validate Tezos address format, if provided
  if ( address && !isValidTezosAddress( address ) )
  {
    return res.status( 400 ).json( { error: "Please provide a valid Tezos wallet address" } );
  }

  // Construct the API URL for fetching historical data
  let historicalUrl = `${ Tezos_API_URL }/operations/transactions?timestamp.ge=${ startDate }&timestamp.le=${ endDate }`;

  //  Add address filter to the URL if provided
  if ( address )
  {
    historicalUrl += `&address=${ address }`;
  }

  try
  {
    const response = await axios.get( historicalUrl );

    // Filter transactions based on the provided address
    const filteredTransactions = response.data.filter(
      ( tx ) => tx.sender?.address === address || tx.target?.address === address
    );

    // Return the filtered transactions if any are found
    if ( filteredTransactions.length > 0 )
    {
      return res.json( filteredTransactions );
    } else
    {
      return res.status( 404 ).json( {
        error: "No transactions found for the given address in the specified date range."
      } );
    }
  } catch ( error )
  {
    console.error( "Error fetching historical data:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch historical data" } );
  }
} );

/**
 * @route GET /delegators
 * @description Fetch a list of delegators for a given delegate (baker).
 *
 * @queryParam {string} address - Required, Tezos delegate (baker) address.
 * @queryParam {number} [limit=100] - Optional, number of delegators to return (default is 100).
 * @queryParam {number} [offset=0] - Optional, offset for pagination (default is 0).
 * @returns {Array} List of delegators or an error message.
 * @example GET http://localhost:3000/tezos/delegators?address=tz1XXXX&limit=50&offset=0
 */
router.get( "/delegators", async ( req, res ) =>
{
  const { address, limit = 100, offset = 0 } = req.query;

  // Validate the delegate address
  if ( !address )
  {
    return res.status( 400 ).json( { error: "Please provide a valid delegate address" } );
  }

  try
  {
    // Fetch the list of delegators for the specified baker (delegate)
    const delegatorsUrl = `${ Tezos_API_URL }/accounts/${ address }/delegators?limit=${ limit }&offset=${ offset }`;
    const response = await axios.get( delegatorsUrl );
    // Return the list of delegators
    res.json( response.data );
  } catch ( error )
  {
    console.error( "Error fetching delegators:", error.message );
    console.log( error );
    res.status( 500 ).json( { error: "Failed to fetch delegators" } );
  }
} );

/**
 * @route GET /bakerInfo
 * @description Fetch information for a specific baker (delegate) by address.
 *
 * @queryParam {string} address - Required, Tezos baker address.
 * @returns {Object} Baker information or an error message.
 * @example GET http://localhost:3000/tezos/bakerInfo?address=tz1XXXX
 */
router.get( "/bakerInfo", async ( req, res ) =>
{
  const { address } = req.query;

  if ( !address )
  {
    return res.status( 400 ).json( { error: "Please provide a valid baker address" } );
  }

  try
  {
    const bakerUrl = `${ Tezos_API_URL }/delegates/${ address }`;
    const response = await axios.get( bakerUrl );

    if ( response.data )
    {
      res.json( response.data );
    } else
    {
      res.status( 404 ).json( { error: "Baker not found" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching baker information:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch baker information" } );
  }
} );

/**
 * @route GET /delegationHistory
 * @description Fetch historical delegation operations for a given address and date range.
 *
 * @queryParam {string} address - Required, Tezos wallet address to fetch delegation history for.
 * @queryParam {string} startDate - Required, start date in YYYY-MM-DD format.
 * @queryParam {string} endDate - Required, end date in YYYY-MM-DD format.
 * @returns {Array} List of delegation operations or an error message.
 * @example GET http://localhost:3000/tezos/delegationHistory?address=tz1XXXX&startDate=2023-01-01&endDate=2023-02-01
 */
router.get( "/delegationHistory", async ( req, res ) =>
{
  const { address, startDate, endDate } = req.query;

  // Validate required parameters
  if ( !address || !startDate || !endDate )
  {
    return res.status( 400 ).json( { error: "Please provide address, startDate, and endDate" } );
  }

  // Validate date format
  if ( !isValidDateFormat( startDate ) || !isValidDateFormat( endDate ) )
  {
    return res.status( 400 ).json( { error: "Start date and end date must be in YYYY-MM-DD format" } );
  }

  try
  {
    // Fetch delegation history using TzKT API
    const historyUrl = `${ Tezos_API_URL }/accounts/${ address }/operations?type=delegation&timestamp.ge=${ startDate }&timestamp.le=${ endDate }&limit=1000`;
    const response = await axios.get( historyUrl );

    // Check if response contains delegation data
    if ( response.data && response.data.length > 0 )
    {
      // Map through each delegation operation and capture relevant details
      const delegationHistory = response.data.map( ( operation ) => ( {
        operationId: operation.id,
        timestamp: operation.timestamp,
        delegatedTo: operation.newDelegate
          ? operation.newDelegate.address
          : "Undelegated",
        previousDelegate: operation.prevDelegate
          ? operation.prevDelegate.address
          : "None",
        amount: operation.amount / 1000000, // Convert from mutez to Tez
        status: operation.status,
      } ) );

      res.json( delegationHistory ); // Send the delegation history back
    } else
    {
      res.status( 404 ).json( {
        error:
          "No delegation operations found for the given address in the specified time range.",
      } );
    }
  } catch ( error )
  {
    console.error( "Error fetching delegation history:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch delegation history" } );
  }
} );

/**
 * @route GET /transactionFees
 * @description Fetch transaction fee and gas limit information from the Tezos network.
 *
 * @returns {Object} Transaction fee and gas limit data or an error message.
 * @example GET http://localhost:3000/tezos/transactionFees
 */
router.get( "/transactionFees", async ( req, res ) =>
{
  try
  {
    // Fetch transaction fee and gas limit data from the Tezos network
    const constantsUrl = `${ Tezos_RPC_URL }/chains/main/blocks/head/context/constants`;
    const response = await axios.get( constantsUrl );

    const fees = {
      minFeePerGasUnit: response.data.minimal_fee_per_gas_unit || "N/A",
      minGasLimitPerOperation: response.data.hard_gas_limit_per_operation || "N/A",
      minGasLimitPerBlock: response.data.hard_gas_limit_per_block || "N/A",
      minStorageLimitPerOperation: response.data.hard_storage_limit_per_operation || "N/A",
      baseFee: response.data.minimal_block_delay || "N/A",
    };

    // Return the transaction fee and gas limit data
    res.json( fees );
  } catch ( error )
  {
    console.error( "Error fetching transaction fees:", error.message );
    res.status( 500 ).json( { error: "Failed to fetch transaction fees" } );
  }
} );

/**
 * @route GET /tokenMetadata
 * @description Fetch metadata for a specific token contract on the Tezos blockchain.
 *
 * @queryParam {string} contractAddress - Required, Tezos contract address.
 * @returns {Object} Token metadata or an error message.
 * @example GET http://localhost:3000/tezos/tokenMetadata?contractAddress=KT1XXXX
 */
router.get( "/tokenMetadata", async ( req, res ) =>
{
  const { contractAddress } = req.query;

  // Validate the contract address
  if ( !contractAddress )
  {
    return res.status( 400 ).json( { error: "Please provide a contract address" } );
  }

  try
  {
    // Fetch token metadata using the TzKT API
    const metadataUrl = `${ Tezos_API_URL }/tokens/${ contractAddress }/metadata`;
    const response = await axios.get( metadataUrl );

    // Return the token metadata if found
    if ( response.data )
    {
      res.json( response.data );
    } else
    {
      res.status( 404 ).json( { error: "Token metadata not found" } );
    }
  } catch ( error )
  {
    console.error( "Error fetching token metadata:", error.message );
    if ( error.response )
    {
      // Log the full error response from the API
      console.error( "API Response Status:", error.response.status );
      console.error( "API Response Data:", error.response.data );
    }
    res.status( 500 ).json( { error: "Failed to fetch token metadata" } );
  }
} );

/**
 * -------------------- Search History Routes --------------------
 */

/**
 * @route GET /history
 * @description Retrieves the search history (most recent 10 entries).
 */
router.get( '/history', async ( req, res ) =>
{
  try
  {
    const history = await SearchHistory.find()
      .sort( { timestamp: -1 } )
      .limit( 10 );
    res.json( history );
  } catch ( error )
  {
    res.status( 500 ).json( { error: 'Failed to fetch search history' } );
  }
} );

/**
 * @route POST /history
 * @description Adds a search entry to the history if it doesn't exist already.
 */
router.post( '/history', async ( req, res ) =>
{
  try
  {
    const { query, type, result } = req.body;

    // Check if the query already exists in the history
    const existingEntry = await SearchHistory.findOne( { query } );
    if ( existingEntry )
    {
      // If the entry exists, skip saving
      return res.json( { message: 'Search entry already exists' } );
    }

    // If not, save the new search entry
    const searchEntry = new SearchHistory( {
      query,
      type,
      result
    } );
    await searchEntry.save();
    res.json( searchEntry );
  } catch ( error )
  {
    res.status( 500 ).json( { error: 'Failed to save search history' } );
  }
} );

/**
 * @route DELETE /history
 * @description Clears the entire search history.
 */
router.delete( '/history', async ( req, res ) =>
{
  try
  {
    await SearchHistory.deleteMany( {} );
    res.json( { message: 'Search history cleared' } );
  } catch ( error )
  {
    res.status( 500 ).json( { error: 'Failed to clear search history' } );
  }
} );

module.exports = router;
