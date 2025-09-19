# Production Setup Guide

This guide covers setting up the Web3 Job Platform for production deployment.

## Prerequisites

### Required Accounts & Services

1. **Wallet Setup**
   - MetaMask or compatible wallet
   - Private key for deployment (store securely)
   - Test tokens for gas fees

2. **API Keys**
   - Etherscan API key (for contract verification)
   - Infura API key (for RPC access)
   - CoinMarketCap API key (for gas reporting)

3. **GitHub Secrets**
   - `PRIVATE_KEY` - Your deployment private key
   - `INFURA_API_KEY` - Infura API key
   - `ETHERSCAN_API_KEY` - Etherscan API key
   - `POLYGONSCAN_API_KEY` - PolygonScan API key
   - `COINMARKETCAP_API_KEY` - CoinMarketCap API key

## Environment Configuration

### 1. Create Environment File

```bash
cp env.example .env
```

### 2. Configure Environment Variables

```env
# Required
PRIVATE_KEY=your_private_key_here

# API Keys
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key

# Network Configuration
NETWORK_NAME=yellowMainnet
CHAIN_ID=5678
```

## Deployment Process

### 1. Local Testing

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Start local node
npm run node

# Deploy to localhost
npm run deploy:local

# Test deployment
npm run test:deployment
```

### 2. Testnet Deployment

```bash
# Deploy to Yellow Testnet
npm run deploy:testnet

# Verify contracts
npm run verify:testnet

# Test deployment
npm run test:deployment
```

### 3. Mainnet Deployment

```bash
# Deploy to Yellow Mainnet
npm run deploy:mainnet

# Verify contracts
npm run verify:mainnet

# Test deployment
npm run test:deployment
```

## GitHub Actions Setup

### 1. Repository Secrets

Add the following secrets to your GitHub repository:

- `PRIVATE_KEY` - Your deployment private key
- `INFURA_API_KEY` - Infura API key
- `ETHERSCAN_API_KEY` - Etherscan API key
- `POLYGONSCAN_API_KEY` - PolygonScan API key
- `COINMARKETCAP_API_KEY` - CoinMarketCap API key

### 2. Environment Protection

Set up environment protection rules:

- **testnet** - Requires review for testnet deployments
- **mainnet** - Requires review for mainnet deployments
- **production** - Requires review for production releases

### 3. Workflow Triggers

- **Automatic**: Push to `main` branch triggers mainnet deployment
- **Automatic**: Push to `develop` branch triggers testnet deployment
- **Manual**: Use workflow dispatch for specific network deployments

## Contract Verification

### Yellow Network

```bash
# Testnet
npm run verify:testnet

# Mainnet
npm run verify:mainnet
```

### Other Networks

```bash
# Sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Polygon
npx hardhat verify --network polygon <CONTRACT_ADDRESS>
```

## Frontend Integration

### 1. Update Contract Addresses

Update your frontend configuration with deployed contract addresses:

```javascript
// src/lib/contracts.js
export const CONTRACTS = {
  localhost: {
    YellowJobToken: "0x...",
    FraudDetection: "0x...",
    Web3JobPlatform: "0x...",
  },
  yellowTestnet: {
    YellowJobToken: "0x...",
    FraudDetection: "0x...",
    Web3JobPlatform: "0x...",
  },
  yellowMainnet: {
    YellowJobToken: "0x...",
    FraudDetection: "0x...",
    Web3JobPlatform: "0x...",
  },
};
```

### 2. Network Configuration

Update your wallet configuration:

```javascript
// src/lib/wagmi-config.ts
export const config = getDefaultConfig({
  appName: "Web3 Job Platform",
  projectId: "your-project-id",
  chains: [
    yellowTestnet,
    yellowMainnet,
    // ... other chains
  ],
});
```

## Monitoring & Maintenance

### 1. Contract Monitoring

- Monitor contract events and transactions
- Set up alerts for critical functions
- Track gas usage and costs

### 2. Security Monitoring

- Monitor for suspicious activity
- Track fraud reports and resolutions
- Review access controls regularly

### 3. Performance Monitoring

- Monitor transaction success rates
- Track gas costs and optimization opportunities
- Monitor network congestion

## Backup & Recovery

### 1. Contract Addresses

Store contract addresses securely:
- GitHub repository (public)
- Secure document storage
- Multiple team members

### 2. Private Keys

- Use hardware wallets for production
- Store private keys securely
- Implement multi-signature where possible

### 3. Deployment Records

- Keep detailed deployment logs
- Document all configuration changes
- Maintain rollback procedures

## Security Best Practices

### 1. Access Control

- Use multi-signature wallets for critical functions
- Implement role-based access control
- Regular access reviews

### 2. Code Security

- Regular security audits
- Automated vulnerability scanning
- Code review processes

### 3. Operational Security

- Secure private key storage
- Regular security training
- Incident response procedures

## Troubleshooting

### Common Issues

1. **Deployment Failures**
   - Check gas limits
   - Verify network connectivity
   - Ensure sufficient balance

2. **Verification Failures**
   - Check constructor arguments
   - Verify contract source code
   - Ensure proper compiler version

3. **Frontend Integration Issues**
   - Verify contract addresses
   - Check network configuration
   - Ensure proper ABI usage

### Support

- Check GitHub Issues
- Review documentation
- Contact development team

## Post-Deployment Checklist

- [ ] Contracts deployed successfully
- [ ] Contracts verified on block explorer
- [ ] Frontend updated with new addresses
- [ ] Tests passing on deployed contracts
- [ ] Monitoring set up
- [ ] Documentation updated
- [ ] Team notified of deployment
- [ ] Backup procedures in place
- [ ] Security measures implemented
- [ ] Performance monitoring active

## Rollback Procedures

### Emergency Rollback

1. Pause contracts if possible
2. Deploy previous version
3. Update frontend configuration
4. Notify users of changes
5. Investigate root cause

### Planned Rollback

1. Schedule maintenance window
2. Deploy previous version
3. Update frontend configuration
4. Test functionality
5. Notify users of changes

## Maintenance Schedule

### Daily
- Monitor contract activity
- Check for security alerts
- Review transaction logs

### Weekly
- Review performance metrics
- Check for failed transactions
- Update documentation

### Monthly
- Security audit review
- Performance optimization
- Backup verification

### Quarterly
- Full security audit
- Contract upgrade planning
- Disaster recovery testing
