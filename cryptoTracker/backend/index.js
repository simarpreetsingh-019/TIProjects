require( "dotenv/config" );

const mongoose = require( 'mongoose' );
const connectDB = require( "./src/utils/db" );

const userRouter = require( "./src/router/userRouter" );
const adminRouter = require( "./src/router/adminRouter" );
const user = require( './src/router/user.js' );
const ethereumRouter = require( "./src/router/ethereum" );
const bitcoinRouter = require( "./src/router/bitcoin" );
const tezosRouter = require( "./src/router/tezosRouter" );
const neo4jRouter = require("./src/router/neo4jRouter");

const express = require( "express" );
const cors = require( "cors" );

const port = process.env.PORT || 3000;
const app = express();

app.use( express.json() );
app.use( cors() );

app.use(express.static("frontend"));

app.use( '/api/users', user );

// Connect to MongoDB
connectDB();

// create user routes
app.use( "/api/v1/user", userRouter );
// creating the admin routes
app.use( "/api/v1/admin", adminRouter );
app.use( "/ethereum", ethereumRouter );
app.use( "/tezos", tezosRouter );
app.use( "/bitcoin", bitcoinRouter );
app.use("/neo4j", neo4jRouter);

app.listen( port, () =>
{
  console.log( `Server running on PORT ${ port }` );
} );
