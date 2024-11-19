const express = require("express");
require("dotenv").config();
const axios = require("axios");
const neo4j = require("neo4j-driver");
const router = express.Router();
const uri = process.env.NEO4J_URI;
const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
router.post("/fetch-data", async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (w:Wallet)-[r:SENT]->(m:Wallet)
      RETURN w, r, m
      LIMIT 100
    `);
    const data = result.records.map((record) => ({
      source: {
        id: record.get("w").properties.id,
        address: record.get("w").properties.address,
        name: record.get("w").properties.name,
        suspicion_score: record.get("w").properties.suspicion_score,
      },
      target: {
        id: record.get("m").properties.id,
        address: record.get("m").properties.address,
        name: record.get("m").properties.name,
        suspicion_score: record.get("m").properties.suspicion_score,
      },
      relationship: {
        type: record.get("r").type,
        amount: record.get("r").properties.amount,
        timestamp: record.get("r").properties.timestamp,
      },
    }));
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send(error);
  } finally {
    await session.close();
  }
});

module.exports = router;
