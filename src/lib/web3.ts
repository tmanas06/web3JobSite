import { createConfig, http } from 'wagmi';
import { yellowTestnet, localhost } from 'wagmi/chains';

// Yellow Network configuration
export const yellowNetwork = {
  id: 1234, // Mock Chain ID - replace with actual when available
  name: 'Yellow Network Testnet',
  network: 'yellow-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Yellow Token',
    symbol: 'YELLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.yellownetwork.org'], // Mock RPC - replace with actual
    },
    public: {
      http: ['https://testnet-rpc.yellownetwork.org'], // Mock RPC - replace with actual
    },
  },
  blockExplorers: {
    default: {
      name: 'Yellow Explorer',
      url: 'https://testnet-explorer.yellownetwork.org', // Mock explorer - replace with actual
    },
  },
  testnet: true,
};

// Contract addresses (deployed on localhost)
export const CONTRACT_ADDRESSES = {
  YellowJobToken: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Deployed on localhost
  FraudDetection: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Deployed on localhost
  Web3JobPlatform: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // Deployed on localhost
};

// Contract ABIs
export const YELLOW_JOB_TOKEN_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "stakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "unstakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const WEB3_JOB_PLATFORM_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_website", "type": "string"},
      {"internalType": "string", "name": "_logoUrl", "type": "string"},
      {"internalType": "string[]", "name": "_verifiableSkills", "type": "string[]"}
    ],
    "name": "registerCompany",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_email", "type": "string"},
      {"internalType": "string", "name": "_github", "type": "string"},
      {"internalType": "string", "name": "_portfolio", "type": "string"},
      {"internalType": "string[]", "name": "_skills", "type": "string[]"},
      {"internalType": "uint256[]", "name": "_skillScores", "type": "uint256[]"}
    ],
    "name": "registerDeveloper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "stakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string[]", "name": "_requiredSkills", "type": "string[]"},
      {"internalType": "uint256[]", "name": "_skillWeights", "type": "uint256[]"},
      {"internalType": "uint256", "name": "_salaryMin", "type": "uint256"},
      {"internalType": "uint256", "name": "_salaryMax", "type": "uint256"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"},
      {"internalType": "uint8", "name": "_jobType", "type": "uint8"},
      {"internalType": "uint256", "name": "_maxApplications", "type": "uint256"}
    ],
    "name": "postJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
      {"internalType": "string", "name": "_coverLetter", "type": "string"},
      {"internalType": "uint256[]", "name": "_skillScores", "type": "uint256[]"},
      {"internalType": "uint256[]", "name": "_portfolioLinks", "type": "uint256[]"}
    ],
    "name": "applyForJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "companyAddressToId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "developerAddressToId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "companies",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "wallet", "type": "address"},
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "website", "type": "string"},
      {"internalType": "string", "name": "logoUrl", "type": "string"},
      {"internalType": "uint256", "name": "reputation", "type": "uint256"},
      {"internalType": "uint256", "name": "stakedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "stakeTimestamp", "type": "uint256"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "bool", "name": "isActive", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "developers",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "wallet", "type": "address"},
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "email", "type": "string"},
      {"internalType": "string", "name": "github", "type": "string"},
      {"internalType": "string", "name": "portfolio", "type": "string"},
      {"internalType": "uint256", "name": "reputation", "type": "uint256"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "bool", "name": "isActive", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "jobs",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "uint256", "name": "companyId", "type": "uint256"},
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "salaryMin", "type": "uint256"},
      {"internalType": "uint256", "name": "salaryMax", "type": "uint256"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "uint8", "name": "jobType", "type": "uint8"},
      {"internalType": "uint256", "name": "maxApplications", "type": "uint256"},
      {"internalType": "uint256", "name": "applicationCount", "type": "uint256"},
      {"internalType": "uint256", "name": "stakedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const FRAUD_DETECTION_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_reportedUser", "type": "address"},
      {"internalType": "string", "name": "_reason", "type": "string"},
      {"internalType": "uint256", "name": "_severity", "type": "uint256"},
      {"internalType": "string", "name": "_evidence", "type": "string"},
      {"internalType": "bytes", "name": "_signature", "type": "bytes"}
    ],
    "name": "reportFraud",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_reportId", "type": "uint256"},
      {"internalType": "bool", "name": "_isValid", "type": "bool"}
    ],
    "name": "resolveFraudReport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "calculateReputationScore",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Wagmi configuration - moved to client-side component

// Utility functions
export const formatTokenAmount = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10 ** decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');
  
  if (trimmedRemainder === '') {
    return quotient.toString();
  }
  
  return `${quotient}.${trimmedRemainder}`;
};

export const parseTokenAmount = (amount: string, decimals: number = 18): bigint => {
  const [integerPart, decimalPart = ''] = amount.split('.');
  const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integerPart + paddedDecimal);
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTimestamp = (timestamp: bigint): string => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const getJobTypeLabel = (jobType: number): string => {
  const types = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'];
  return types[jobType] || 'Unknown';
};

export const getJobStatusLabel = (status: number): string => {
  const statuses = ['Active', 'Paused', 'Closed', 'Completed'];
  return statuses[status] || 'Unknown';
};

export const getApplicationStatusLabel = (status: number): string => {
  const statuses = ['Pending', 'Under Review', 'Accepted', 'Rejected', 'Hired', 'Completed'];
  return statuses[status] || 'Unknown';
};

// Contract interaction helpers
export const getContractConfig = (address: string, abi: any[]) => ({
  address: address as `0x${string}`,
  abi,
});

export const getYellowJobTokenConfig = () => getContractConfig(
  CONTRACT_ADDRESSES.YellowJobToken,
  YELLOW_JOB_TOKEN_ABI
);

export const getWeb3JobPlatformConfig = () => getContractConfig(
  CONTRACT_ADDRESSES.Web3JobPlatform,
  WEB3_JOB_PLATFORM_ABI
);

export const getFraudDetectionConfig = () => getContractConfig(
  CONTRACT_ADDRESSES.FraudDetection,
  FRAUD_DETECTION_ABI
);
