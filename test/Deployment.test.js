const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3 Job Platform Deployment", function () {
  let yellowJobToken;
  let fraudDetection;
  let web3JobPlatform;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contracts
    const YellowJobToken = await ethers.getContractFactory("YellowJobToken");
    const FraudDetection = await ethers.getContractFactory("FraudDetection");
    const Web3JobPlatform = await ethers.getContractFactory("Web3JobPlatform");

    yellowJobToken = await YellowJobToken.deploy();
    await yellowJobToken.waitForDeployment();

    fraudDetection = await FraudDetection.deploy();
    await fraudDetection.waitForDeployment();

    web3JobPlatform = await Web3JobPlatform.deploy(await yellowJobToken.getAddress());
    await web3JobPlatform.waitForDeployment();
  });

  describe("Contract Deployment", function () {
    it("Should deploy YellowJobToken successfully", async function () {
      expect(await yellowJobToken.getAddress()).to.not.equal(ethers.ZeroAddress);
      expect(await yellowJobToken.name()).to.equal("Yellow Job Token");
      expect(await yellowJobToken.symbol()).to.equal("YJT");
      expect(await yellowJobToken.decimals()).to.equal(18);
    });

    it("Should deploy FraudDetection successfully", async function () {
      expect(await fraudDetection.getAddress()).to.not.equal(ethers.ZeroAddress);
      expect(await fraudDetection.MAX_APPLICATIONS_PER_DAY()).to.equal(10);
      expect(await fraudDetection.MAX_JOBS_PER_DAY()).to.equal(5);
    });

    it("Should deploy Web3JobPlatform successfully", async function () {
      expect(await web3JobPlatform.getAddress()).to.not.equal(ethers.ZeroAddress);
      expect(await web3JobPlatform.PLATFORM_FEE_PERCENTAGE()).to.equal(5);
      expect(await web3JobPlatform.MIN_STAKE_AMOUNT()).to.equal(ethers.parseEther("1000"));
    });
  });

  describe("Contract Integration", function () {
    it("Should have correct staking token address", async function () {
      const stakingTokenAddress = await web3JobPlatform.stakingToken();
      expect(stakingTokenAddress).to.equal(await yellowJobToken.getAddress());
    });

    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await yellowJobToken.mint(addr1.address, mintAmount);
      expect(await yellowJobToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should allow owner to add trusted verifiers", async function () {
      await fraudDetection.addTrustedVerifier(addr1.address);
      expect(await fraudDetection.trustedVerifiers(addr1.address)).to.be.true;
    });
  });

  describe("Contract Constants", function () {
    it("Should have correct token constants", async function () {
      expect(await yellowJobToken.INITIAL_SUPPLY()).to.equal(ethers.parseEther("10000000"));
      expect(await yellowJobToken.MAX_SUPPLY()).to.equal(ethers.parseEther("100000000"));
      expect(await yellowJobToken.STAKING_REWARD_RATE()).to.equal(10);
    });

    it("Should have correct platform constants", async function () {
      expect(await web3JobPlatform.PLATFORM_FEE_PERCENTAGE()).to.equal(5);
      expect(await web3JobPlatform.MIN_STAKE_AMOUNT()).to.equal(ethers.parseEther("1000"));
      expect(await web3JobPlatform.MAX_STAKE_AMOUNT()).to.equal(ethers.parseEther("100000"));
      expect(await web3JobPlatform.STAKE_DURATION()).to.equal(30 * 24 * 60 * 60); // 30 days
    });

    it("Should have correct fraud detection constants", async function () {
      expect(await fraudDetection.MAX_APPLICATIONS_PER_DAY()).to.equal(10);
      expect(await fraudDetection.MAX_JOBS_PER_DAY()).to.equal(5);
      expect(await fraudDetection.MIN_REPUTATION_FOR_POSTING()).to.equal(50);
      expect(await fraudDetection.FRAUD_PENALTY_PERCENTAGE()).to.equal(25);
    });
  });

  describe("Access Control", function () {
    it("Should set correct owners", async function () {
      expect(await yellowJobToken.owner()).to.equal(owner.address);
      expect(await fraudDetection.owner()).to.equal(owner.address);
      expect(await web3JobPlatform.owner()).to.equal(owner.address);
    });

    it("Should allow only owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await expect(
        yellowJobToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow only owner to add trusted verifiers", async function () {
      await expect(
        fraudDetection.connect(addr1).addTrustedVerifier(addr2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Initial State", function () {
    it("Should have correct initial token supply", async function () {
      const totalSupply = await yellowJobToken.totalSupply();
      const ownerBalance = await yellowJobToken.balanceOf(owner.address);
      expect(totalSupply).to.equal(ethers.parseEther("10000000"));
      expect(ownerBalance).to.equal(ethers.parseEther("10000000"));
    });

    it("Should have zero total jobs initially", async function () {
      expect(await web3JobPlatform.getTotalJobs()).to.equal(0);
    });

    it("Should have zero total companies initially", async function () {
      expect(await web3JobPlatform.getTotalCompanies()).to.equal(0);
    });

    it("Should have zero total developers initially", async function () {
      expect(await web3JobPlatform.getTotalDevelopers()).to.equal(0);
    });
  });

  describe("Contract Pausability", function () {
    it("Should allow owner to pause contracts", async function () {
      await yellowJobToken.pause();
      expect(await yellowJobToken.paused()).to.be.true;

      await web3JobPlatform.pause();
      expect(await web3JobPlatform.paused()).to.be.true;
    });

    it("Should allow owner to unpause contracts", async function () {
      await yellowJobToken.pause();
      await yellowJobToken.unpause();
      expect(await yellowJobToken.paused()).to.be.false;

      await web3JobPlatform.pause();
      await web3JobPlatform.unpause();
      expect(await web3JobPlatform.paused()).to.be.false;
    });
  });
});
