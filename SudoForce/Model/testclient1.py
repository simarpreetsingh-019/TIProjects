import base64
import json
import requests

with open('test.py', 'rb') as f:
    data = f.read()
fb64 = base64.b64encode(data).decode('utf-8')
payload = {
    'name': 'test.py',
    'data': fb64
}
response = requests.post('http://127.0.0.1:5000/model_upload', json=payload)
print(response.json())