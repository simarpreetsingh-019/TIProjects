// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../verifier.sol"; // Ensure this path is correct based on your project structure

contract AgeVerification {
    // Event emitted when age is verified
    event AgeVerified(address indexed user, bool isAbove18);

    // Mapping to track verified users
    mapping(address => bool) public verifiedUsers;

    // Function to verify age using the input value
    function verifyAge(uint256[] memory input) public {
        require(input.length > 0, "Input cannot be empty"); // Check input validity

        // Check if user is above 18 years
        bool isAbove18 = input[0] == 1;
        verifiedUsers[msg.sender] = isAbove18;

        // Emit event with verification result
        emit AgeVerified(msg.sender, isAbove18);
    }

    // Function to check if a user is above 18 years
    function isUserAbove18(address user) public view returns (bool) {
        return verifiedUsers[user];
    }
}
