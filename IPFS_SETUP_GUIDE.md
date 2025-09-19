# IPFS Setup Guide for Profile Images

## Overview

The Web3 Job Platform uses IPFS (InterPlanetary File System) for storing profile images (avatars and cover photos) in a decentralized manner. We use Pinata as our IPFS pinning service to ensure reliable access to your images.

## Quick Setup

### 1. Create Pinata Account

1. Go to [Pinata.cloud](https://pinata.cloud)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Keys

1. Log into your Pinata dashboard
2. Go to **API Keys** section
3. Click **New Key**
4. Give it a name (e.g., "Web3 Job Platform")
5. Select permissions:
   - ✅ **pinFileToIPFS** - Upload files
   - ✅ **pinJSONToIPFS** - Upload JSON data
   - ✅ **unpin** - Remove files (optional)
6. Click **Create Key**
7. **Copy both the API Key and Secret Key** (you won't see them again!)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# IPFS Configuration (Pinata)
NEXT_PUBLIC_PINATA_API_KEY=your_api_key_here
NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key_here
```

**Important:** 
- Use `NEXT_PUBLIC_` prefix for client-side access
- Never commit these keys to version control
- Add `.env.local` to your `.gitignore`

### 4. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/profile` page
3. Connect your wallet
4. Try uploading an image
5. Check browser console for any errors

## How It Works

### Image Upload Process

1. **User selects image** → File picker opens
2. **Image validation** → Check file type and size
3. **Upload to IPFS** → Image sent to Pinata
4. **Get IPFS hash** → Unique identifier for the image
5. **Store hash on blockchain** → Save hash in user profile
6. **Display image** → Show image using IPFS gateway URL

### Image Storage

- **IPFS Hash**: `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`
- **Gateway URL**: `https://gateway.pinata.cloud/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`
- **Blockchain Storage**: Only the hash is stored on-chain (not the image)

## Supported Features

### Image Types
- **Formats**: JPG, PNG, GIF, WebP
- **Max Size**: 10MB per image
- **Recommended**: 
  - Avatar: 400x400px
  - Cover: 1200x400px

### IPFS Benefits
- **Decentralized**: No single point of failure
- **Immutable**: Images cannot be changed once uploaded
- **Global Access**: Available worldwide via IPFS network
- **Cost Effective**: Only pay for pinning service

## Troubleshooting

### Common Issues

#### 1. "IPFS is not configured" Error
**Problem**: Missing environment variables
**Solution**: 
- Check `.env.local` file exists
- Verify API keys are correct
- Restart development server

#### 2. "Failed to upload image" Error
**Problem**: API key issues or network problems
**Solution**:
- Verify API keys in Pinata dashboard
- Check internet connection
- Try uploading a smaller image

#### 3. Images Not Displaying
**Problem**: IPFS gateway issues
**Solution**:
- Check if IPFS hash is valid
- Try different IPFS gateway
- Verify image was pinned successfully

### Debug Steps

1. **Check Environment Variables**:
   ```bash
   echo $NEXT_PUBLIC_PINATA_API_KEY
   echo $NEXT_PUBLIC_PINATA_SECRET_KEY
   ```

2. **Test API Keys**:
   ```bash
   curl -X GET "https://api.pinata.cloud/data/testAuthentication" \
   -H "pinata_api_key: YOUR_API_KEY" \
   -H "pinata_secret_api_key: YOUR_SECRET_KEY"
   ```

3. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for failed requests

## Production Considerations

### Security
- **API Keys**: Store securely, never expose in client code
- **Rate Limits**: Pinata has rate limits on free tier
- **Access Control**: Consider implementing access controls

### Performance
- **Image Optimization**: Compress images before upload
- **Caching**: Use CDN for better performance
- **Fallbacks**: Have backup image hosting

### Cost
- **Pinata Pricing**: Free tier available, paid plans for production
- **Storage**: Images stored permanently on IPFS
- **Bandwidth**: Gateway access may have costs

## Alternative IPFS Providers

If Pinata doesn't work for you:

1. **Infura IPFS**: `https://ipfs.infura.io`
2. **Web3.Storage**: `https://web3.storage`
3. **Fleek**: `https://fleek.co`
4. **Self-hosted**: Run your own IPFS node

## Support

- **Pinata Docs**: [docs.pinata.cloud](https://docs.pinata.cloud)
- **IPFS Docs**: [docs.ipfs.io](https://docs.ipfs.io)
- **Project Issues**: Check GitHub issues for this project

## Next Steps

1. ✅ Set up Pinata account
2. ✅ Configure environment variables
3. ✅ Test image upload
4. ✅ Deploy to production
5. ✅ Monitor usage and costs

Your profile images are now stored in a truly decentralized way! 🎉
