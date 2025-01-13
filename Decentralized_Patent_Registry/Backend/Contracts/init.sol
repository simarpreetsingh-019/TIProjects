// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatentRegistry {

    // Enum to store patent status
    enum Status { Registered, Granted }

    // Struct to store patent information
    struct Patent {
        string title;
        string abstractText;  // Add abstract field
        string description;
        address owner;
        uint256 applicationNumber; // Add application number
        uint256 registrationDate;
        uint256 expirationDate;
        string ipfsHash;

        Status status;  // Add status field
    }

    // Constants
    uint256 public constant DURATION = 365 * 24 * 60 * 60; // 1 year in seconds
    address public admin;  // Admin address

    // Counter for unique patent IDs
    uint256 public patentCounter;

    // Mapping to store patents with unique patent ID
    mapping(uint256 => Patent) public patents;

    // Mapping to store patents owned by an address
    mapping(address => uint256[]) public ownerPatents;

    // Events to emit when patents are registered, transferred, or renewed
    event PatentRegistered(uint256 patentId, string title, address owner, string ipfsHash);
    event PatentTransferred(uint256 patentId, address from, address to);
    event PatentRenewed(uint256 patentId, uint256 newExpirationDate);
    event PatentStatusUpdated(uint256 patentId, Status status);

    constructor() {
        admin = msg.sender;  // Set the deployer as admin
        patentCounter = 0;   // Initialize the patent ID counter
    }

    // Modifier to restrict access to admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Function to generate a random application number
    function _generateApplicationNumber() internal view returns (uint256) {
        // This is a pseudo-random number generator, not truly random
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 1000000; 
    }

    // Function to register a new patent
    function registerPatent(
        string memory _title, 
        string memory _abstractText, 
        string memory _description, 
        string memory _ipfsHash
    ) 
        public 
    {
        patentCounter++;
        uint256 newPatentId = patentCounter;
        uint256 applicationNumber = _generateApplicationNumber(); // Generate application number

        // Store patent information including the IPFS hash, abstract, and status
        patents[newPatentId] = Patent({
            title: _title,
            abstractText: _abstractText,  // Store abstract
            description: _description,
            owner: msg.sender,
            applicationNumber: applicationNumber,  // Store application number
            registrationDate: block.timestamp,
            expirationDate: block.timestamp + DURATION,
            ipfsHash: _ipfsHash,

            status: Status.Registered  // Set status to Registered on registration
        });

        // Track patent ownership
        ownerPatents[msg.sender].push(newPatentId);

        // Emit event when a patent is registered
        emit PatentRegistered(newPatentId, _title, msg.sender, _ipfsHash);
    }

    function transferPatent(uint256 _patentId, address _to) public {
        require(patents[_patentId].owner == msg.sender, "You are not the owner of this patent");
        require(block.timestamp <= patents[_patentId].expirationDate, "Patent has expired, renew it before transfer");

        // Transfer ownership
        patents[_patentId].owner = _to;

        _removePatentFromOwner(msg.sender, _patentId);

        ownerPatents[_to].push(_patentId);

        emit PatentTransferred(_patentId, msg.sender, _to);
    }

   function renewPatent(uint256 _patentId) public {
    require(patents[_patentId].owner == msg.sender, "You are not the owner of this patent");
    patents[_patentId].expirationDate += DURATION;
    emit PatentRenewed(_patentId, patents[_patentId].expirationDate);
}


    // Function to change the status of a patent to Granted (admin-only)
    function grantPatent(uint256 _patentId) public onlyAdmin {
        patents[_patentId].status = Status.Granted;

        emit PatentStatusUpdated(_patentId, Status.Granted);
    }

    function getPatentDetails(uint256 _patentId) public view returns (
        string memory title, 
        string memory abstractText, 
        string memory description, 
        address owner, 
        uint256 applicationNumber, 
        uint256 registrationDate, 
        uint256 expirationDate, 
        string memory ipfsHash, 

        Status status
    ) {
        Patent memory patent = patents[_patentId];
        return (
            patent.title, 
            patent.abstractText,  // Return abstract
            patent.description, 
            patent.owner, 
            patent.applicationNumber,  // Return application number
            patent.registrationDate, 
            patent.expirationDate, 
            patent.ipfsHash, 

            patent.status
        );
    }

    // Function to get all patents owned by a specific address
    function getOwnerPatents(address _owner) public view returns (uint256[] memory) {
        return ownerPatents[_owner];
    }

    // Search function to find patents by title or abstract
    function searchPatents(string memory _query) public view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](patentCounter);
        uint256 count = 0;

        for (uint256 i = 1; i <= patentCounter; i++) {
            if (contains(patents[i].title, _query) || contains(patents[i].abstractText, _query)) {
                results[count] = i;
                count++;
            }
        }

        // Resize the results array
        uint256[] memory filteredResults = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            filteredResults[j] = results[j];
        }

        return filteredResults;
    }

    // Internal function to remove a patent from the current owner's list
    function _removePatentFromOwner(address _owner, uint256 _patentId) internal {
        uint256 length = ownerPatents[_owner].length;
        for (uint256 i = 0; i < length; i++) {
            if (ownerPatents[_owner][i] == _patentId) {
                ownerPatents[_owner][i] = ownerPatents[_owner][length - 1];
                ownerPatents[_owner].pop();
                break;
            }
        }
    }

    // Helper function to check if a string contains another string (case insensitive)
    function contains(string memory _str, string memory _search) internal pure returns (bool) {
        bytes memory strBytes = bytes(_str);
        bytes memory searchBytes = bytes(_search);

        if (searchBytes.length > strBytes.length) {
            return false;
        }

        for (uint256 i = 0; i <= strBytes.length - searchBytes.length; i++) {
            bool matched = true;
            for (uint256 j = 0; j < searchBytes.length; j++) {
                if (strBytes[i + j] != searchBytes[j]) {
                    matched = false;
                    break;
                }
            }

            if (matched) {
                return true;
            }
        }

        return false;
    }
}