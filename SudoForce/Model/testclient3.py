import base64
import json
import requests

payload = {
    'contentHash': 'cassy',
    'decryptKey': '1234',
    'price': 11
}
response = requests.post('http://127.0.0.1:5000/add-file', json=payload)
print(response.json())