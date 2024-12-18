import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  let yourContract: YourContract;
  let owner: any;
  let addr1: any;
  let addr2: any;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy()) as YourContract;
    await yourContract.waitForDeployment();
  });

  describe("Community Registration", function () {
    it("Should register a new community", async function () {
      await yourContract.registerCommunity(
        "Test Community",
        "Test Description",
        "test_insta",
        "test_linkedin",
        "test_twitter",
      );
      const communityDetails = await yourContract.getCommunityDetails(1);
      expect(communityDetails.name).to.equal("Test Community");
      expect(communityDetails.description).to.equal("Test Description");
      expect(communityDetails.instagramHandle).to.equal("test_insta");
      expect(communityDetails.linkedinHandle).to.equal("test_linkedin");
      expect(communityDetails.twitterHandle).to.equal("test_twitter");
    });

    it("Should not allow registering a community with an existing name", async function () {
      await expect(
        yourContract.registerCommunity("Test Community", "Another Description", "insta", "linkedin", "twitter"),
      ).to.be.revertedWith("Community name already exists");
    });
  });

  describe("Community Following", function () {
    it("Should allow a user to follow a community", async function () {
      await yourContract.connect(addr1).followCommunity(1);
      const communityDetails = await yourContract.getCommunityDetails(1);
      expect(communityDetails.followerCount).to.equal(1);
    });

    it("Should not allow a user to follow a community twice", async function () {
      await expect(yourContract.connect(addr1).followCommunity(1)).to.be.revertedWith("Already following");
    });
  });

  describe("Event Registration", function () {
    it("Should register a new event", async function () {
      await yourContract.registerEvent(
        "Test Event",
        "Test Event Description",
        "01/01/2024",
        "02/01/2024",
        "Test Location",
        100,
        ethers.parseEther("0.1"),
        "Test Community",
      );
      const eventDetails = await yourContract.getEventDetails(1);
      expect(eventDetails.name).to.equal("Test Event");
      expect(eventDetails.description).to.equal("Test Event Description");
      expect(eventDetails.location).to.equal("Test Location");
      expect(eventDetails.capacity).to.equal(100);
      expect(eventDetails.ticketPrice).to.equal(ethers.parseEther("0.1"));
    });

    it("Should not allow registering an event for a non-existent community", async function () {
      await expect(
        yourContract.registerEvent(
          "Invalid Event",
          "Description",
          "01/01/2024",
          "02/01/2024",
          "Location",
          100,
          ethers.parseEther("0.1"),
          "Non-existent Community",
        ),
      ).to.be.revertedWith("Community does not exist");
    });
  });

  describe("Bounty Creation", function () {
    it("Should create a new bounty", async function () {
      await yourContract.createBounty(
        1,
        "Test Bounty",
        "Test Bounty Description",
        ethers.parseEther("1"),
        "Test Community",
      );
      const bountyDetails = await yourContract.getBountyDetails(1);
      expect(bountyDetails.title).to.equal("Test Bounty");
      expect(bountyDetails.description).to.equal("Test Bounty Description");
      expect(bountyDetails.totalRequiredAmount).to.equal(ethers.parseEther("1"));
    });
  });

  describe("Bounty Payment", function () {
    it("Should allow paying a bounty", async function () {
      await yourContract.connect(addr1).payBounty(1, ethers.parseEther("0.5"), { value: ethers.parseEther("0.5") });
      const bountyDetails = await yourContract.getBountyDetails(1);
      expect(bountyDetails.sponsoredAmount).to.equal(ethers.parseEther("0.5"));
      expect(bountyDetails.numberOfSponsoringCommunities).to.equal(1);
    });

    it("Should not allow paying more than the required amount", async function () {
      await expect(
        yourContract.connect(addr2).payBounty(1, ethers.parseEther("1"), { value: ethers.parseEther("1") }),
      ).to.be.revertedWith("Exceeds required amount");
    });
  });

  describe("NFT Generation", function () {
    it("Should generate an NFT ticket", async function () {
      const ticketPrice = ethers.parseEther("0.1");
      await yourContract.connect(addr1).generateNFT(1, { value: ticketPrice });
      const eventDetails = await yourContract.getEventDetails(1);
      expect(eventDetails.availableSeats).to.equal(99);
    });

    it("Should not allow generating a ticket with incorrect price", async function () {
      const incorrectPrice = ethers.parseEther("0.05");
      await expect(yourContract.connect(addr2).generateNFT(1, { value: incorrectPrice })).to.be.revertedWith(
        "Incorrect ticket price",
      );
    });
  });
});
