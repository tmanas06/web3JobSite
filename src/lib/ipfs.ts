// IPFS configuration
const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

export interface IPFSUploadResult {
  hash: string;
  url: string;
  size: number;
}

/**
 * Upload file to IPFS using Pinata SDK
 */
export const uploadToIPFS = async (file: File): Promise<IPFSUploadResult> => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('IPFS upload can only be used on the client side');
    }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
    });

    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
        'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const hash = result.IpfsHash;
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
 * Upload JSON data to IPFS using Pinata SDK
 */
export const uploadJSONToIPFS = async (data: any): Promise<IPFSUploadResult> => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('IPFS upload can only be used on the client side');
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
        'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
      },
      body: JSON.stringify({
        pinataContent: data,
        pinataMetadata: {
          name: 'profile-data.json',
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const hash = result.IpfsHash;
    const url = `${IPFS_GATEWAY}${hash}`;

    return {
      hash,
      url,
      size: JSON.stringify(data).length
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
};

/**
 * Get file from IPFS via gateway
 */
export const getFromIPFS = async (hash: string): Promise<ArrayBuffer> => {
  try {
    const url = `${IPFS_GATEWAY}${hash}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.arrayBuffer();
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
    const text = new TextDecoder().decode(data);
    return JSON.parse(text);
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