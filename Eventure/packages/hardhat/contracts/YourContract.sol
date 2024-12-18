// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract YourContract is ERC721URIStorage {
     struct Counter {
        uint256 _value;
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }

    Counter private _tokenIds;

    struct Community {
        uint256 id; 
        string name;
        string description;
        string instagramHandle;
        string linkedinHandle;
        string twitterHandle;
        address creatorAddress;
        uint256 followerCount;
        mapping(address => bool) followers;
        uint256[] eventIds;
    }

    struct Event {
        uint256 id;
        string name;
        string description;
        uint256 startTime;
        uint256 endTime;
        string location;
        uint256 capacity;
        uint256 availableSeats;
        uint256 ticketPrice;
        address creatorAddress;
        uint256 creatorCommunityId;  
        string bountyTitle;
        string bountyDescription;
        uint256 bountyAmount;
        uint256 totalSponsored;
        Sponsor[] sponsors;
    }

    struct Sponsor {
        address userAddress;
        uint256 communityId;
        uint256 amountSponsored;
    }

    struct Bounty {
        string title;
        string description;
        uint256 totalRequiredAmount;
        address sponsorAddress;
        uint256 communityId;
        uint256 sponsoredAmount;
        uint256 numberOfSponsoringCommunities;
    }

    struct User {
        address userAddress;
        uint256[] fundedEvents;
        uint256[] joinedCommunities;
        uint256[] tickets;
        uint256[] createdEvents;
        mapping(uint256 => uint256) amountFunded;
    }

    mapping(uint256 => Community) public communities;
    mapping(string => uint256) public communityNameToId; 
    mapping(uint256 => Event) public events;
    mapping(address => User) public users;
    mapping(uint256 => Bounty) public bounties;

    uint256 public communityCounter;
    uint256 public eventCounter;
    uint256 public bountyCounter;

    constructor() ERC721("EventTicket", "EVTK") {}

   function registerCommunity(
        string memory _name,
        string memory _description,
        string memory _instagramHandle,
        string memory _linkedinHandle,
        string memory _twitterHandle
    ) public returns (uint256) {
        require(communityNameToId[_name] == 0, "Community name already exists");
        
        communityCounter++;
        uint256 newCommunityId = communityCounter;
        
        Community storage newCommunity = communities[newCommunityId];
        newCommunity.id = newCommunityId;
        newCommunity.name = _name;
        newCommunity.description = _description;
        newCommunity.instagramHandle = _instagramHandle;
        newCommunity.linkedinHandle = _linkedinHandle;
        newCommunity.twitterHandle = _twitterHandle;
        newCommunity.creatorAddress = msg.sender;
        
        communityNameToId[_name] = newCommunityId;
        
        return newCommunityId;
    }

    function followCommunity(uint256 _communityId) public {
        require(_communityId <= communityCounter, "Invalid community ID");
        Community storage community = communities[_communityId];
        require(!community.followers[msg.sender], "Already following");
        community.followers[msg.sender] = true;
        community.followerCount++;
        users[msg.sender].joinedCommunities.push(_communityId);
    }

  function registerEvent(
    string memory _name,
    string memory _description,
    string memory _startTime,
    string memory _endTime,
    string memory _location,
    uint256 _capacity,
    uint256 _ticketPrice,
    string memory _creatorCommunityName,
    string memory _bountyTitle,
    string memory _bountyDescription,
    uint256 _bountyAmount
) public returns (uint256) {
    uint256 communityId = communityNameToId[_creatorCommunityName];
    require(communityId != 0, "Community does not exist");
    require(communityId <= communityCounter, "Invalid community ID");

    eventCounter++;
    uint256 newEventId = eventCounter;
    
    Event storage newEvent = events[newEventId];
    newEvent.id = newEventId;
    newEvent.name = _name;
    newEvent.description = _description;
    newEvent.startTime = parseDate(_startTime);
    newEvent.endTime = parseDate(_endTime);
    newEvent.location = _location;
    newEvent.capacity = _capacity;
    newEvent.availableSeats = _capacity;
    newEvent.ticketPrice = _ticketPrice;
    newEvent.creatorAddress = msg.sender;
    newEvent.creatorCommunityId = communityId;
    newEvent.bountyTitle = _bountyTitle;
    newEvent.bountyDescription = _bountyDescription;
    newEvent.bountyAmount = _bountyAmount * 1 ether; // Convert to wei
    newEvent.totalSponsored = 0;

    // Add the event ID to the community's events array
    communities[communityId].eventIds.push(newEventId);

    users[msg.sender].createdEvents.push(newEventId);

    return newEventId;
}

