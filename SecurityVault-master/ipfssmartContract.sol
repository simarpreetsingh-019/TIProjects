// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract Upload {
    mapping(address => string[]) private userFiles;

    modifier onlyOwnerAccess(address _user) {
        require(msg.sender == _user, "You are not Authorised");
        _;
    }

    function uploadFile(address _user, string memory _ipfsHash) external {
        userFiles[_user].push(_ipfsHash);
    }

    function viewFiles(address _user, uint maxResults) 
        external 
        onlyOwnerAccess(_user) 
        view 
        returns (string[] memory) 
    {
        uint length = userFiles[_user].length;
        if (maxResults > length) {
            maxResults = length;
        }

        string[] memory files = new string[](maxResults);
        for (uint i = 0; i < maxResults; i++) {
            files[i] = userFiles[_user][i];
        }

        return files;
    }
}
