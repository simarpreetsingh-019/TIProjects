//  SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Upload {
    struct Case {
        string[] files;
        mapping(address => bool) accessList;
    }

    mapping(string => Case) cases;
    mapping(string => address[]) caseAccess; // Mapping from case ID to addresses with access
    string[] caseIDs; // Array to track case IDs

    event CaseAdded(string caseID);

    function addCase(string memory caseID, string memory CID) external returns (bool) {
        cases[caseID].files.push(CID);
        cases[caseID].accessList[msg.sender] = true;
        caseAccess[caseID].push(msg.sender); // Add the owner to the access list for the case
        emit CaseAdded(caseID);
        caseIDs.push(caseID); // Add the case ID to the array
        return true;
    }

    function allowAccess(address user, string memory caseID) external {
        require(hasAccess(caseID), "You don't have access to this case");
        cases[caseID].accessList[user] = true;
        caseAccess[caseID].push(user); // Add the user to the access list for the case
    }

    function disallowAccess(address user, string memory caseID) external {
        require(hasAccess(caseID), "You don't have access to this case");
        delete cases[caseID].accessList[user];
        removeAddressFromArray(caseAccess[caseID], user); // Remove the user from the access list for the case
    }

    function getUsersWithAccess(string memory caseID) external view returns (address[] memory) {
        require(hasAccess(caseID), "You don't have access to this case");
        return caseAccess[caseID];
    }

    function displayCases(address user) external view returns (string[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < caseIDs.length; i++) {
            if (hasAccess(caseIDs[i], user)) {
                count++;
            }
        }
        string[] memory accessibleCases = new string[](count);
        count = 0;
        for (uint256 i = 0; i < caseIDs.length; i++) {
            if (hasAccess(caseIDs[i], user)) {
                accessibleCases[count] = caseIDs[i];
                count++;
            }
        }
        return accessibleCases;
    }

    // Helper function to check if the user has access to a specific case
    function hasAccess(string memory caseID, address user) internal view returns (bool) {
        return cases[caseID].accessList[user];
    }

    // Helper function to remove an address from an array
    function removeAddressFromArray(address[] storage array, address value) internal {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                array[i] = array[array.length - 1];
                array.pop();
                return;
            }
        }
    }

    function getCaseData(string memory caseID) external view returns (string[] memory) {
        require(hasAccess(caseID), "You don't have access to this case");
        return cases[caseID].files;
    }

    function hasAccess(string memory caseID) internal view returns (bool) {
        return cases[caseID].accessList[msg.sender];
    }
}