function getCommunityDetails(uint256 _communityId) public view returns (
        uint256 id,
        string memory name,
        string memory description,
        string memory instagramHandle,
        string memory linkedinHandle,
        string memory twitterHandle,
        address creatorAddress,
        uint256 followerCount,
        uint256[] memory eventIds
    ) {
        require(_communityId != 0 && _communityId <= communityCounter, "Invalid community ID");
        Community storage community = communities[_communityId];
        
        return (
            community.id,
            community.name,
            community.description,
            community.instagramHandle,
            community.linkedinHandle,
            community.twitterHandle,
            community.creatorAddress,
            community.followerCount,
            community.eventIds
        );
    }
     function getEventDetails(uint256 _eventId) public view returns (
        uint256 id,
        string memory name,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        string memory location,
        uint256 capacity,
        uint256 availableSeats,
        uint256 ticketPrice,
        address creatorAddress,
        uint256 creatorCommunityId,
        string memory bountyTitle,
        string memory bountyDescription,
        uint256 bountyAmount,
        Sponsor[] memory sponsors
    ) {
        require(_eventId != 0 && _eventId <= eventCounter, "Invalid event ID");
        Event storage evt = events[_eventId];
        
        return (
            evt.id,
            evt.name,
            evt.description,
            evt.startTime,
            evt.endTime,
            evt.location,
            evt.capacity,
            evt.availableSeats,
            evt.ticketPrice,
            evt.creatorAddress,
            evt.creatorCommunityId,
            evt.bountyTitle,
            evt.bountyDescription,
            evt.bountyAmount,
            evt.sponsors
        );
    }



function parseDate(string memory _date) internal pure returns (uint256) {
    bytes memory dateBytes = bytes(_date);
    require(dateBytes.length == 10, "Invalid date format");

    uint256 day = parseInt(substring(_date, 0, 2));
    uint256 month = parseInt(substring(_date, 3, 5));
    uint256 year = parseInt(substring(_date, 6, 10));

    require(day >= 1 && day <= 31, "Invalid day");
    require(month >= 1 && month <= 12, "Invalid month");
    require(year >= 1970, "Year must be 1970 or later");

    // Simple leap year calculation
    uint256 daysInMonth;
    if (month == 2) {
        daysInMonth = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) ? 29 : 28;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        daysInMonth = 30;
    } else {
        daysInMonth = 31;
    }
    require(day <= daysInMonth, "Invalid day for given month and year");

    // Calculate Unix timestamp
    uint256 timestamp = (year - 1970) * 365 days;
    timestamp += ((year - 1969) / 4) * 1 days; // Leap years since 1970
    timestamp -= ((year - 1901) / 100) * 1 days; // Century years
    timestamp += ((year - 1601) / 400) * 1 days; // 400-year cycles

    uint256[12] memory monthDays = [uint256(0), 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    timestamp += monthDays[month - 1] * 1 days;
    
    if (month > 2 && ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))) {
        timestamp += 1 days; // Add leap day if after February in a leap year
    }

    timestamp += (day - 1) * 1 days;

    return timestamp;
}
function parseInt(string memory _value) internal pure returns (uint256) {
    bytes memory b = bytes(_value);
    uint256 result = 0;
    for (uint256 i = 0; i < b.length; i++) {
        require(uint8(b[i]) >= 48 && uint8(b[i]) <= 57, "Invalid character");
        result = result * 10 + (uint8(b[i]) - 48);
    }
    return result;
}

function substring(string memory str, uint256 startIndex, uint256 endIndex) internal pure returns (string memory) {
    bytes memory strBytes = bytes(str);
    bytes memory result = new bytes(endIndex - startIndex);
    for (uint256 i = startIndex; i < endIndex; i++) {
        result[i - startIndex] = strBytes[i];
    }
    return string(result);
}

   function createBounty(
    uint256 _eventId,
    string memory _title,
    string memory _description,
    uint256 _totalRequiredAmount,
    string memory _communityName
) public {
    require(_eventId > 0 && _eventId <= eventCounter, "Invalid event ID");
    uint256 communityId = communityNameToId[_communityName];
    require(communityId != 0, "Community does not exist");
    
    bountyCounter++;
    Bounty storage newBounty = bounties[bountyCounter];
    newBounty.title = _title;
    newBounty.description = _description;
    newBounty.totalRequiredAmount = _totalRequiredAmount;
    newBounty.sponsorAddress = msg.sender;
    newBounty.communityId = communityId;
    newBounty.sponsoredAmount = 0;
    newBounty.numberOfSponsoringCommunities = 0;

    events[_eventId].bountyTitle = _title;
    events[_eventId].bountyDescription = _description;
    events[_eventId].bountyAmount = _totalRequiredAmount;
}

