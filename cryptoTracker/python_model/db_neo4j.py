
from neo4j import GraphDatabase
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get credentials from environment variables
uri = os.getenv('NEO4J_URI')
username = os.getenv('NEO4J_USERNAME')
password = os.getenv('NEO4J_PASSWORD')


driver = GraphDatabase.driver(uri, auth=(username, password))

# Function to add transactions to Neo4j with suspicion_score
def add_transaction_to_neo4j(tx, from_wallet, to_wallet, amount, timestamp, suspicion_score):
    # Convert timestamp to ISO string format if necessary
    timestamp_str = timestamp.isoformat() if isinstance(timestamp, pd.Timestamp) else str(timestamp)

    tx.run("""
        MERGE (a:Wallet {address: $from_wallet})
        MERGE (b:Wallet {address: $to_wallet})
        MERGE (a)-[r:SENT {amount: $amount, timestamp: $timestamp, suspicion_score: $suspicion_score}]->(b)
        """,
        from_wallet=from_wallet,
        to_wallet=to_wallet,
        amount=amount,
        timestamp=timestamp_str,
        suspicion_score=suspicion_score)

# Store transactions in Neo4j
def store_transactions_in_neo4j(df):
    with driver.session() as session:
        for _, row in df.iterrows():
            try:
                # Handle missing suspicion_score (default to 0 if missing)
                suspicion_score = row.get('suspicion_score', 0)

                # Write each transaction to Neo4j
                session.write_transaction(
                    add_transaction_to_neo4j,
                    row['from'], row['to'],
                    row['amount'], row['timestamp'], suspicion_score
                )
            except Exception as e:
                print(f"Error writing transaction {row['from']} -> {row['to']}: {e}")

# Detect circular patterns (mixing) and wallet anomalies
def detect_mixing_patterns_and_anomalies(df):
    # First, store transactions in Neo4j
    store_transactions_in_neo4j(df)

    # Query Neo4j to detect circular transactions (mixing patterns)
    query_mixing = """
    MATCH (a:Wallet)-[:SENT*1..5]->(a)
    RETURN DISTINCT a.address AS mixing_wallet
    """

    mixing_wallets = []
    try:
        with driver.session() as session:
            result = session.run(query_mixing)
            mixing_wallets = [record['mixing_wallet'] for record in result]
    except Exception as e:
        print(f"Error running mixing pattern query: {e}")

    # Query Neo4j to detect wallets with high suspicion scores (anomalous wallets)
    query_anomalous_wallets = """
    MATCH (a:Wallet)-[r:SENT]->()
    WITH a, AVG(r.suspicion_score) AS avg_suspicion_score
    WHERE avg_suspicion_score > 0.5  // Example threshold
    RETURN a.address AS anomalous_wallet
    """

    anomalous_wallets = []
    try:
        with driver.session() as session:
            result = session.run(query_anomalous_wallets)
            anomalous_wallets = [record['anomalous_wallet'] for record in result]
    except Exception as e:
        print(f"Error running anomaly detection query: {e}")

    # Flag transactions involving mixing wallets or anomalous wallets
    df['mixing_pattern'] = df.apply(lambda row: row['from'] in mixing_wallets or row['to'] in mixing_wallets, axis=1)
    df['wallet_anomaly'] = df.apply(lambda row: row['from'] in anomalous_wallets or row['to'] in anomalous_wallets, axis=1)

    # Return transactions that exhibit either a mixing pattern or wallet anomaly
    return df[(df['mixing_pattern']) | (df['wallet_anomaly'])]
