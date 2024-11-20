import pandas as pd
import requests

def fetch_and_preprocess_data_from_url(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from {url}. Status code: {response.status_code}")

    # Convert the transaction data into a Pandas DataFrame
    transaction_data = response.json()  # Get the full response

    # Print for debugging to see the structure of transaction_data
    # print("Fetched transaction data:", transaction_data)

    # If the response is a list, convert directly into DataFrame
    if isinstance(transaction_data, list):  
        df = pd.DataFrame(transaction_data)
    elif isinstance(transaction_data, dict) and "transactions" in transaction_data:
        df = pd.DataFrame(transaction_data["transactions"])  # Access the list via "transactions"
    else:
        raise Exception("Unexpected response format.")

    # Debugging: Print DataFrame columns
    print("DataFrame columns:", df.columns)

    # Check for the 'timestamp' column
    if 'timestamp' not in df.columns:
        print("Available columns:", df.columns.tolist())  # Log available columns for debugging
        raise Exception("'timestamp' key not found in DataFrame.")
    if 'amount' not in df.columns:
        raise Exception("'amount' key not found in DataFrame.")

    # Preprocessing
    df['timestamp'] = pd.to_datetime(df['timestamp'])  # Convert timestamp to datetime
    df['amount'] = df['amount'].astype(float)  # Convert amounts to float

    # Feature: Time difference between transactions
    df['time_diff'] = df['timestamp'].diff().dt.total_seconds().fillna(0)

    return df[['from', 'to', 'amount', 'hash', 'timestamp', 'time_diff']]
