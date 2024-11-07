// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Warranty {
    struct WarrantyInfo {
        string productName;
        uint256 warrantyPeriod; // in months
        string imeiNumber;
        uint256 warrantyStartDate; // Timestamp
        uint256 warrantyEndDate; // Timestamp
        string additionalStatement; // Any additional statement
    }

    mapping(address => WarrantyInfo) private warranties;

    address public manufacturer;

    constructor() {
        manufacturer = msg.sender; // Set the deployer as the manufacturer
    }

    modifier onlyManufacturer() {
        require(msg.sender == manufacturer, "Not authorized");
        _;
    }

    function registerWarranty(
        address user,
        string memory productName,
        uint256 warrantyPeriod,
        string memory imeiNumber,
        uint256 warrantyStartDate,
        string memory additionalStatement
    ) public onlyManufacturer {
        uint256 warrantyEndDate = warrantyStartDate + (warrantyPeriod * 30 days);

        warranties[user] = WarrantyInfo({
            productName: productName,
            warrantyPeriod: warrantyPeriod,
            imeiNumber: imeiNumber,
            warrantyStartDate: warrantyStartDate,
            warrantyEndDate: warrantyEndDate,
            additionalStatement: additionalStatement
        });
    }

    function getWarrantyInfo(address user) public view returns (WarrantyInfo memory) {
        return warranties[user];
    }
}
