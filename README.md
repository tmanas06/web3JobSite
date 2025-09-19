# Web3 Job Platform

A decentralized job platform built on Yellow Network with advanced fraud detection and reputation mechanisms.

## Features

- **Decentralized Job Posting**: Companies can post jobs with token staking requirements
- **Developer Profiles**: Comprehensive developer profiles with skill verification
- **Anti-Fraud System**: Advanced fraud detection and prevention mechanisms
- **Reputation System**: Dynamic reputation scoring for both companies and developers
- **Token Economics**: YJT token for staking, payments, and rewards
- **Multi-Network Support**: Deployable on Yellow Network, Ethereum, and Polygon

## Smart Contracts

### YellowJobToken (YJT)
- ERC20 token with staking rewards
- Platform fee mechanism
- Mintable by owner (up to max supply)
- Pausable for emergency situations

### FraudDetection
- Advanced fraud detection algorithms
- Reputation scoring system
- Trusted verifier management
- Blacklist functionality

### Web3JobPlatform
- Job posting and application system
- Company and developer registration
- Staking mechanism for job posting
- Skill verification system
- Hiring and completion tracking

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or compatible wallet
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd web3JobSite

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Configure environment variables
# Edit .env with your settings
```

### Local Development

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Start local Hardhat node
npm run node

# Deploy to localhost (in another terminal)
npm run deploy:local

# Setup MetaMask with faucet account
npm run setup:faucet

# Test deployment
npm run test:deployment
```

### MetaMask Setup

The platform uses **TestnetToken (TEST)** for staking, which can be obtained from Ethereum testnet faucets. Follow these steps:

1. **Import Faucet Account**: Use the private key from the setup output
2. **Add Local Network**: Chain ID 31337, RPC URL http://127.0.0.1:8545
3. **Add TestnetToken**: Use the contract address from deployment
4. **Get Testnet ETH**: Use Ethereum testnet faucets for gas fees

See `METAMASK_SETUP_GUIDE.md` for detailed instructions.

### Deployment

```bash
# Deploy to testnet
npm run deploy:testnet

# Deploy to mainnet
npm run deploy:mainnet

# Verify contracts
npm run verify:testnet
npm run verify:mainnet
```

## Scripts

### Development
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Smart Contracts
- `npm run compile` - Compile contracts
- `npm run test` - Run tests
- `npm run test:coverage` - Run test coverage
- `npm run test:deployment` - Test deployed contracts

### Deployment
- `npm run deploy:local` - Deploy to localhost
- `npm run deploy:testnet` - Deploy to Yellow Testnet
- `npm run deploy:mainnet` - Deploy to Yellow Mainnet
- `npm run deploy:sepolia` - Deploy to Sepolia
- `npm run deploy:polygon` - Deploy to Polygon

### Verification
- `npm run verify:testnet` - Verify contracts on testnet
- `npm run verify:mainnet` - Verify contracts on mainnet

### Utilities
- `npm run node` - Start local Hardhat node
- `npm run clean` - Clean artifacts
- `npm run size` - Check contract sizes
- `npm run gas` - Run gas analysis

## Network Configuration

### Yellow Network (Primary)
- **Testnet**: https://testnet-rpc.yellownetwork.org (Chain ID: 1234)
- **Mainnet**: https://rpc.yellownetwork.org (Chain ID: 5678)

### Other Supported Networks
- **Ethereum Sepolia**: Testnet for Ethereum
- **Polygon**: Layer 2 scaling solution

## Contract Addresses

Deployment information is stored in the `deployments/` directory:

- `deployments/localhost.json` - Local development
- `deployments/yellowTestnet.json` - Yellow Testnet
- `deployments/yellowMainnet.json` - Yellow Mainnet

## Architecture

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Wagmi** - Ethereum integration
- **RainbowKit** - Wallet connection

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **OpenZeppelin** - Security libraries
- **Hardhat** - Development framework

### Testing
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Hardhat** - Testing utilities

## Security Features

- **Reentrancy Protection** - Prevents reentrancy attacks
- **Access Control** - Role-based permissions
- **Pausable Contracts** - Emergency stop functionality
- **Fraud Detection** - Advanced anti-fraud mechanisms
- **Reputation System** - Dynamic scoring system

## Development Workflow

### 1. Local Development
```bash
# Start local node
npm run node

# Deploy contracts
npm run deploy:local

# Start frontend
npm run dev
```

### 2. Testing
```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Test deployed contracts
npm run test:deployment
```

### 3. Deployment
```bash
# Deploy to testnet
npm run deploy:testnet

# Verify contracts
npm run verify:testnet

# Deploy to mainnet
npm run deploy:mainnet
```

## GitHub Actions

The project includes automated workflows:

- **CI/CD** - Continuous integration and deployment
- **Testing** - Automated testing on multiple Node.js versions
- **Security** - Security audits and vulnerability scanning
- **Contract Analysis** - Gas and size analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- **Documentation**: Check the docs/ directory
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Contact**: [Your contact information]

## Roadmap

- [ ] Multi-language support
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Integration with other DeFi protocols
- [ ] Cross-chain functionality
- [ ] AI-powered matching

## Changelog

### v1.0.0
- Initial release
- Core job platform functionality
- Fraud detection system
- Reputation scoring
- Multi-network support

## Acknowledgments

- OpenZeppelin for security libraries
- Hardhat team for development tools
- Yellow Network for blockchain infrastructure
- Community contributors

---

**⚠️ Security Notice**: This is experimental software. Use at your own risk. Always audit smart contracts before using them with real funds.