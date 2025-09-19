// Test IPFS functionality
import { uploadToIPFS, getIPFSUrl, isValidIPFSHash } from './ipfs';

export const testIPFS = async () => {
  try {
    console.log('🧪 Testing IPFS functionality...');
    
    // Test hash validation
    const validHash = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
    const invalidHash = 'invalid-hash';
    
    console.log('✅ Valid hash test:', isValidIPFSHash(validHash));
    console.log('❌ Invalid hash test:', isValidIPFSHash(invalidHash));
    
    // Test URL generation
    const url = getIPFSUrl(validHash);
    console.log('🔗 Generated URL:', url);
    
    console.log('✅ IPFS functionality test completed');
    return true;
  } catch (error) {
    console.error('❌ IPFS test failed:', error);
    return false;
  }
};

// Test file upload (requires actual file)
export const testFileUpload = async (file: File) => {
  try {
    console.log('📤 Testing file upload to IPFS...');
    const result = await uploadToIPFS(file);
    console.log('✅ Upload successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
};
