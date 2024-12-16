from flask import Flask, jsonify, request
from web3 import Web3

app = Flask(__name__)

ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

if not web3.is_connected():
    print("Failed to connect to Ganache")
else:
    print("Connected to Ganache")

contract_abi = [{
                "anonymous": False,
                "inputs": [
                    {
                        "indexed": True,
                        "internalType": "address",
                        "name": "uploader",
                        "type": "address"
                    },
                    {
                        "indexed": True,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": False,
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    }
                ],
                "name": "AccessGranted",
                "type": "event"
            },
            {
                "anonymous": False,
                "inputs": [
                    {
                        "indexed": True,
                        "internalType": "address",
                        "name": "uploader",
                        "type": "address"
                    },
                    {
                        "indexed": False,
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    },
                    {
                        "indexed": False,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "FileAdded",
                "type": "event"
            },
            {
                "anonymous": False,
                "inputs": [
                    {
                        "indexed": True,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": False,
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    }
                ],
                "name": "FilePurchased",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_contentHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_decryptKey",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "addFile",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "allContentHashes",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_contentHash",
                        "type": "string"
                    }
                ],
                "name": "buyAccess",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "filesByHash",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "decryptKey",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "uploader",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_contentHash",
                        "type": "string"
                    }
                ],
                "name": "getFileData",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "decryptKey",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getFiles",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getUserFiles",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "contentHash",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "decryptKey",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "authorizedUsers",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "exists",
                                "type": "bool"
                            },
                            {
                                "internalType": "address",
                                "name": "uploader",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct FileStorage.File[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_contentHash",
                        "type": "string"
                    }
                ],
                "name": "grantAccess",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "userFiles",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "contentHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "decryptKey",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "uploader",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }]
contract_address = "0x0B86A5C79b856e7706222B3e52eA957F36EF3b3c"

# Load the deployed contract
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Account (deployer's account)
deployer_address = web3.eth.accounts[0]  # The first account in Ganache


@app.route('/add-file', methods=['POST'])
def add_file():
    try:
        data = request.json
        content_hash = data['contentHash']
        print("b4 b4 build")
        decrypt_key = data['decryptKey']
        price = int(data['price'])

        print("b4 build")
        tx = contract.functions.addFile(content_hash, decrypt_key, price).build_transaction({
            'from': deployer_address,
            'nonce': web3.eth.get_transaction_count(deployer_address),
            'gas': 3000000,
            'gasPrice': web3.to_wei('20', 'gwei')
        })

        print("at build")
        signed_tx = web3.eth.account.sign_transaction(tx, private_key='YOUR_PRIVATE_KEY')
        print(signed_tx)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print(tx_hash)
        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        print(tx_receipt)

        return jsonify({
            'transactionHash': web3.to_hex(tx_hash),
            'contractAddress': contract_address,
            'status': 'File added successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/buy-access', methods=['POST'])
def buy_access():
    try:
        data = request.json
        content_hash = data['contentHash']

        # Get the file price from the contract
        file_data = contract.functions.filesByHash(content_hash).call()
        price = file_data[3]  # The file's price

        # Build the transaction
        tx = contract.functions.buyAccess(content_hash).buildTransaction({
            'from': deployer_address,
            'value': price,
            'nonce': web3.eth.get_transaction_count(deployer_address),
            'gas': 3000000,
            'gasPrice': web3.to_wei('20', 'gwei')
        })

        # Sign the transaction
        signed_tx = web3.eth.account.signTransaction(tx, private_key='YOUR_PRIVATE_KEY')

        # Send the transaction
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

        # Wait for the transaction to be mined
        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        return jsonify({
            'transactionHash': web3.to_hex(tx_hash),
            'status': 'Access purchased successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/grant-access', methods=['POST'])
def grant_access():
    try:
        data = request.json
        content_hash = data['contentHash']
        user_address = data['userAddress']

        # Build the transaction
        tx = contract.functions.grantAccess(user_address, content_hash).buildTransaction({
            'from': deployer_address,
            'nonce': web3.eth.get_transaction_count(deployer_address),
            'gas': 3000000,
            'gasPrice': web3.to_wei('20', 'gwei')
        })

        # Sign the transaction
        signed_tx = web3.eth.account.signTransaction(tx, private_key='YOUR_PRIVATE_KEY')

        # Send the transaction
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

        # Wait for the transaction to be mined
        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        return jsonify({
            'transactionHash': web3.to_hex(tx_hash),
            'status': 'Access granted successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)

