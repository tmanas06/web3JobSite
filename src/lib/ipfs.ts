import { create } from 'ipfs-http-client';

// IPFS configuration
const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
const IPFS_API_URL = 'https://api.pinata.cloud';

// Create IPFS client
const ipfs = create({
  url: IPFS_API_URL,
  headers: {
    'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
    'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
  }
});

export interface IPFSUploadResult {
  hash: string;
  url: string;
  size: number;
}

/**
 * Upload file to IPFS using Pinata
 */
export const uploadToIPFS = async (file: File): Promise<IPFSUploadResult> => {
  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Upload to IPFS
    const result = await ipfs.add(fileBuffer, {
      pin: true,
      progress: (prog) => console.log(`Upload progress: ${prog}`)
    });

    const hash = result.path;
    const url = `${IPFS_GATEWAY}${hash}`;

    return {
      hash,
      url,
      size: file.size
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
};

/**
 * Upload JSON data to IPFS
 */
export const uploadJSONToIPFS = async (data: any): Promise<IPFSUploadResult> => {
  try {
    const jsonString = JSON.stringify(data);
    const buffer = Buffer.from(jsonString);

    const result = await ipfs.add(buffer, {
      pin: true
    });

    const hash = result.path;
    const url = `${IPFS_GATEWAY}${hash}`;

    return {
      hash,
      url,
      size: buffer.length
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
};

/**
 * Get file from IPFS
 */
export const getFromIPFS = async (hash: string): Promise<any> => {
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk);
    }
    const data = Buffer.concat(chunks);
    return data;
  } catch (error) {
    console.error('Error getting from IPFS:', error);
    throw new Error('Failed to get file from IPFS');
  }
};

/**
 * Get JSON data from IPFS
 */
export const getJSONFromIPFS = async (hash: string): Promise<any> => {
  try {
    const data = await getFromIPFS(hash);
    const jsonString = data.toString();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error getting JSON from IPFS:', error);
    throw new Error('Failed to get JSON from IPFS');
  }
};

/**
 * Generate IPFS URL from hash
 */
export const getIPFSUrl = (hash: string): string => {
  return `${IPFS_GATEWAY}${hash}`;
};

/**
 * Validate IPFS hash
 */
export const isValidIPFSHash = (hash: string): boolean => {
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(hash) || 
         /^bafybei[a-z2-7]{52}$/.test(hash);
};
