# Vercel Deployment Guide

This guide will help you deploy your Web3 Job Platform to Vercel for production.

## Prerequisites

### 1. Required Accounts
- [Vercel Account](https://vercel.com) (free tier available)
- [Pinata Account](https://pinata.cloud) (for IPFS storage)
- [WalletConnect Account](https://cloud.walletconnect.com) (for wallet connections)

### 2. API Keys Setup

#### Pinata (IPFS Storage)
1. Go to [Pinata](https://pinata.cloud) and create an account
2. Navigate to API Keys section
3. Create a new API key with the following permissions:
   - PinFileToIPFS
   - PinJSONToIPFS
   - Unpin
4. Copy your API Key and Secret

#### WalletConnect
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID

## Deployment Steps

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_PINATA_API_KEY
   vercel env add NEXT_PUBLIC_PINATA_SECRET_KEY
   vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
   vercel env add NEXT_PUBLIC_CHAIN_ID
   vercel env add NEXT_PUBLIC_RPC_URL
   ```

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Environment Variables**
   - In the Vercel dashboard, go to your project
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `NEXT_PUBLIC_PINATA_API_KEY` = your_pinata_api_key
     - `NEXT_PUBLIC_PINATA_SECRET_KEY` = your_pinata_secret_key
     - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = your_wallet_connect_project_id
     - `NEXT_PUBLIC_CHAIN_ID` = 11155111 (Sepolia testnet)
     - `NEXT_PUBLIC_RPC_URL` = https://sepolia.infura.io/v3/YOUR_INFURA_KEY

4. **Deploy**
   - Click "Deploy" button
   - Vercel will automatically build and deploy your application

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_PINATA_API_KEY` | Pinata API Key for IPFS | `your_pinata_api_key` |
| `NEXT_PUBLIC_PINATA_SECRET_KEY` | Pinata Secret Key | `your_pinata_secret_key` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect Project ID | `your_project_id` |
| `NEXT_PUBLIC_CHAIN_ID` | Target blockchain chain ID | `31337` |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | `https://rpc.yellow.org` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_YELLOW_JOB_TOKEN_ADDRESS` | Deployed token contract address | `0x...` |
| `NEXT_PUBLIC_FRAUD_DETECTION_ADDRESS` | Deployed fraud detection contract | `0x...` |
| `NEXT_PUBLIC_WEB3_JOB_PLATFORM_ADDRESS` | Deployed job platform contract | `0x...` |
| `NEXT_PUBLIC_USER_PROFILE_ADDRESS` | Deployed user profile contract | `0x...` |

## Post-Deployment Configuration

### 1. Update Contract Addresses

After deploying your smart contracts, update the environment variables in Vercel with the actual contract addresses.

### 2. Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to Domains
3. Add your custom domain
4. Configure DNS settings as instructed

### 3. Set up Monitoring

1. Enable Vercel Analytics (optional)
2. Set up error monitoring (Sentry, etc.)
3. Configure uptime monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript errors are resolved
   - Verify environment variables are set correctly

2. **IPFS Upload Issues**
   - Verify Pinata API keys are correct
   - Check that API keys have proper permissions
   - Ensure environment variables are prefixed with `NEXT_PUBLIC_`

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check that the project is properly configured
   - Ensure the RPC URL is accessible

4. **Contract Interaction Issues**
   - Verify contract addresses are correct
   - Check that contracts are deployed on the correct network
   - Ensure the chain ID matches your target network

### Debug Steps

1. **Check Build Logs**
   - Go to Vercel dashboard
   - Click on your deployment
   - Check the build logs for errors

2. **Test Environment Variables**
   - Add console.log statements to check if variables are loaded
   - Use Vercel's environment variable preview

3. **Test Locally**
   - Run `npm run build` locally to catch build issues
   - Test with production environment variables

## Security Considerations

1. **Environment Variables**
   - Never commit API keys to version control
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **Smart Contract Security**
   - Deploy to testnet first
   - Conduct security audits
   - Use multi-signature wallets for production

3. **Frontend Security**
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS in production

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images before upload
   - Consider using a CDN

2. **Bundle Optimization**
   - Use dynamic imports where appropriate
   - Remove unused dependencies
   - Enable Vercel's automatic optimizations

3. **Caching**
   - Implement proper caching strategies
   - Use Vercel's edge caching
   - Optimize API calls

## Monitoring and Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update smart contracts as needed

2. **Performance Monitoring**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Track user interactions

3. **Error Monitoring**
   - Set up error tracking
   - Monitor failed transactions
   - Track user feedback

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Pinata Documentation](https://docs.pinata.cloud)
- [WalletConnect Documentation](https://docs.walletconnect.com)

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Smart contracts deployed
- [ ] Contract addresses updated
- [ ] Domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Security measures implemented
- [ ] Documentation updated
- [ ] Team access configured
- [ ] Backup procedures in place