function getBountyDetails(uint256 _bountyId) public view returns (
    string memory title,
    string memory description,
    uint256 totalRequiredAmount,
    address sponsorAddress,
    uint256 communityId,
    uint256 sponsoredAmount,
    uint256 numberOfSponsoringCommunities
) {
    require(_bountyId > 0 && _bountyId <= bountyCounter, "Invalid bounty ID");
    Bounty storage bounty = bounties[_bountyId];
    
    return (
        bounty.title,
        bounty.description,
        bounty.totalRequiredAmount,
        bounty.sponsorAddress,
        bounty.communityId,
        bounty.sponsoredAmount,
        bounty.numberOfSponsoringCommunities
    );
}

    function payBounty(uint256 _eventId) public payable {
        Event storage evt = events[_eventId];
        require(msg.value > 0, "Amount must be greater than 0");
        require(evt.bountyAmount > 0, "No bounty for this event");

        require(evt.totalSponsored + msg.value <= evt.bountyAmount, "Exceeds required amount");

        uint256 userCommunityId = 0;
        for (uint256 i = 0; i < users[msg.sender].joinedCommunities.length; i++) {
            if (communities[users[msg.sender].joinedCommunities[i]].followers[msg.sender]) {
                userCommunityId = users[msg.sender].joinedCommunities[i];
                break;
            }
        }

        evt.sponsors.push(Sponsor({
            userAddress: msg.sender,
            communityId: userCommunityId,
            amountSponsored: msg.value
        }));

        evt.totalSponsored += msg.value;

        users[msg.sender].fundedEvents.push(_eventId);
        users[msg.sender].amountFunded[_eventId] += msg.value;
    }

   function generateNFT(uint256 _eventId) public payable returns (uint256) {
        require(_eventId <= eventCounter, "Invalid event ID");
        Event storage eventItem = events[_eventId];
        require(msg.value == eventItem.ticketPrice, "Incorrect ticket price");
        require(eventItem.availableSeats > 0, "No available seats");

        increment(_tokenIds);
        uint256 newItemId = current(_tokenIds);
        
        string memory qrCode = generateQRCode(msg.sender, newItemId);
        string memory tokenURI = generateTokenURI(eventItem, qrCode, newItemId);

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        users[msg.sender].tickets.push(newItemId);
        eventItem.availableSeats--;

        return newItemId;
    }

    function generateQRCode(address _user, uint256 _tokenId) internal pure returns (string memory) {
        return string(abi.encodePacked("QR_", toHexString(uint160(_user), 20), "_", toHexString(_tokenId, 32)));
    }

    function generateTokenURI(Event storage _event, string memory _qrCode, uint256 _tokenId) internal view returns (string memory) {
    bytes memory dataURI = abi.encodePacked(
        '{',
        '"name": "', _event.name, '",',
        '"description": "Event Ticket",',
        '"image": "', _qrCode, '",',
        '"attributes": [',
        '{"trait_type": "Event ID", "value": "', toHexString(_tokenId, 32), '"},',
        '{"trait_type": "Location", "value": "', _event.location, '"},',
        '{"trait_type": "Start Time", "value": "', formatDate(_event.startTime), '"},',
        '{"trait_type": "End Time", "value": "', formatDate(_event.endTime), '"},',
        '{"trait_type": "Creator Community ID", "value": "', toHexString(_event.creatorCommunityId, 32), '"}',
        ']}'
    );
    return string(
        abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(dataURI)
        )
    );
}
function formatDate(uint256 timestamp) internal pure returns (string memory) {
    // This is a simplified date formatting function
    // You might want to use a more sophisticated method or an oracle for production
    uint256 year = timestamp / 31536000 + 1970;
    uint256 month = (timestamp % 31536000) / 2592000 + 1;
    uint256 day = ((timestamp % 31536000) % 2592000) / 86400 + 1;
    return string(abi.encodePacked(
        toHexString(year, 4), "-",
        toHexString(month, 2), "-",
        toHexString(day, 2)
    ));
}

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = bytes1(uint8(48 + uint256(uint8(value & 0xf))));
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
    
    function getAllCommunities() public view returns (
        uint256[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        address[] memory,
        uint256[] memory,
        uint256[][] memory,
        string[][] memory,
        string[][] memory
    ) {
        uint256[] memory ids = new uint256[](communityCounter);
        string[] memory names = new string[](communityCounter);
        string[] memory descriptions = new string[](communityCounter);
        string[] memory instagramHandles = new string[](communityCounter);
        string[] memory linkedinHandles = new string[](communityCounter);
        string[] memory twitterHandles = new string[](communityCounter);
        address[] memory creatorAddresses = new address[](communityCounter);
        uint256[] memory followerCounts = new uint256[](communityCounter);
        uint256[][] memory eventIds = new uint256[][](communityCounter);
        string[][] memory eventNames = new string[][](communityCounter);
        string[][] memory eventDescriptions = new string[][](communityCounter);

        for (uint256 i = 1; i <= communityCounter; i++) {
            Community storage community = communities[i];
            ids[i-1] = community.id;
            names[i-1] = community.name;
            descriptions[i-1] = community.description;
            instagramHandles[i-1] = community.instagramHandle;
            linkedinHandles[i-1] = community.linkedinHandle;
            twitterHandles[i-1] = community.twitterHandle;
            creatorAddresses[i-1] = community.creatorAddress;
            followerCounts[i-1] = community.followerCount;
            
            uint256[] memory communityEventIds = community.eventIds;
            eventIds[i-1] = communityEventIds;
            eventNames[i-1] = new string[](communityEventIds.length);
            eventDescriptions[i-1] = new string[](communityEventIds.length);
            
            for (uint256 j = 0; j < communityEventIds.length; j++) {
                Event storage evt = events[communityEventIds[j]];
                eventNames[i-1][j] = evt.name;
                eventDescriptions[i-1][j] = evt.description;
            }
        }

        return (ids, names, descriptions, instagramHandles, linkedinHandles, twitterHandles, creatorAddresses, followerCounts, eventIds, eventNames, eventDescriptions);
    }

    function getAllEvents() public view returns (
        uint256[] memory,
        string[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        uint256[] memory,
        address[] memory,
        uint256[] memory,
        string[] memory,
        string[] memory,
        uint256[] memory
    ) {
        uint256[] memory ids = new uint256[](eventCounter);
        string[] memory names = new string[](eventCounter);
        string[] memory descriptions = new string[](eventCounter);
        uint256[] memory startTimes = new uint256[](eventCounter);
        uint256[] memory endTimes = new uint256[](eventCounter);
        string[] memory locations = new string[](eventCounter);
        uint256[] memory capacities = new uint256[](eventCounter);
        uint256[] memory availableSeats = new uint256[](eventCounter);
        uint256[] memory ticketPrices = new uint256[](eventCounter);
        address[] memory creatorAddresses = new address[](eventCounter);
        uint256[] memory creatorCommunityIds = new uint256[](eventCounter);
        string[] memory bountyTitles = new string[](eventCounter);
        string[] memory bountyDescriptions = new string[](eventCounter);
        uint256[] memory bountyAmounts = new uint256[](eventCounter);

        for (uint256 i = 1; i <= eventCounter; i++) {
            Event storage evt = events[i];
            ids[i-1] = evt.id;
            names[i-1] = evt.name;
            descriptions[i-1] = evt.description;
            startTimes[i-1] = evt.startTime;
            endTimes[i-1] = evt.endTime;
            locations[i-1] = evt.location;
            capacities[i-1] = evt.capacity;
            availableSeats[i-1] = evt.availableSeats;
            ticketPrices[i-1] = evt.ticketPrice;
            creatorAddresses[i-1] = evt.creatorAddress;
            creatorCommunityIds[i-1] = evt.creatorCommunityId;
            bountyTitles[i-1] = evt.bountyTitle;
            bountyDescriptions[i-1] = evt.bountyDescription;
            bountyAmounts[i-1] = evt.bountyAmount;
        }

        return (ids, names, descriptions, startTimes, endTimes, locations, capacities, availableSeats, ticketPrices, creatorAddresses, creatorCommunityIds, bountyTitles, bountyDescriptions, bountyAmounts);
    }

	function getUserActivity(address userAddress) public view returns (
    uint256[] memory fundedEvents,
    uint256[] memory joinedCommunities,
    uint256[] memory createdEvents,
    uint256[] memory fundedAmounts,
    string[] memory fundedEventNames,
    string[] memory joinedCommunityNames,
    string[] memory createdEventNames
) {
    User storage user = users[userAddress];
    
    fundedEvents = user.fundedEvents;
    joinedCommunities = user.joinedCommunities;
    createdEvents = user.createdEvents;
    
    fundedAmounts = new uint256[](fundedEvents.length);
    fundedEventNames = new string[](fundedEvents.length);
    joinedCommunityNames = new string[](joinedCommunities.length);
    createdEventNames = new string[](createdEvents.length);
    
    for (uint256 i = 0; i < fundedEvents.length; i++) {
        fundedAmounts[i] = user.amountFunded[fundedEvents[i]];
        fundedEventNames[i] = events[fundedEvents[i]].name;
    }
    
    for (uint256 i = 0; i < joinedCommunities.length; i++) {
        joinedCommunityNames[i] = communities[joinedCommunities[i]].name;
    }
    
    for (uint256 i = 0; i < createdEvents.length; i++) {
        createdEventNames[i] = events[createdEvents[i]].name;
    }
    
    return (fundedEvents, joinedCommunities, createdEvents, fundedAmounts, fundedEventNames, joinedCommunityNames, createdEventNames);
}

}