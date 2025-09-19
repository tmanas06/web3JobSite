const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment of Web3 Job Platform...");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${await hre.ethers.provider.getNetwork().then(n => n.chainId)}`);

  // Get the contract factories
  const TestnetToken = await hre.ethers.getContractFactory("TestnetToken");
  const YellowJobToken = await hre.ethers.getContractFactory("YellowJobToken");
  const FraudDetection = await hre.ethers.getContractFactory("FraudDetection");
  const Web3JobPlatform = await hre.ethers.getContractFactory("Web3JobPlatform");
  const UserProfile = await hre.ethers.getContractFactory("UserProfile");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Check if account has sufficient balance
  if (balance < hre.ethers.parseEther("0.01")) {
    console.warn("⚠️  Warning: Low account balance. Deployment may fail.");
  }

  let testnetToken, yellowJobToken, fraudDetection, web3JobPlatform, userProfile;
  let testnetTokenAddress, tokenAddress, fraudDetectionAddress, platformAddress, userProfileAddress;

  // Deploy TestnetToken first (for staking)
  console.log("\n🪙 Deploying TestnetToken...");
  try {
    testnetToken = await TestnetToken.deploy();
    await testnetToken.waitForDeployment();
    testnetTokenAddress = await testnetToken.getAddress();
    console.log("✅ TestnetToken deployed to:", testnetTokenAddress);
  } catch (error) {
    console.error("❌ TestnetToken deployment failed:", error.message);
    throw error;
  }

  // Deploy YellowJobToken
  console.log("\n📄 Deploying YellowJobToken...");
  try {
    yellowJobToken = await YellowJobToken.deploy();
    await yellowJobToken.waitForDeployment();
    tokenAddress = await yellowJobToken.getAddress();
    console.log("✅ YellowJobToken deployed to:", tokenAddress);
  } catch (error) {
    console.error("❌ YellowJobToken deployment failed:", error.message);
    throw error;
  }

  // Deploy FraudDetection contract
  console.log("\n🛡️ Deploying FraudDetection...");
  try {
    fraudDetection = await FraudDetection.deploy();
    await fraudDetection.waitForDeployment();
    fraudDetectionAddress = await fraudDetection.getAddress();
    console.log("✅ FraudDetection deployed to:", fraudDetectionAddress);
  } catch (error) {
    console.error("❌ FraudDetection deployment failed:", error.message);
    throw error;
  }

  // Deploy Web3JobPlatform with testnet token address (for staking)
  console.log("\n💼 Deploying Web3JobPlatform...");
  try {
    web3JobPlatform = await Web3JobPlatform.deploy(testnetTokenAddress);
    await web3JobPlatform.waitForDeployment();
    platformAddress = await web3JobPlatform.getAddress();
    console.log("✅ Web3JobPlatform deployed to:", platformAddress);
  } catch (error) {
    console.error("❌ Web3JobPlatform deployment failed:", error.message);
    throw error;
  }

  // Deploy UserProfile contract
  console.log("\n👤 Deploying UserProfile...");
  try {
    userProfile = await UserProfile.deploy();
    await userProfile.waitForDeployment();
    userProfileAddress = await userProfile.getAddress();
    console.log("✅ UserProfile deployed to:", userProfileAddress);
  } catch (error) {
    console.error("❌ UserProfile deployment failed:", error.message);
    throw error;
  }

  // Set up initial configuration
  console.log("\n⚙️ Setting up initial configuration...");
  
  try {
    // Add deployer as trusted verifier in fraud detection
    await fraudDetection.addTrustedVerifier(deployer.address);
    console.log("✅ Added deployer as trusted verifier");

    // Mint some initial YJT tokens for testing
    const initialMintAmount = hre.ethers.parseEther("1000000"); // 1M tokens
    await yellowJobToken.mint(deployer.address, initialMintAmount);
    console.log("✅ Minted 1M YJT tokens for testing");

    // Distribute testnet tokens to deployer for staking
    const testnetTokenAmount = hre.ethers.parseEther("100000"); // 100k tokens
    await testnetToken.mint(deployer.address, testnetTokenAmount);
    console.log("✅ Minted 100k TEST tokens for staking");
  } catch (error) {
    console.error("❌ Initial configuration failed:", error.message);
    throw error;
  }

  // Display deployment summary
  console.log("\n🎉 Deployment Summary:");
  console.log("=====================================");
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", await hre.ethers.provider.getNetwork().then(n => n.chainId));
  console.log("Deployer:", deployer.address);
  console.log("");
  console.log("Contract Addresses:");
  console.log("TestnetToken (for staking):", testnetTokenAddress);
  console.log("YellowJobToken:", tokenAddress);
  console.log("FraudDetection:", fraudDetectionAddress);
  console.log("Web3JobPlatform:", platformAddress);
  console.log("UserProfile:", userProfileAddress);
  console.log("");
  console.log("🔗 Add these addresses to your frontend configuration");
  console.log("💡 Use TestnetToken for staking - it can be obtained from Ethereum testnet faucets");

  // Verify contracts if on a live network
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 Verifying contracts on Etherscan...");
    
    try {
      await hre.run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [],
      });
      console.log("✅ YellowJobToken verified");
    } catch (error) {
      console.log("❌ YellowJobToken verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: fraudDetectionAddress,
        constructorArguments: [],
      });
      console.log("✅ FraudDetection verified");
    } catch (error) {
      console.log("❌ FraudDetection verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: platformAddress,
        constructorArguments: [tokenAddress],
      });
      console.log("✅ Web3JobPlatform verified");
    } catch (error) {
      console.log("❌ Web3JobPlatform verification failed:", error.message);
    }
  }

  // Save deployment info to file
  const networkInfo = await hre.ethers.provider.getNetwork();
  const deploymentInfo = {
    network: hre.network.name,
    chainId: networkInfo.chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      TestnetToken: testnetTokenAddress,
      YellowJobToken: tokenAddress,
      FraudDetection: fraudDetectionAddress,
      Web3JobPlatform: platformAddress,
      UserProfile: userProfileAddress,
    },
    abis: {
      // ABI paths will be added here
      TestnetToken: "./artifacts/contracts/TestnetToken.sol/TestnetToken.json",
      YellowJobToken: "./artifacts/contracts/YellowJobToken.sol/YellowJobToken.json",
      FraudDetection: "./artifacts/contracts/FraudDetection.sol/FraudDetection.json",
      Web3JobPlatform: "./artifacts/contracts/Web3JobPlatform.sol/Web3JobPlatform.json",
      UserProfile: "./artifacts/contracts/UserProfile.sol/UserProfile.json",
    }
  };

  const fs = require("fs");
  const path = require("path");
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `${hre.network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📁 Deployment info saved to: ${deploymentFile}`);

  console.log("\n🎯 Next Steps:");
  console.log("1. Update your frontend with the contract addresses");
  console.log("2. Configure your wallet to connect to Yellow Network");
  console.log("3. Test the platform functionality");
  console.log("4. Deploy to mainnet when ready");
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
