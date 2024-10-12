let provider
let signer;
let gameContract;

const contractAddress = "0xF7bB7Edcb520C9ed005afa9Bbb6A6C416C80cBDD";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approve_org",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approve_org_public",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distribute_pending_tokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_org_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "donate_to_organisation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mintTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "orgAddress",
				"type": "address"
			}
		],
		"name": "OrgRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_org",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_funds",
				"type": "uint256"
			}
		],
		"name": "register_org",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_org_address",
				"type": "address"
			}
		],
		"name": "removeOrg",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_my_balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contract_balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_registered_org",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "funds_remaining",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "org_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					}
				],
				"internalType": "struct Game2.Registered_org[]",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "is_org_applied",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
			}
		],
		"name": "is_org_registered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "org_queue",
		"outputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "funds_remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "registered_org_arr",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "funds_remaining",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
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
			}
		],
		"name": "registered_orgs",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "funds_remaining",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
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
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
window.onload = function() {
    localStorage.clear();
};

document.getElementById('connectWallet').onclick = async() => {

	 provider = new ethers.BrowserProvider(window. ethereum);
		await window.ethereum.request({ method: "eth_requestAccounts" });
		 signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(`connected account: ${await signer.getAddress()}`);
    document.getElementById('connectWallet').innerText = `${await signer.getAddress()}`;
    await fetchAndRenderOrganizations();

};

async function check_balance(){
	try {
        let balance = await contract.check_my_balance(); // Await the asynchronous call
        console.log(balance.toString());
        document.getElementById('balance').innerText = balance.toString();
        alert(`Your balance is ${balance.toString()}`);
		await fetchAndRenderOrganizations();
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}


async function fetchAndRenderOrganizations() {
    try {
        const organizations = await contract.get_registered_org();
		console.log(organizations);
        const orgData = organizations.map(org => ({
            name: org.name,
            description: org.description,
            funds_remaining: org.funds_remaining.toString(),
            org_address: org.org_address
        }));
		console.log(orgData)
        renderCards(orgData);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch organizations. Please try again.');
    }
}

function createCard(cardData) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('cardForTokens');

    const leftPartDiv = document.createElement('div');
    leftPartDiv.classList.add('leftPartOfCardForTokens');

    const nameHeader = document.createElement('h4');
    nameHeader.textContent = cardData.name;

    const descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = cardData.description;

    const fundsHeader = document.createElement('h5');
    fundsHeader.textContent = cardData.funds_remaining;

    const addressHeader = document.createElement('h5');
    addressHeader.textContent = cardData.org_address;

    const rightPartDiv = document.createElement('div');
    rightPartDiv.classList.add('rightPartOfCardForTokens');

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('id', `checkbox${cardData.org_address}`);
    checkboxInput.setAttribute('name', `option${cardData.org_address}`);

    leftPartDiv.appendChild(nameHeader);
    leftPartDiv.appendChild(descriptionHeader);
    leftPartDiv.appendChild(fundsHeader);
    leftPartDiv.appendChild(addressHeader);

    rightPartDiv.appendChild(checkboxInput);

    cardDiv.appendChild(leftPartDiv);
    cardDiv.appendChild(rightPartDiv);

    return cardDiv;
}

function renderCards(cardDataArray) {
    const cardContainer = document.getElementById("mainContainerForTokenCards");
    cardContainer.innerHTML = ''; // Clear existing cards

    cardDataArray.forEach(cardData => {
        const card = createCard(cardData);
        cardContainer.appendChild(card);
    });
}


document.getElementById('getTokens').addEventListener('click', async() => {
	isGameOver = c2_callFunction("isGameOver");
	if(isGameOver==1){
    kills = c2_callFunction("getKills");
    try {
        const tx = await contract.getTokens(kills);
		await tx.wait();
        alert(`${kills} Tokens received successfully!`);
        console.log(`Tokens received successfully`);
        await fetchAndRenderOrganizations();
    } catch (error) {
        console.error(error);
        alert('Failed to get tokens. Please try again.');
    }}
	else{
		alert('Game is not over yet');
	
	}
});


document.getElementById('donate').addEventListener('click', async() => {
    const orgAddress = document.getElementById("orgAddress").value;
    const amount = document.getElementById("donationAmount").value;
    if (!orgAddress || !amount) {
        alert('Please enter organization address and amount to donate.');
        return;
    }
    try {
        const tx = await contract.donate_to_organisation(orgAddress, amount);
        await tx.wait();
        console.log(`Donated ${amount} tokens to ${orgAddress}`);
        alert(`Donated ${amount} tokens to ${orgAddress}`);
        await fetchAndRenderOrganizations();
		await check_balance();
    } catch (error) {
        console.log(error);
        alert(`failed to donate. please try again`);
    }
});

document.getElementById('approve').addEventListener('click', async() => {
    try {
        const tx = await contract.approve_org();
        await tx.wait();
        console.log(`Approved successfully!`);
        alert(`Approved successfully!`);
		await fetchAndRenderOrganizations();
    } catch (error) {
        console.log(error);
        alert(`failed to approve. please try again`);
    }
});


document.getElementById('approve_public_test').addEventListener('click', async() => {
    try {
        const tx = await contract.approve_org_public();
        await tx.wait();
        console.log(`Approved successfully!`);
        alert(`Approved successfully!`);
		await fetchAndRenderOrganizations();
    } catch (error) {
        console.log(error);
        alert(`failed to approve. please try again`);
    }
});

async function registerOrg(){
    const orgAddress = document.getElementById('orgAdd').value;
    const orgName = document.getElementById('orgName').value;
    const orgDescription = document.getElementById('orgDescription').value;
    const orgRequiredFunds = document.getElementById('orgRequiredFunds').value;
    try {
        const tx = await contract.register_org(orgAddress,orgName,orgDescription,orgRequiredFunds);
        await tx.wait();
        console.log("registered successfully");
        alert(`registered successfully`);
		await fetchAndRenderOrganizations();
    }
    catch(error){
        console.log(error);
        alert(`failed in registering , please try again`);
    }
}

