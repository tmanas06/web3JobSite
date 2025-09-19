# Profile Management Setup Guide

## Overview

The Web3 Job Platform now includes blockchain-based profile storage with IPFS integration for images. All profile data is stored on-chain, and images are stored on IPFS using Pinata.

## Features

### 🔗 **Blockchain Profile Storage**
- All profile data stored on Ethereum blockchain
- Immutable and decentralized profile management
- Profile data persists across sessions
- No centralized database required

### 🖼️ **IPFS Image Storage**
- Avatar and cover images stored on IPFS
- Decentralized image hosting
- Images accessible via IPFS hash
- Pinata integration for reliable pinning

### 📝 **Profile Data**
- Personal information (name, email, bio, location)
- Social links (website, GitHub, LinkedIn, Twitter)
- Skills with proficiency scores
- Avatar and cover images
- Creation and update timestamps

## Setup Instructions

### 1. **IPFS Configuration (Pinata)**

#### Get Pinata API Keys
1. Go to [Pinata.cloud](https://pinata.cloud)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key with the following permissions:
   - `pinFileToIPFS`
   - `pinJSONToIPFS`
   - `unpin`

#### Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# IPFS Configuration (Pinata)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key_here
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key_here

# Other environment variables...
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_api_key_here
```

### 2. **Smart Contract Deployment**

The UserProfile contract is already deployed. Current addresses:

```
TestnetToken: 0xc6e7DF5E7b4f2A278906862b61205850344D4e7d
YellowJobToken: 0x59b670e9fA9D0A427751Af201D676719a970857b
FraudDetection: 0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1
Web3JobPlatform: 0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44
UserProfile: 0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f
```

### 3. **Frontend Integration**

The profile management is integrated into the frontend:

- **Profile Page**: `/profile` - Full profile management interface
- **ProfileManager Component**: Handles all profile operations
- **IPFS Service**: Manages image uploads and retrieval
- **Web3Context**: Provides profile management functions

## Usage

### **Creating a Profile**

1. Connect your MetaMask wallet
2. Navigate to `/profile`
3. Click "Edit Profile"
4. Fill in your information:
   - Upload avatar and cover images
   - Add personal details
   - Set social links
   - Add skills with proficiency scores
5. Click "Save" to store on blockchain

### **Updating Profile**

1. Go to `/profile`
2. Click "Edit Profile"
3. Modify any information
4. Upload new images if needed
5. Click "Save" to update on blockchain

### **Image Management**

- **Avatar**: Profile picture (recommended: 400x400px)
- **Cover**: Cover image (recommended: 1200x400px)
- **Format**: JPG, PNG, GIF supported
- **Size**: Max 10MB per image
- **Storage**: Automatically uploaded to IPFS

## Technical Details

### **Smart Contract Functions**

```solidity
// Create new profile
function createProfile(
    string memory _name,
    string memory _email,
    string memory _bio,
    string memory _avatarHash,  // IPFS hash
    string memory _coverHash,   // IPFS hash
    string[] memory _socialLinks,
    string[] memory _skills,
    uint256[] memory _skillScores,
    string memory _location,
    string memory _website,
    string memory _github,
    string memory _linkedin,
    string memory _twitter
) external;

// Update existing profile
function updateProfile(...) external;

// Update only avatar
function updateAvatar(string memory _avatarHash) external;

// Update only cover
function updateCover(string memory _coverHash) external;
```

### **IPFS Integration**

```typescript
// Upload image to IPFS
const result = await uploadToIPFS(file);
// Returns: { hash, url, size }

// Get IPFS URL from hash
const url = getIPFSUrl(hash);
// Returns: https://gateway.pinata.cloud/ipfs/{hash}
```

### **Profile Data Structure**

```typescript
interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatarHash: string;    // IPFS hash
  coverHash: string;     // IPFS hash
  socialLinks: string[];
  skills: string[];
  skillScores: number[];
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
}
```

## Security Features

### **Access Control**
- Only profile owner can update their profile
- Contract owner can pause/unpause if needed
- Reentrancy protection implemented

### **Data Validation**
- Name cannot be empty
- Skills and scores arrays must match length
- Input validation on all fields

### **IPFS Security**
- Images pinned to IPFS for persistence
- Hash-based content addressing
- Immutable image storage

## Troubleshooting

### **Common Issues**

1. **IPFS Upload Fails**
   - Check Pinata API keys
   - Verify network connection
   - Check file size (max 10MB)

2. **Profile Not Loading**
   - Ensure wallet is connected
   - Check contract address
   - Verify network connection

3. **Image Not Displaying**
   - Check IPFS hash validity
   - Verify Pinata gateway access
   - Check image format support

### **Debug Commands**

```bash
# Test IPFS connection
npm run test:ipfs

# Test profile contract
npm run test:profile

# Check deployment
npm run test:deployment
```

## Benefits

### **Decentralization**
- No central authority controls profiles
- Data stored on public blockchain
- Images distributed via IPFS

### **Persistence**
- Profile data survives platform changes
- Images permanently stored on IPFS
- No data loss from server issues

### **Transparency**
- All profile changes are public
- Immutable history of updates
- Verifiable data integrity

### **User Control**
- Users own their profile data
- Can be used across platforms
- Portable digital identity

## Next Steps

1. **Set up Pinata account** and get API keys
2. **Configure environment variables**
3. **Test profile creation** and updates
4. **Upload images** and verify IPFS storage
5. **Integrate with other platform features**

The profile system is now fully integrated and ready for production use!
