# API Keys Guide for Web3Job Network

This guide covers all the API keys and environment variables you need to set up for your Web3Job Network application.

## 🔑 Required API Keys

### 1. WalletConnect Project ID
**Environment Variable:** `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

**What it's for:** Enables wallet connections through RainbowKit (MetaMask, WalletConnect, etc.)

**How to get it:**
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in to your account
3. Click "Create Project"
4. Enter project details:
   - **Project Name:** Web3Job Network
   - **Project Description:** Decentralized job platform on Yellow Network
   - **Project URL:** Your domain (e.g., `https://web3jobs.network`)
5. Copy the Project ID from your dashboard
6. Add to your `.env.local` file:
   ```env
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
   ```

### 2. Private Key for Contract Deployment
**Environment Variable:** `PRIVATE_KEY`

**What it's for:** Deploying smart contracts to blockchain networks

**How to get it:**
1. **Option A: Use MetaMask**
   - Open MetaMask
   - Click on account name → Account Details → Export Private Key
   - Enter your password to reveal the private key
   - ⚠️ **NEVER share this key or commit it to version control**

2. **Option B: Generate new wallet**
   - Use tools like MyEtherWallet or create a new MetaMask wallet
   - Export the private key following the same steps

3. Add to your `.env.local` file:
   ```env
   PRIVATE_KEY=your_private_key_here
   ```

### 3. Etherscan API Key
**Environment Variable:** `ETHERSCAN_API_KEY`

**What it's for:** Verifying smart contracts on Etherscan (and similar explorers)

**How to get it:**
1. Go to [Etherscan.io](https://etherscan.io/)
2. Click "Sign In" and create an account
3. Go to [API Keys page](https://etherscan.io/apis)
4. Click "Add" to create a new API key
5. Enter a name for your API key (e.g., "Web3Job Network")
6. Copy the generated API key
7. Add to your `.env.local` file:
   ```env
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

### 4. Yellow Network RPC URL (Optional)
**Environment Variable:** `YELLOW_NETWORK_RPC_URL`

**What it's for:** Connecting to Yellow Network testnet/mainnet

**How to get it:**
1. Visit [Yellow Network documentation](https://docs.yellownetwork.org/)
2. Look for RPC endpoints in their developer resources
3. For testnet, you might need to request access
4. Add to your `.env.local` file:
   ```env
   YELLOW_NETWORK_RPC_URL=https://testnet-rpc.yellownetwork.org
   ```

## 📁 Environment File Setup

Create a `.env.local` file in your project root with all the required variables:

```env
# WalletConnect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Blockchain Configuration
PRIVATE_KEY=your_private_key_for_deployment
YELLOW_NETWORK_RPC_URL=https://testnet-rpc.yellownetwork.org

# Block Explorer APIs
ETHERSCAN_API_KEY=your_etherscan_api_key

# Optional: Additional RPC URLs for different networks
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/your_infura_key
```

## 🔒 Security Best Practices

### 1. Never Commit Private Keys
- Add `.env.local` to your `.gitignore` file
- Use environment variables for all sensitive data
- Consider using a secrets management service for production

### 2. Use Different Keys for Different Environments
- **Development:** Use testnet keys and small amounts
- **Staging:** Use separate testnet keys
- **Production:** Use mainnet keys with proper security measures

### 3. Rotate Keys Regularly
- Change API keys periodically
- Monitor API key usage
- Revoke unused keys

## 🚀 Deployment-Specific Keys

### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each environment variable:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - `PRIVATE_KEY` (for contract deployment)
   - `ETHERSCAN_API_KEY`

### For Other Hosting Platforms
- **Netlify:** Environment variables in Site Settings
- **AWS:** Use AWS Secrets Manager or Parameter Store
- **DigitalOcean:** Use App Platform environment variables

## 🧪 Testing Your Configuration

### 1. Verify WalletConnect
```bash
npm run dev
```
- Open your app in browser
- Try connecting a wallet
- Should see wallet connection options

### 2. Test Contract Deployment
```bash
# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to testnet (when ready)
npx hardhat run scripts/deploy.js --network yellowTestnet
```

### 3. Verify Contract on Explorer
```bash
# Verify contracts on Etherscan
npx hardhat verify --network yellowTestnet <CONTRACT_ADDRESS>
```

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid Project ID" Error**
   - Check that `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
   - Ensure the project is active in WalletConnect Cloud

2. **"Private Key Invalid" Error**
   - Verify the private key format (should start with 0x)
   - Ensure the account has sufficient funds for deployment

3. **"API Key Invalid" Error**
   - Check Etherscan API key is correct
   - Verify the key has proper permissions

4. **"RPC URL Invalid" Error**
   - Test the RPC URL in a tool like Postman
   - Check if the network is accessible

### Getting Help

- **WalletConnect Issues:** [WalletConnect Discord](https://discord.gg/walletconnect)
- **Etherscan Issues:** [Etherscan Support](https://etherscan.io/support)
- **Yellow Network Issues:** Check their official documentation

## 📋 Checklist

Before deploying your application, ensure you have:

- [ ] WalletConnect Project ID configured
- [ ] Private key for contract deployment
- [ ] Etherscan API key for contract verification
- [ ] Yellow Network RPC URL (if available)
- [ ] All environment variables added to hosting platform
- [ ] `.env.local` added to `.gitignore`
- [ ] Tested wallet connections
- [ ] Tested contract deployment
- [ ] Verified contracts on block explorer

## 🎯 Next Steps

1. **Set up all API keys** using the instructions above
2. **Test locally** to ensure everything works
3. **Deploy contracts** to Yellow Network testnet
4. **Update contract addresses** in your code
5. **Deploy frontend** to your hosting platform
6. **Verify everything works** in production

---

**Remember:** Keep your private keys secure and never share them publicly!
