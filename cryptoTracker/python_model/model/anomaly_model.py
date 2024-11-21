# model.py
from sklearn.ensemble import IsolationForest

def detect_anomalies(df):
    # Initialize Isolation Forest model
    model = IsolationForest(n_estimators=100, contamination=0.01, random_state=42)

    # Fit the model and predict anomalies (-1 for anomaly, 1 for normal)
    df['anomaly'] = model.fit_predict(df[['amount', 'time_diff']])

    # Filter anomalies
    anomalies = df[df['anomaly'] == -1]

    return anomalies
