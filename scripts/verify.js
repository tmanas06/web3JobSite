const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔍 Starting contract verification...");

  // Read deployment info
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const networkName = hre.network.name;
  const deploymentFile = path.join(deploymentsDir, `${networkName}.json`);

  if (!fs.existsSync(deploymentFile)) {
    console.error(`❌ Deployment file not found: ${deploymentFile}`);
    console.log("Please run deployment first with: npm run deploy:" + networkName);
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contracts = deploymentInfo.contracts;

  console.log(`\n📋 Verifying contracts on ${networkName}...`);
  console.log("=====================================");

  // Verify YellowJobToken
  if (contracts.YellowJobToken) {
    console.log("\n🪙 Verifying YellowJobToken...");
    try {
      await hre.run("verify:verify", {
        address: contracts.YellowJobToken,
        constructorArguments: [],
      });
      console.log("✅ YellowJobToken verified successfully");
    } catch (error) {
      console.log("❌ YellowJobToken verification failed:", error.message);
    }
  }

  // Verify FraudDetection
  if (contracts.FraudDetection) {
    console.log("\n🛡️ Verifying FraudDetection...");
    try {
      await hre.run("verify:verify", {
        address: contracts.FraudDetection,
        constructorArguments: [],
      });
      console.log("✅ FraudDetection verified successfully");
    } catch (error) {
      console.log("❌ FraudDetection verification failed:", error.message);
    }
  }

  // Verify Web3JobPlatform
  if (contracts.Web3JobPlatform) {
    console.log("\n💼 Verifying Web3JobPlatform...");
    try {
      await hre.run("verify:verify", {
        address: contracts.Web3JobPlatform,
        constructorArguments: [contracts.YellowJobToken],
      });
      console.log("✅ Web3JobPlatform verified successfully");
    } catch (error) {
      console.log("❌ Web3JobPlatform verification failed:", error.message);
    }
  }

  console.log("\n🎉 Verification process completed!");
  console.log("\n📊 Contract Addresses:");
  console.log("YellowJobToken:", contracts.YellowJobToken);
  console.log("FraudDetection:", contracts.FraudDetection);
  console.log("Web3JobPlatform:", contracts.Web3JobPlatform);

  // Update deployment info with verification status
  deploymentInfo.verified = true;
  deploymentInfo.verifiedAt = new Date().toISOString();
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📁 Updated deployment info saved to: ${deploymentFile}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  });
