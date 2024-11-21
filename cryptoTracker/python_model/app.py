# app.py
from flask import Flask, jsonify, request
from model.anomaly_model import detect_anomalies
from model.data_preprocessing import fetch_and_preprocess_data_from_url
from db_neo4j import detect_mixing_patterns_and_anomalies, store_transactions_in_neo4j  # Ensure these functions are implemented in db_neo4j

app = Flask(__name__)
RECENT_TRANSACTION_URL = "http://localhost:3000/tezos/recentTransactions"

# -------------------- Routes --------------------

# Route to detect anomalies for transactions involving a specific wallet address.
"""
    Args:
        wallet_address (str): Wallet address to analyze for anomalies, passed as a query parameter.

    Returns:
        JSON: List of detected anomalies or an error message.

    Example:
        GET http://localhost:5000/detect_anomalies_by_wallet?wallet_address=tz1...
"""
@app.route("/detect_anomalies_by_wallet", methods=["GET"])
def get_anomalies_by_wallet():
    wallet_address = request.args.get('wallet_address')

    if not wallet_address:
        return jsonify({"error": "wallet_address is required"}), 400

    try:
        # Fetch wallet-specific transaction data
        url = f"http://localhost:3000/tezos/walletTransactions?address={wallet_address}"
        df = fetch_and_preprocess_data_from_url(url)
        df = df[(df['from'] == wallet_address) | (df['to'] == wallet_address)]  # Filter for the specific wallet

        # Detect anomalies
        anomalies = detect_anomalies(df)

        # Store transactions in Neo4j with suspicion score
        store_transactions_in_neo4j(anomalies)

        return jsonify(anomalies.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to detect anomalies from the most recent transactions.
"""
    Returns:
        JSON: List of detected anomalies or an error message.

    Example:
        GET http://localhost:5000/detect_recent_anomalies
"""
@app.route("/detect_recent_anomalies", methods=["GET"])
def get_recent_anomalies():
    try:
        # Fetch recent transaction data
        df = fetch_and_preprocess_data_from_url(RECENT_TRANSACTION_URL)

        # Detect anomalies
        anomalies = detect_anomalies(df)

        # Store transactions in Neo4j with suspicion score
        store_transactions_in_neo4j(anomalies)

        return jsonify(anomalies.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to detect anomalies in transactions within a specified time period.
"""
    Args:
        start_time (str): Start date/time in YYYY-MM-DD format, passed as a query parameter.
        end_time (str): End date/time in YYYY-MM-DD format, passed as a query parameter.

    Returns:
        JSON: List of detected anomalies or an error message.

    Example:
        GET http://localhost:5000/detect_time_period_anomalies?start_time=2023-01-01&end_time=2023-01-31
"""
@app.route("/detect_time_period_anomalies", methods=["GET"])
def get_time_period_anomalies():
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')

    if not start_time or not end_time:
        return jsonify({"error": "start_time and end_time are required"}), 400

    try:
        # Fetch transaction data for the specified time period
        url = f"http://localhost:3000/tezos/timePeriodData?startDate={start_time}&endDate={end_time}"
        df = fetch_and_preprocess_data_from_url(url)

        # Detect anomalies
        anomalies = detect_anomalies(df)

        # Store transactions in Neo4j with suspicion score
        store_transactions_in_neo4j(anomalies)

        return jsonify(anomalies.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to detect mixing patterns and anomalies in recent transactions.
"""
    Returns:
        JSON: List of detected mixing patterns and anomalies or an error message.

    Example:
         GET http://localhost:5000/detect_mixing
"""
# @app.route("/detect_mixing", methods=["GET"])
# def get_mixing_anomalies():
#     try:
#         df = fetch_and_preprocess_data_from_url(RECENT_TRANSACTION_URL)
#         anomalies = detect_mixing_patterns_and_anomalies(df)
#         return jsonify(anomalies.to_dict(orient='records'))
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# -------------------- Main Entry Point --------------------
if __name__ == "__main__":
    app.run(debug=True)
