import pandas as pd

data = {
    'feature1': [1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9.1, 1.0],
    'feature2': [3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9.1, 1.2, 2.3, 3.1],
    'feature3': [5.6, 6.7, 7.8, 8.9, 9.1, 1.2, 2.3, 3.4, 4.5, 5.1],
    'target':   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
}

df = pd.DataFrame(data)
df.to_csv('data_demo.csv', index=False)


