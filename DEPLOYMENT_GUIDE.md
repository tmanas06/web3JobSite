# Web3 Job Platform - Deployment Guide

This guide will help you deploy the Web3 Job Platform smart contracts to various networks using Hardhat.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Git**
4. **MetaMask** or compatible wallet
5. **Test tokens** for the target network

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Required: Your private key (NEVER commit this)
PRIVATE_KEY=your_private_key_here

# Optional: API keys for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
INFURA_API_KEY=your_infura_api_key
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Run Tests

```bash
npm run test
```

### 5. Deploy to Local Network

Start a local Hardhat node:

```bash
npm run node
```

In another terminal, deploy to localhost:

```bash
npm run deploy:local
```

## Network Deployments

### Yellow Network (Primary)

#### Testnet Deployment

```bash
npm run deploy:testnet
```

#### Mainnet Deployment

```bash
npm run deploy:mainnet
```

### Other Networks

#### Sepolia Testnet

```bash
npm run deploy:sepolia
```

#### Polygon Mainnet

```bash
npm run deploy:polygon
```

## Contract Verification

After deployment, verify contracts on block explorers:

### Yellow Network

```bash
npm run verify:testnet
npm run verify:mainnet
```

### Other Networks

```bash
# Sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Polygon
npx hardhat verify --network polygon <CONTRACT_ADDRESS>
```

## Testing Deployments

Test your deployed contracts:

```bash
npm run test:deployment
```

## Production Deployment

### 1. Prepare Environment

- Set up production environment variables
- Ensure you have sufficient tokens for gas fees
- Verify all API keys are configured

### 2. Deploy Contracts

```bash
# Deploy to testnet first
npm run deploy:testnet

# Test thoroughly
npm run test:deployment

# Deploy to mainnet
npm run deploy:mainnet
```

### 3. Verify Contracts

```bash
npm run verify:mainnet
```

### 4. Update Frontend

Update your frontend configuration with the new contract addresses from the deployment output.

## GitHub Actions

The project includes automated deployment workflows:

### Automatic Deployments

- **develop branch** → Yellow Testnet
- **main branch** → Yellow Mainnet

### Manual Deployments

Use GitHub Actions workflow dispatch to deploy to specific networks:

1. Go to Actions tab
2. Select "Deploy Smart Contracts"
3. Click "Run workflow"
4. Choose target network

## Contract Addresses

Deployment information is saved in the `deployments/` directory:

- `deployments/localhost.json` - Local development
- `deployments/yellowTestnet.json` - Yellow Testnet
- `deployments/yellowMainnet.json` - Yellow Mainnet

## Troubleshooting

### Common Issues

1. **Insufficient Gas**: Increase gas limit in hardhat.config.js
2. **Network Connection**: Check RPC URLs and network configuration
3. **Private Key**: Ensure your private key is correctly set in .env
4. **Contract Size**: Large contracts may exceed size limits

### Debug Commands

```bash
# Check contract sizes
npm run size

# Run gas analysis
npm run gas

# Clean artifacts
npm run clean
```

## Security Considerations

1. **Never commit private keys** to version control
2. **Use environment variables** for sensitive data
3. **Test thoroughly** on testnets before mainnet
4. **Verify contracts** on block explorers
5. **Keep private keys secure** and use hardware wallets for production

## Network Configuration

### Yellow Network

- **Testnet RPC**: https://testnet-rpc.yellownetwork.org
- **Testnet Chain ID**: 1234
- **Mainnet RPC**: https://rpc.yellownetwork.org
- **Mainnet Chain ID**: 5678

### Adding Custom Networks

Add new networks to `hardhat.config.js`:

```javascript
networks: {
  customNetwork: {
    url: "https://your-rpc-url.com",
    chainId: 1234,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review GitHub Issues
3. Contact the development team

## Contract Architecture

The platform consists of three main contracts:

1. **YellowJobToken** - ERC20 token for staking and payments
2. **FraudDetection** - Anti-fraud mechanisms and reputation system
3. **Web3JobPlatform** - Main platform contract for job management

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Contracts compiled successfully
- [ ] Tests passing
- [ ] Deployed to testnet
- [ ] Tested on testnet
- [ ] Contracts verified
- [ ] Deployed to mainnet
- [ ] Mainnet contracts verified
- [ ] Frontend updated with new addresses
- [ ] Documentation updated
