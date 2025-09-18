# Web3Job Network - Decentralized Job Platform

A comprehensive Web3 job platform built on **Yellow Network** with advanced fraud prevention mechanisms, blockchain-verified credentials, and staking-based hiring system.

## 🚀 Features

### Core Functionality
- **Company Registration & Job Posting**: Companies can register, stake tokens, and post verified job listings
- **Developer Registration & Applications**: Developers can register, showcase skills, and apply for jobs
- **Blockchain-Verified Reputation**: On-chain reputation system with skill endorsements
- **Fraud Prevention**: Advanced fraud detection and reporting system
- **Staking Mechanism**: Anti-fraud staking system for companies

### Advanced Features
- **3D Interactive UI**: Futuristic design with Three.js integration
- **Real-time Fraud Detection**: Automated monitoring and reporting system
- **Skill Verification**: Community-driven skill verification system
- **Dispute Resolution**: Built-in dispute resolution mechanisms
- **Token Economics**: YJT (Yellow Job Token) for staking and payments

## 🏗️ Architecture

### Smart Contracts
- **Web3JobPlatform.sol**: Main platform contract managing jobs, applications, and user registrations
- **YellowJobToken.sol**: ERC20 token for staking, payments, and rewards
- **FraudDetection.sol**: Advanced fraud detection and reputation management system

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom futuristic theme
- **Three.js**: 3D graphics and animations
- **Wagmi**: Ethereum wallet integration
- **RainbowKit**: Wallet connection UI

### Blockchain Integration
- **Yellow Network**: Primary blockchain network
- **Ethereum-compatible**: Supports standard Web3 wallets
- **Testnet Ready**: Configured for Yellow Network testnet

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd web3JobSite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
PRIVATE_KEY=your_private_key_for_deployment
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 4. Smart Contract Deployment

#### Local Development
```bash
# Start local blockchain
npx hardhat node

# Deploy contracts locally
npx hardhat run scripts/deploy.js --network localhost
```

#### Yellow Network Testnet
```bash
# Deploy to Yellow Network testnet
npx hardhat run scripts/deploy.js --network yellowTestnet
```

### 5. Update Contract Addresses
After deployment, update the contract addresses in `src/lib/web3.ts`:
```typescript
export const CONTRACT_ADDRESSES = {
  YellowJobToken: '0x...', // Your deployed token address
  FraudDetection: '0x...', // Your deployed fraud detection address
  Web3JobPlatform: '0x...', // Your deployed platform address
};
```

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 Usage Guide

### For Companies

#### 1. Registration
- Connect your wallet
- Register as a company with business information
- Add verifiable skills your company can endorse

#### 2. Staking
- Stake YJT tokens (minimum 1,000 YJT)
- Higher stakes allow more job postings
- Stakes are locked for 30 days minimum

#### 3. Job Posting
- Post jobs with detailed requirements
- Set salary ranges in YJT tokens
- Define required skills and weights
- Set application limits and deadlines

#### 4. Hiring Process
- Review applications from verified developers
- Conduct interviews and skill assessments
- Hire candidates and complete jobs
- Rate developers and update reputation

### For Developers

#### 1. Registration
- Connect your wallet
- Register as a developer with portfolio information
- Add skills with self-assessed proficiency levels
- Link GitHub and portfolio websites

#### 2. Skill Verification
- Apply for skill verification from trusted verifiers
- Provide evidence and portfolio links
- Receive community endorsements
- Build blockchain-verified reputation

#### 3. Job Applications
- Browse verified company job postings
- Apply with cover letters and skill demonstrations
- Showcase portfolio and previous work
- Track application status

#### 4. Work Completion
- Complete assigned tasks and projects
- Receive ratings and feedback from companies
- Build reputation through successful work
- Earn YJT tokens for completed projects

## 🔒 Security Features

### Fraud Prevention
- **Staking Mechanism**: Companies must stake tokens to post jobs
- **Reputation System**: Blockchain-verified reputation scores
- **Skill Verification**: Community-driven skill verification
- **Fraud Reporting**: Comprehensive fraud reporting system
- **Dispute Resolution**: Built-in dispute resolution mechanisms

