const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3JobPlatform", function () {
  let yellowJobToken;
  let fraudDetection;
  let web3JobPlatform;
  let owner;
  let company;
  let developer;
  let verifier;

  beforeEach(async function () {
    [owner, company, developer, verifier] = await ethers.getSigners();

    // Deploy YellowJobToken
    const YellowJobToken = await ethers.getContractFactory("YellowJobToken");
    yellowJobToken = await YellowJobToken.deploy();
    await yellowJobToken.waitForDeployment();

    // Deploy FraudDetection
    const FraudDetection = await ethers.getContractFactory("FraudDetection");
    fraudDetection = await FraudDetection.deploy();
    await fraudDetection.waitForDeployment();

    // Deploy Web3JobPlatform
    const Web3JobPlatform = await ethers.getContractFactory("Web3JobPlatform");
    web3JobPlatform = await Web3JobPlatform.deploy(await yellowJobToken.getAddress());
    await web3JobPlatform.waitForDeployment();

    // Mint tokens for testing
    const mintAmount = ethers.parseEther("1000000");
    await yellowJobToken.mint(owner.address, mintAmount);

    // Transfer tokens to company and developer
    await yellowJobToken.transfer(company.address, ethers.parseEther("10000"));
    await yellowJobToken.transfer(developer.address, ethers.parseEther("10000"));

    // Add verifier as trusted
    await fraudDetection.addTrustedVerifier(verifier.address);
    await web3JobPlatform.addVerifiedSkillVerifier(verifier.address);
  });

  describe("Company Registration", function () {
    it("Should register a new company", async function () {
      const companyData = {
        name: "Test Company",
        description: "A test company",
        website: "https://testcompany.com",
        logoUrl: "https://testcompany.com/logo.png",
        verifiableSkills: ["Solidity", "React", "Node.js"]
      };

      await web3JobPlatform.connect(company).registerCompany(
        companyData.name,
        companyData.description,
        companyData.website,
        companyData.logoUrl,
        companyData.verifiableSkills
      );

      const companyId = await web3JobPlatform.companyAddressToId(company.address);
      expect(companyId).to.equal(1);

      const registeredCompany = await web3JobPlatform.companies(companyId);
      expect(registeredCompany.name).to.equal(companyData.name);
      expect(registeredCompany.reputation).to.equal(100);
      expect(registeredCompany.isActive).to.be.true;
    });

    it("Should not allow duplicate company registration", async function () {
      await web3JobPlatform.connect(company).registerCompany(
        "Test Company",
        "A test company",
        "https://testcompany.com",
        "https://testcompany.com/logo.png",
        ["Solidity"]
      );

      await expect(
        web3JobPlatform.connect(company).registerCompany(
          "Another Company",
          "Another test company",
          "https://anothercompany.com",
          "https://anothercompany.com/logo.png",
          ["React"]
        )
      ).to.be.revertedWith("Company already registered");
    });
  });

  describe("Developer Registration", function () {
    it("Should register a new developer", async function () {
      const developerData = {
        name: "Test Developer",
        email: "test@developer.com",
        github: "https://github.com/testdeveloper",
        portfolio: "https://testdeveloper.com",
        skills: ["Solidity", "React", "JavaScript"],
        skillScores: [90, 85, 80]
      };

      await web3JobPlatform.connect(developer).registerDeveloper(
        developerData.name,
        developerData.email,
        developerData.github,
        developerData.portfolio,
        developerData.skills,
        developerData.skillScores
      );

      const developerId = await web3JobPlatform.developerAddressToId(developer.address);
      expect(developerId).to.equal(1);

      const registeredDeveloper = await web3JobPlatform.developers(developerId);
      expect(registeredDeveloper.name).to.equal(developerData.name);
      expect(registeredDeveloper.reputation).to.equal(100);
      expect(registeredDeveloper.isActive).to.be.true;
    });

    it("Should not allow skills and scores length mismatch", async function () {
      await expect(
        web3JobPlatform.connect(developer).registerDeveloper(
          "Test Developer",
          "test@developer.com",
          "https://github.com/testdeveloper",
          "https://testdeveloper.com",
          ["Solidity", "React"],
          [90] // Only one score for two skills
        )
      ).to.be.revertedWith("Skills and scores length mismatch");
    });
  });

  describe("Staking Mechanism", function () {
    beforeEach(async function () {
      // Register company first
      await web3JobPlatform.connect(company).registerCompany(
        "Test Company",
        "A test company",
        "https://testcompany.com",
        "https://testcompany.com/logo.png",
        ["Solidity"]
      );
    });

    it("Should allow company to stake tokens", async function () {
      const stakeAmount = ethers.parseEther("1000");

      // Approve tokens for staking
      await yellowJobToken.connect(company).approve(await web3JobPlatform.getAddress(), stakeAmount);

      // Stake tokens
      await web3JobPlatform.connect(company).stakeTokens(stakeAmount);

      const companyId = await web3JobPlatform.companyAddressToId(company.address);
      const companyData = await web3JobPlatform.companies(companyId);
      expect(companyData.stakedAmount).to.equal(stakeAmount);
      expect(companyData.stakeTimestamp).to.be.greaterThan(0);
    });

    it("Should not allow staking below minimum amount", async function () {
      const stakeAmount = ethers.parseEther("500"); // Below minimum

      await yellowJobToken.connect(company).approve(await web3JobPlatform.getAddress(), stakeAmount);

      await expect(
        web3JobPlatform.connect(company).stakeTokens(stakeAmount)
      ).to.be.revertedWith("Stake amount too low");
    });

    it("Should not allow withdrawing stake before maturity", async function () {
      const stakeAmount = ethers.parseEther("1000");

      // Stake tokens
      await yellowJobToken.connect(company).approve(await web3JobPlatform.getAddress(), stakeAmount);
      await web3JobPlatform.connect(company).stakeTokens(stakeAmount);

      // Try to withdraw immediately
      await expect(
        web3JobPlatform.connect(company).withdrawStake(stakeAmount)
      ).to.be.revertedWith("Stake not matured");
    });
  });

  describe("Job Posting", function () {
    beforeEach(async function () {
      // Register company and stake tokens
      await web3JobPlatform.connect(company).registerCompany(
        "Test Company",
        "A test company",
        "https://testcompany.com",
        "https://testcompany.com/logo.png",
        ["Solidity"]
      );

      const stakeAmount = ethers.parseEther("1000");
      await yellowJobToken.connect(company).approve(await web3JobPlatform.getAddress(), stakeAmount);
      await web3JobPlatform.connect(company).stakeTokens(stakeAmount);
    });

    it("Should allow company to post a job", async function () {
      const jobData = {
        title: "Senior Solidity Developer",
        description: "Looking for an experienced Solidity developer",
        requiredSkills: ["Solidity", "React"],
        skillWeights: [80, 60],
        salaryMin: ethers.parseEther("1000"),
        salaryMax: ethers.parseEther("2000"),
        deadline: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
        jobType: 0, // FullTime
        maxApplications: 10
      };

      await web3JobPlatform.connect(company).postJob(
        jobData.title,
        jobData.description,
        jobData.requiredSkills,
        jobData.skillWeights,
        jobData.salaryMin,
        jobData.salaryMax,
        jobData.deadline,
        jobData.jobType,
        jobData.maxApplications
      );

      const job = await web3JobPlatform.jobs(1);
      expect(job.title).to.equal(jobData.title);
      expect(job.status).to.equal(0); // Active
      expect(job.maxApplications).to.equal(jobData.maxApplications);
    });

    it("Should not allow job posting without sufficient stake", async function () {
      // Create another company without staking
      const [anotherCompany] = await ethers.getSigners();
      await web3JobPlatform.connect(anotherCompany).registerCompany(
        "Another Company",
        "Another test company",
        "https://anothercompany.com",
        "https://anothercompany.com/logo.png",
        ["Solidity"]
      );

      await expect(
        web3JobPlatform.connect(anotherCompany).postJob(
          "Test Job",
          "Test description",
          ["Solidity"],
          [80],
          ethers.parseEther("1000"),
          ethers.parseEther("2000"),
          Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
          0,
          10
        )
      ).to.be.revertedWith("Insufficient stake");
    });
  });

  describe("Job Applications", function () {
    beforeEach(async function () {
      // Register company, stake, and post job
      await web3JobPlatform.connect(company).registerCompany(
        "Test Company",
        "A test company",
        "https://testcompany.com",
        "https://testcompany.com/logo.png",
        ["Solidity"]
      );

      const stakeAmount = ethers.parseEther("1000");
      await yellowJobToken.connect(company).approve(await web3JobPlatform.getAddress(), stakeAmount);
      await web3JobPlatform.connect(company).stakeTokens(stakeAmount);

      await web3JobPlatform.connect(company).postJob(
        "Senior Solidity Developer",
        "Looking for an experienced Solidity developer",
        ["Solidity", "React"],
        [80, 60],
        ethers.parseEther("1000"),
        ethers.parseEther("2000"),
        Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        0,
        10
      );

      // Register developer
      await web3JobPlatform.connect(developer).registerDeveloper(
        "Test Developer",
        "test@developer.com",
        "https://github.com/testdeveloper",
        "https://testdeveloper.com",
        ["Solidity", "React"],
        [90, 85]
      );
    });

    it("Should allow developer to apply for a job", async function () {
      await web3JobPlatform.connect(developer).applyForJob(
        1, // jobId
        "I am interested in this position",
        [90, 85], // skill scores
        [1, 2, 3] // portfolio links
      );

      const application = await web3JobPlatform.applications(1);
      expect(application.jobId).to.equal(1);
      expect(application.developerId).to.equal(1);
      expect(application.status).to.equal(0); // Pending

      const job = await web3JobPlatform.jobs(1);
      expect(job.applicationCount).to.equal(1);
    });

    it("Should not allow duplicate applications", async function () {
      await web3JobPlatform.connect(developer).applyForJob(
        1,
        "First application",
        [90, 85],
        [1, 2, 3]
      );

      await expect(
        web3JobPlatform.connect(developer).applyForJob(
          1,
          "Second application",
          [90, 85],
          [1, 2, 3]
        )
      ).to.be.revertedWith("Already applied");
    });
  });

  describe("Skill Verification", function () {
    beforeEach(async function () {
      // Register developer
      await web3JobPlatform.connect(developer).registerDeveloper(
        "Test Developer",
        "test@developer.com",
        "https://github.com/testdeveloper",
        "https://testdeveloper.com",
        ["Solidity", "React"],
        [90, 85]
      );
    });

    it("Should allow verified verifier to verify skills", async function () {
      const developerId = await web3JobPlatform.developerAddressToId(developer.address);
      const skill = "Advanced Solidity";
      const score = 95;
      const evidence = "https://github.com/testdeveloper/solidity-projects";

      // Create signature
      const messageHash = ethers.keccak256(
        ethers.solidityPacked(
          ["uint256", "string", "uint256", "string"],
          [developerId, skill, score, evidence]
        )
      );
      const signature = await verifier.signMessage(ethers.getBytes(messageHash));

      await web3JobPlatform.connect(verifier).verifySkill(
        developerId,
        skill,
        score,
        evidence,
        signature
      );

      const verificationId = ethers.keccak256(
        ethers.solidityPacked(
          ["uint256", "string", "address"],
          [developerId, skill, verifier.address]
        )
      );

      const verification = await web3JobPlatform.skillVerifications(verificationId);
      expect(verification.isValid).to.be.true;
      expect(verification.score).to.equal(score);
    });

    it("Should not allow non-verified verifier to verify skills", async function () {
      const [nonVerifier] = await ethers.getSigners();
      
      await expect(
        web3JobPlatform.connect(nonVerifier).verifySkill(
          1,
          "Solidity",
          90,
          "https://evidence.com",
          "0x"
        )
      ).to.be.revertedWith("Not a verified skill verifier");
    });
  });

  describe("Fraud Detection", function () {
    beforeEach(async function () {
      // Register developer
      await web3JobPlatform.connect(developer).registerDeveloper(
        "Test Developer",
        "test@developer.com",
        "https://github.com/testdeveloper",
        "https://testdeveloper.com",
        ["Solidity", "React"],
        [90, 85]
      );
    });

    it("Should allow reporting fraud", async function () {
      const reason = "Fake portfolio";
      const severity = 3;
      const evidence = "https://evidence.com/fake-portfolio";

      // Create signature
      const messageHash = ethers.keccak256(
        ethers.solidityPacked(
          ["address", "string", "uint256", "string"],
          [developer.address, reason, severity, evidence]
        )
      );
      const signature = await owner.signMessage(ethers.getBytes(messageHash));

      await fraudDetection.connect(owner).reportFraud(
        developer.address,
        reason,
        severity,
        evidence,
        signature
      );

      const fraudReport = await fraudDetection.fraudReports(1);
      expect(fraudReport.reporter).to.equal(owner.address);
      expect(fraudReport.reportedUser).to.equal(developer.address);
      expect(fraudReport.severity).to.equal(severity);
    });

    it("Should allow resolving fraud reports", async function () {
      // First report fraud
      const reason = "Fake portfolio";
      const severity = 3;
      const evidence = "https://evidence.com/fake-portfolio";

      const messageHash = ethers.keccak256(
        ethers.solidityPacked(
          ["address", "string", "uint256", "string"],
          [developer.address, reason, severity, evidence]
        )
      );
      const signature = await owner.signMessage(ethers.getBytes(messageHash));

      await fraudDetection.connect(owner).reportFraud(
        developer.address,
        reason,
        severity,
        evidence,
        signature
      );

      // Resolve the fraud report
      await fraudDetection.connect(verifier).resolveFraudReport(1, true);

      const fraudReport = await fraudDetection.fraudReports(1);
      expect(fraudReport.isResolved).to.be.true;
      expect(fraudReport.isValid).to.be.true;
      expect(fraudReport.resolvedBy).to.equal(verifier.address);
    });
  });
});
