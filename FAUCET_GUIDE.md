# Testnet Faucet Guide

This guide explains how to obtain testnet tokens for the Web3 Job Platform.

## Overview

The Web3 Job Platform uses two types of tokens:

1. **TestnetToken (TEST)** - Used for staking by companies
2. **YellowJobToken (YJT)** - Platform-specific token for rewards and payments

## Ethereum Testnet Faucets

### Sepolia Testnet (Recommended)

#### Free Faucets

1. **Alchemy Faucet**
   - URL: [sepoliafaucet.com](https://sepoliafaucet.com)
   - Amount: 0.5 ETH per day
   - Requirements: Twitter account
   - Rate Limit: 24 hours

2. **Chainlink Faucet**
   - URL: [faucets.chain.link](https://faucets.chain.link)
   - Amount: 0.1 ETH per day
   - Requirements: None
   - Rate Limit: 24 hours

3. **Infura Faucet**
   - URL: [infura.io/faucet/sepolia](https://infura.io/faucet/sepolia)
   - Amount: 0.5 ETH per day
   - Requirements: Infura account
   - Rate Limit: 24 hours

4. **QuickNode Faucet**
   - URL: [faucet.quicknode.com](https://faucet.quicknode.com)
   - Amount: 0.1 ETH per day
   - Requirements: QuickNode account
   - Rate Limit: 24 hours

#### Paid Faucets (Higher Limits)

1. **Alchemy Pro**
   - Amount: 5 ETH per day
   - Cost: $200/month
   - Requirements: Paid account

2. **Infura Pro**
   - Amount: 2 ETH per day
   - Cost: $50/month
   - Requirements: Paid account

### Goerli Testnet (Deprecated)

⚠️ **Note**: Goerli testnet is deprecated. Use Sepolia instead.

## Getting Testnet Tokens

### Step 1: Get ETH for Gas

1. Choose a faucet from the list above
2. Enter your wallet address
3. Complete any required verification
4. Wait for the transaction to confirm
5. Check your MetaMask balance

### Step 2: Deploy TestnetToken Contract

If you need TEST tokens for staking:

1. Deploy the TestnetToken contract to Sepolia
2. Use the faucet function to get tokens
3. Or mint tokens if you're the contract owner

### Step 3: Get YJT Tokens

1. Deploy the YellowJobToken contract
2. Use the mint function to create tokens
3. Or use the platform's reward system

## Local Development Setup

### Using Hardhat Node

For local testing, you can use the built-in Hardhat accounts:

```bash
# Start local node
npm run node

# This provides 20 test accounts with 10,000 ETH each
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Import Faucet Account to MetaMask

1. Open MetaMask
2. Click account icon → Import Account
3. Select "Private Key"
4. Enter: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
5. Click "Import"

## Token Distribution

### TestnetToken (TEST) - For Staking

- **Purpose**: Companies stake these tokens to post jobs
- **Initial Supply**: 1,000,000 TEST
- **Faucet Function**: Anyone can call `faucet()` to get 1,000 TEST
- **Mint Function**: Owner can mint additional tokens

### YellowJobToken (YJT) - Platform Token

- **Purpose**: Platform rewards, payments, and reputation
- **Initial Supply**: 10,000,000 YJT
- **Mint Function**: Owner can mint up to 100,000,000 YJT
- **Staking Rewards**: 10% annual reward for staking

## Faucet Usage Examples

### Using the TestnetToken Faucet

```javascript
// Connect to contract
const testnetToken = await ethers.getContractAt("TestnetToken", contractAddress);

// Call faucet function
await testnetToken.faucet();

// Check balance
const balance = await testnetToken.balanceOf(userAddress);
console.log(`Balance: ${ethers.formatEther(balance)} TEST`);
```

### Minting Additional Tokens

```javascript
// Only contract owner can mint
const testnetToken = await ethers.getContractAt("TestnetToken", contractAddress);

// Mint 10,000 tokens
const amount = ethers.parseEther("10000");
await testnetToken.mint(userAddress, amount);
```

## Troubleshooting

### Common Issues

#### "Insufficient funds for gas"
- **Solution**: Get more ETH from faucets
- **Check**: Ensure you're on the correct network

#### "Faucet rate limit exceeded"
- **Solution**: Wait 24 hours or use a different faucet
- **Alternative**: Use multiple faucets

#### "Transaction failed"
- **Solution**: Increase gas limit
- **Check**: Ensure contract is deployed

#### "Token not found"
- **Solution**: Verify contract address
- **Check**: Ensure contract is deployed on correct network

### Network Issues

#### RPC endpoint not responding
- Try alternative RPC URLs
- Check if the endpoint is down
- Use a different provider

#### Slow transactions
- Increase gas price
- Use a different RPC endpoint
- Check network congestion

## Best Practices

### Security

- **Never use mainnet private keys for testing**
- **Use separate accounts for different purposes**
- **Don't share private keys or seed phrases**

### Efficiency

- **Batch multiple operations when possible**
- **Use gas estimation tools**
- **Monitor gas prices**

### Testing

- **Test with small amounts first**
- **Verify transactions on block explorer**
- **Keep track of test accounts**

## Faucet Alternatives

### Self-Funding

If faucets are not available:

1. Deploy contracts to a testnet
2. Use the mint functions to create tokens
3. Transfer tokens between accounts
4. Use the platform's reward system

### Community Faucets

- Join Discord/Telegram communities
- Ask for testnet tokens
- Participate in testnet programs
- Use community-run faucets

## Monitoring

### Track Faucet Usage

- Monitor your ETH balance
- Track token balances
- Set up alerts for low balances
- Use block explorers to verify transactions

### Gas Optimization

- Use gas estimation tools
- Monitor gas prices
- Batch transactions when possible
- Use gas tokens for discounts

## Support

If you need help:

1. Check the troubleshooting section
2. Verify network configuration
3. Ensure sufficient funds
4. Check transaction status
5. Contact the development team

## Additional Resources

- [Ethereum Testnets](https://ethereum.org/en/developers/docs/networks/)
- [Gas and Fees](https://ethereum.org/en/developers/docs/gas/)
- [Block Explorers](https://ethereum.org/en/developers/docs/block-explorers/)
- [MetaMask Documentation](https://docs.metamask.io/)

---

**⚠️ Important**: These tokens have no real value and are for testing purposes only. Never use testnet tokens for real transactions.
