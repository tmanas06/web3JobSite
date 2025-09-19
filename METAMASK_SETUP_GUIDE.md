# MetaMask Setup Guide for Web3 Job Platform

This guide will help you set up MetaMask to work with the Web3 Job Platform using Ethereum testnet tokens.

## Prerequisites

- MetaMask browser extension installed
- Basic understanding of blockchain networks
- Access to Ethereum testnet faucets

## Step 1: Install MetaMask

If you don't have MetaMask installed:

1. Go to [metamask.io](https://metamask.io)
2. Click "Download" and install the browser extension
3. Create a new wallet or import an existing one
4. **IMPORTANT**: Save your seed phrase securely

## Step 2: Add Local Development Network

### For Local Testing (Hardhat Node)

1. Open MetaMask
2. Click on the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add network" or "Custom RPC"
4. Fill in the following details:

```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Block Explorer URL: (leave empty)
```

5. Click "Save"

### For Ethereum Sepolia Testnet

1. Click on the network dropdown
2. Click "Add network" or "Custom RPC"
3. Fill in the following details:

```
Network Name: Sepolia Test Network
RPC URL: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
Chain ID: 11155111
Currency Symbol: ETH
Block Explorer URL: https://sepolia.etherscan.io
```

4. Click "Save"

## Step 3: Import Faucet Account

### Method 1: Import Private Key (Recommended for Testing)

1. Open MetaMask
2. Click on the account icon (top right)
3. Click "Import Account"
4. Select "Private Key" as the import type
5. Enter the private key from your Hardhat node:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

6. Click "Import"

### Method 2: Create New Account and Fund

1. Create a new account in MetaMask
2. Copy the wallet address
3. Use a testnet faucet to fund the account

## Step 4: Get Testnet Tokens

### For Ethereum Sepolia Testnet

1. **Sepolia Faucet**: Visit [sepoliafaucet.com](https://sepoliafaucet.com)
2. **Alchemy Faucet**: Visit [sepoliafaucet.com](https://sepoliafaucet.com)
3. **Chainlink Faucet**: Visit [faucets.chain.link](https://faucets.chain.link)
4. **Infura Faucet**: Visit [infura.io/faucet/sepolia](https://infura.io/faucet/sepolia)

### For Local Development

The Hardhat node provides test accounts with 10,000 ETH each. No additional funding needed.

## Step 5: Add Custom Tokens

### Add TestnetToken (for staking)

1. In MetaMask, click "Import tokens"
2. Click "Custom Token"
3. Enter the TestnetToken contract address (from deployment)
4. Token Symbol: TEST
5. Decimals: 18
6. Click "Add Custom Token"

### Add YellowJobToken (for platform)

1. In MetaMask, click "Import tokens"
2. Click "Custom Token"
3. Enter the YellowJobToken contract address (from deployment)
4. Token Symbol: YJT
5. Decimals: 18
6. Click "Add Custom Token"

## Step 6: Configure Network Settings

### Gas Settings

1. Go to MetaMask Settings
2. Click "Advanced"
3. Set "Gas fee" to "Low" for testnet
4. Enable "Show test networks" if not already enabled

### Security Settings

1. Enable "Show test networks" in Advanced settings
2. Enable "Show incoming transactions"
3. Enable "Show fiat currency" (optional)

## Step 7: Test the Setup

### Test Network Connection

1. Switch to the correct network
2. Check that you have ETH for gas fees
3. Check that you have the required tokens

### Test Token Transfer

1. Send a small amount of tokens to another address
2. Verify the transaction appears in the activity tab
3. Check the transaction on the block explorer

## Troubleshooting

### Common Issues

#### "Insufficient funds for gas"
- **Solution**: Get more ETH from a testnet faucet
- **Check**: Ensure you're on the correct network

#### "Transaction failed"
- **Solution**: Increase gas limit or gas price
- **Check**: Ensure you have enough ETH for gas

#### "Token not showing"
- **Solution**: Manually add the token using contract address
- **Check**: Verify the contract address is correct

#### "Network not found"
- **Solution**: Manually add the network with correct RPC URL
- **Check**: Ensure the RPC URL is accessible

### Network Issues

#### RPC URL not working
- Try alternative RPC URLs:
  - `https://rpc.sepolia.org`
  - `https://sepolia.gateway.tenderly.co`
  - `https://sepolia.drpc.org`

#### Slow transactions
- Increase gas price
- Try a different RPC endpoint
- Check network congestion

## Security Best Practices

### For Testing Only

- **Never use mainnet private keys for testing**
- **Never share your seed phrase**
- **Use separate accounts for testing and production**

### Account Management

- Create separate accounts for different purposes
- Use hardware wallets for mainnet
- Regularly backup your wallet

## Advanced Configuration

### Custom RPC Endpoints

For better performance, you can use custom RPC endpoints:

```
# Alchemy
https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Infura
https://sepolia.infura.io/v3/YOUR_API_KEY

# QuickNode
https://your-endpoint.quiknode.pro/YOUR_API_KEY/
```

### Gas Optimization

1. Use gas estimation tools
2. Monitor gas prices
3. Batch transactions when possible
4. Use gas tokens for discounts

## Testing Checklist

- [ ] MetaMask installed and configured
- [ ] Local network added (Chain ID: 31337)
- [ ] Sepolia testnet added (Chain ID: 11155111)
- [ ] Faucet account imported
- [ ] Testnet ETH obtained
- [ ] TestnetToken added to wallet
- [ ] YellowJobToken added to wallet
- [ ] Test transaction completed
- [ ] All networks working correctly

## Support

If you encounter issues:

1. Check the troubleshooting section
2. Verify network configuration
3. Ensure sufficient funds
4. Check transaction status on block explorer
5. Contact support if needed

## Additional Resources

- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethereum Testnets](https://ethereum.org/en/developers/docs/networks/)
- [Gas and Fees](https://ethereum.org/en/developers/docs/gas/)
- [Block Explorers](https://ethereum.org/en/developers/docs/block-explorers/)

---

**⚠️ Important**: This setup is for testing purposes only. Never use testnet private keys or accounts for mainnet transactions.