### Anti-Fraud Measures
- **Identity Verification**: Wallet-based identity verification
- **Portfolio Verification**: Community verification of portfolios
- **Payment Protection**: Staked tokens protect against payment fraud
- **Reputation Penalties**: Automatic reputation penalties for fraud
- **Account Suspension**: Temporary or permanent bans for severe violations

## 🌐 Yellow Network Integration

### Network Configuration
- **Chain ID**: 1234 (Mock - replace with actual when available)
- **RPC Endpoint**: https://testnet-rpc.yellownetwork.org (Mock)
- **Block Explorer**: https://testnet-explorer.yellownetwork.org (Mock)

### Token Economics
- **YJT Token**: Primary platform token
- **Staking Rewards**: 10% annual rewards for staked tokens
- **Platform Fees**: 2% fee on token transfers
- **Gas Optimization**: Optimized for Yellow Network

### Future Enhancements
- **Yellow Network SDK**: Full integration when SDK becomes available
- **Cross-chain Support**: Multi-chain job postings
- **Advanced Analytics**: On-chain analytics and insights
- **DAO Governance**: Community-driven platform governance

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Web3JobPlatform.test.js

# Run with coverage
npx hardhat coverage
```

### Test Coverage
- Company registration and management
- Developer registration and skill verification
- Job posting and application system
- Staking mechanisms
- Fraud detection and reporting
- Reputation system

## 📊 Smart Contract Details

### Web3JobPlatform.sol
- **Company Management**: Registration, staking, job posting
- **Developer Management**: Registration, skill tracking, applications
- **Job System**: Job posting, application management, hiring
- **Reputation System**: On-chain reputation tracking
- **Skill Verification**: Community-driven skill verification

### YellowJobToken.sol
- **ERC20 Standard**: Full ERC20 token implementation
- **Staking System**: Token staking with rewards
- **Fee Mechanism**: Platform fees and fee distribution
- **Burn Functionality**: Token burning for deflationary mechanics

### FraudDetection.sol
- **Fraud Reporting**: Comprehensive fraud reporting system
- **Reputation Scoring**: Advanced reputation calculation
- **Activity Monitoring**: User activity tracking and analysis
- **Penalty System**: Automatic penalty application

## 🚀 Deployment

### Production Deployment
1. **Deploy Contracts**: Deploy to Yellow Network mainnet
2. **Verify Contracts**: Verify contracts on block explorer
3. **Update Configuration**: Update contract addresses and RPC endpoints
4. **Deploy Frontend**: Deploy to production hosting platform
5. **Domain Setup**: Configure custom domain and SSL

### Monitoring
- **Contract Monitoring**: Monitor contract events and transactions
- **Performance Tracking**: Track platform usage and performance
- **Security Monitoring**: Monitor for suspicious activities
- **Analytics**: Track user engagement and platform metrics

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- **TypeScript**: Use TypeScript for type safety
- **ESLint**: Follow ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Testing**: Write tests for all new functionality
- **Documentation**: Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- **Smart Contract Docs**: Comprehensive contract documentation
- **API Documentation**: Frontend API documentation
- **User Guides**: Step-by-step user guides
- **FAQ**: Frequently asked questions

### Community
- **Discord**: Join our Discord community
- **Telegram**: Follow us on Telegram
- **Twitter**: Follow us on Twitter
- **GitHub**: Star us on GitHub

### Contact
- **Email**: support@web3jobs.network
- **Website**: https://web3jobs.network
- **Documentation**: https://docs.web3jobs.network

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core platform development
- ✅ Smart contract deployment
- ✅ Basic UI/UX implementation
- ✅ Yellow Network integration

### Phase 2 (Q1 2024)
- 🔄 Advanced fraud detection
- 🔄 Mobile application
- 🔄 API marketplace
- 🔄 Advanced analytics

### Phase 3 (Q2 2024)
- ⏳ Cross-chain support
- ⏳ DAO governance
- ⏳ Advanced AI features
- ⏳ Enterprise solutions

### Phase 4 (Q3 2024)
- ⏳ Global expansion
- ⏳ Advanced integrations
- ⏳ Premium features
- ⏳ Institutional adoption

---

**Built with ❤️ for the Web3 community on Yellow Network**

*This platform represents the future of decentralized work, combining blockchain technology with advanced fraud prevention to create a trusted, transparent, and efficient job marketplace.*