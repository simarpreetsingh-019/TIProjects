from flask import Flask, jsonify, request
from pytezos import pytezos
from web3 import Web3

ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

if not web3.isConnected():
    print("Failed to connect to Ganache")
else:
    print("Connected to Ganache")

contract_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contentHash",
                "type": "string"
            }
        ],
        "name": "AccessGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contentHash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "FileAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
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
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
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
    }
]
contract_bytecode = '0x' + '/* Paste the bytecode from Remix here */'


@app.route('/deploy', methods=['POST'])
def deploy_contract():
    try:
        accounts = web3.eth.accounts
        deployer = accounts[0]

        contract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

        tx = contract.constructor().build_transaction({
            'from': deployer,
            'nonce': web3.eth.get_transaction_count(deployer),
            'gas': 3000000,
            'gasPrice': web3.to_wei('20', 'gwei')
        })

        signed_tx = web3.eth.account.signTransaction(tx, private_key='YOUR_PRIVATE_KEY')

        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        return jsonify({
            'contractAddress': tx_receipt.contract_address,
            'transactionHash': web3.to_hex(tx_hash)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
