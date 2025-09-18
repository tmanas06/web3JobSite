const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment of Web3 Job Platform on Yellow Network...");

  // Get the contract factories
  const YellowJobToken = await hre.ethers.getContractFactory("YellowJobToken");
  const FraudDetection = await hre.ethers.getContractFactory("FraudDetection");
  const Web3JobPlatform = await hre.ethers.getContractFactory("Web3JobPlatform");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy YellowJobToken first
  console.log("\n📄 Deploying YellowJobToken...");
  const yellowJobToken = await YellowJobToken.deploy();
  await yellowJobToken.waitForDeployment();
  const tokenAddress = await yellowJobToken.getAddress();
  console.log("✅ YellowJobToken deployed to:", tokenAddress);

  // Deploy FraudDetection contract
  console.log("\n🛡️ Deploying FraudDetection...");
  const fraudDetection = await FraudDetection.deploy();
  await fraudDetection.waitForDeployment();
  const fraudDetectionAddress = await fraudDetection.getAddress();
  console.log("✅ FraudDetection deployed to:", fraudDetectionAddress);

  // Deploy Web3JobPlatform with token address
  console.log("\n💼 Deploying Web3JobPlatform...");
  const web3JobPlatform = await Web3JobPlatform.deploy(tokenAddress);
  await web3JobPlatform.waitForDeployment();
  const platformAddress = await web3JobPlatform.getAddress();
  console.log("✅ Web3JobPlatform deployed to:", platformAddress);

  // Set up initial configuration
  console.log("\n⚙️ Setting up initial configuration...");
  
  // Add deployer as trusted verifier in fraud detection
  await fraudDetection.addTrustedVerifier(deployer.address);
  console.log("✅ Added deployer as trusted verifier");

  // Mint some initial tokens for testing
  const initialMintAmount = hre.ethers.parseEther("1000000"); // 1M tokens
  await yellowJobToken.mint(deployer.address, initialMintAmount);
  console.log("✅ Minted 1M tokens for testing");

  // Display deployment summary
  console.log("\n🎉 Deployment Summary:");
  console.log("=====================================");
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", await hre.ethers.provider.getNetwork().then(n => n.chainId));
  console.log("Deployer:", deployer.address);
  console.log("");
  console.log("Contract Addresses:");
  console.log("YellowJobToken:", tokenAddress);
  console.log("FraudDetection:", fraudDetectionAddress);
  console.log("Web3JobPlatform:", platformAddress);
  console.log("");
  console.log("🔗 Add these addresses to your frontend configuration");

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
  const deploymentInfo = {
    network: hre.network.name,
    chainId: await hre.network.provider.getNetwork().then(n => n.chainId.toString()),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      YellowJobToken: tokenAddress,
      FraudDetection: fraudDetectionAddress,
      Web3JobPlatform: platformAddress,
    },
    abis: {
      // ABI paths will be added here
      YellowJobToken: "./artifacts/contracts/YellowJobToken.sol/YellowJobToken.json",
      FraudDetection: "./artifacts/contracts/FraudDetection.sol/FraudDetection.json",
      Web3JobPlatform: "./artifacts/contracts/Web3JobPlatform.sol/Web3JobPlatform.json",
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
