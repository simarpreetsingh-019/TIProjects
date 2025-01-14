from sklearn.linear_model import LogisticRegression
def train_model(data):

    X = data.drop(columns=['target'])
    y = data['target']
    model = LogisticRegression()
    model.fit(X, y)
    predictions = model.predict(X)
    return model, predictions, y
