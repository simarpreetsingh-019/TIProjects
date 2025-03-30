import pandas as pd
import numpy as np

num_rows = 10000

data = {
    'feature1': np.random.uniform(0, 10, size=num_rows),
    'feature2': np.random.uniform(0, 10, size=num_rows),
    'feature3': np.random.uniform(0, 10, size=num_rows),
    'target': np.random.randint(0, 2, size=num_rows)
}

df = pd.DataFrame(data)

df.to_csv('ldata_demo.csv', index=False)
