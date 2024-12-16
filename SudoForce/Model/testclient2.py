import base64
import json
import requests

payload = {
    'model_file': 'test.py',
    'dataset_name': 'data_demo.csv'
}
response = requests.post('http://127.0.0.1:5000/train_model', json=payload)
print(response.json())