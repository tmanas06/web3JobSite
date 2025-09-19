'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES, getTestnetTokenConfig, getYellowJobTokenConfig, getWeb3JobPlatformConfig, getFraudDetectionConfig, getUserProfileConfig } from '@/lib/web3';

interface Web3ContextType {
  // Connection state
  isConnected: boolean;
  address: string | undefined;
  chainId: number | undefined;
  
  // User roles
  isCompany: boolean;
  isDeveloper: boolean;
  companyId: number | null;
  developerId: number | null;
  
  // Contract data
  tokenBalance: bigint | null;
  testnetTokenBalance: bigint | null;
  stakedAmount: bigint | null;
  reputation: number | null;
  
  // Contract interactions
  registerCompany: (data: CompanyRegistrationData) => Promise<void>;
  registerDeveloper: (data: DeveloperRegistrationData) => Promise<void>;
  stakeTokens: (amount: string) => Promise<void>;
  postJob: (data: JobData) => Promise<void>;
  applyForJob: (jobId: number, data: ApplicationData) => Promise<void>;
  reportFraud: (data: FraudReportData) => Promise<void>;
  
  // Profile management
  createProfile: (data: ProfileData) => Promise<void>;
  updateProfile: (data: ProfileData) => Promise<void>;
  updateAvatar: (avatarHash: string) => Promise<void>;
  updateCover: (coverHash: string) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Utility functions
  connect: () => void;
  disconnect: () => void;
  refreshData: () => void;
}

interface CompanyRegistrationData {
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  verifiableSkills: string[];
}

interface DeveloperRegistrationData {
  name: string;
  email: string;
  github: string;
  portfolio: string;
  skills: string[];
  skillScores: number[];
}

interface JobData {
  title: string;
  description: string;
  requiredSkills: string[];
  skillWeights: number[];
  salaryMin: string;
  salaryMax: string;
  deadline: number;
  jobType: number;
  maxApplications: number;
}

interface ApplicationData {
  coverLetter: string;
  skillScores: number[];
  portfolioLinks: number[];
}

interface FraudReportData {
  reportedUser: string;
  reason: string;
  severity: number;
  evidence: string;
}

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatarHash: string;
  coverHash: string;
  socialLinks: string[];
  skills: string[];
  skillScores: number[];
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  
  const [isCompany, setIsCompany] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [developerId, setDeveloperId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read testnet token balance (for staking)
  const { data: testnetTokenBalance } = useReadContract({
    ...getTestnetTokenConfig(),
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read YJT token balance
  const { data: yjtTokenBalance } = useReadContract({
    ...getYellowJobTokenConfig(),
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read company ID if connected
  const { data: companyIdData } = useReadContract({
    ...getWeb3JobPlatformConfig(),
    functionName: 'companyAddressToId',
    args: address ? [address] : undefined,
  });

  // Read developer ID if connected
  const { data: developerIdData } = useReadContract({
    ...getWeb3JobPlatformConfig(),
    functionName: 'developerAddressToId',
    args: address ? [address] : undefined,
  });

  // Read company data if company
  const { data: companyData } = useReadContract({
    ...getWeb3JobPlatformConfig(),
    functionName: 'companies',
    args: companyIdData && companyIdData > 0 ? [companyIdData] : undefined,
  });

  // Read developer data if developer
  const { data: developerData } = useReadContract({
    ...getWeb3JobPlatformConfig(),
    functionName: 'developers',
    args: developerIdData && developerIdData > 0 ? [developerIdData] : undefined,
  });

  // Read reputation from fraud detection
  const { data: reputationData } = useReadContract({
    ...getFraudDetectionConfig(),
    functionName: 'calculateReputationScore',
    args: address ? [address] : undefined,
  });

  // Update state when contract data changes
  useEffect(() => {
    if (companyIdData && companyIdData > 0) {
      setIsCompany(true);
      setCompanyId(Number(companyIdData));
    } else {
      setIsCompany(false);
      setCompanyId(null);
    }

    if (developerIdData && developerIdData > 0) {
      setIsDeveloper(true);
      setDeveloperId(Number(developerIdData));
    } else {
      setIsDeveloper(false);
      setDeveloperId(null);
    }
  }, [companyIdData, developerIdData]);

  // Contract interaction functions
  const registerCompany = async (data: CompanyRegistrationData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getWeb3JobPlatformConfig(),
        functionName: 'registerCompany',
        args: [
          data.name,
          data.description,
          data.website,
          data.logoUrl,
          data.verifiableSkills,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register company');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerDeveloper = async (data: DeveloperRegistrationData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getWeb3JobPlatformConfig(),
        functionName: 'registerDeveloper',
        args: [
          data.name,
          data.email,
          data.github,
          data.portfolio,
          data.skills,
          data.skillScores,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register developer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const stakeTokens = async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First approve testnet tokens for staking
      await writeContractAsync({
        ...getTestnetTokenConfig(),
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.Web3JobPlatform, BigInt(amount)],
      });

      // Then stake tokens
      await writeContractAsync({
        ...getWeb3JobPlatformConfig(),
        functionName: 'stakeTokens',
        args: [BigInt(amount)],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stake tokens');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const postJob = async (data: JobData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getWeb3JobPlatformConfig(),
        functionName: 'postJob',
        args: [
          data.title,
          data.description,
          data.requiredSkills,
          data.skillWeights,
          BigInt(data.salaryMin),
          BigInt(data.salaryMax),
          BigInt(data.deadline),
          data.jobType,
          data.maxApplications,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const applyForJob = async (jobId: number, data: ApplicationData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getWeb3JobPlatformConfig(),
        functionName: 'applyForJob',
        args: [
          BigInt(jobId),
          data.coverLetter,
          data.skillScores,
          data.portfolioLinks,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply for job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reportFraud = async (data: FraudReportData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create signature (in a real app, this would be done with a proper signing library)
      const message = `${data.reportedUser}-${data.reason}-${data.severity}-${data.evidence}`;
      const signature = `0x${Buffer.from(message).toString('hex')}`; // Mock signature
      
      await writeContractAsync({
        ...getFraudDetectionConfig(),
        functionName: 'reportFraud',
        args: [
          data.reportedUser,
          data.reason,
          BigInt(data.severity),
          data.evidence,
          signature,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to report fraud');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] });
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const createProfile = async (data: ProfileData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getUserProfileConfig(),
        functionName: 'createProfile',
        args: [
          data.name,
          data.email,
          data.bio,
          data.avatarHash,
          data.coverHash,
          data.socialLinks,
          data.skills,
          data.skillScores,
          data.location,
          data.website,
          data.github,
          data.linkedin,
          data.twitter,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getUserProfileConfig(),
        functionName: 'updateProfile',
        args: [
          data.name,
          data.email,
          data.bio,
          data.avatarHash,
          data.coverHash,
          data.socialLinks,
          data.skills,
          data.skillScores,
          data.location,
          data.website,
          data.github,
          data.linkedin,
          data.twitter,
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvatar = async (avatarHash: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getUserProfileConfig(),
        functionName: 'updateAvatar',
        args: [avatarHash],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update avatar');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCover = async (coverHash: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    
    try {
      await writeContractAsync({
        ...getUserProfileConfig(),
        functionName: 'updateCover',
        args: [coverHash],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cover');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    // Force refresh of contract data
    window.location.reload();
  };

  const value: Web3ContextType = {
    // Connection state
    isConnected,
    address,
    chainId,
    
    // User roles
    isCompany,
    isDeveloper,
    companyId,
    developerId,
    
    // Contract data
    tokenBalance: yjtTokenBalance || null,
    testnetTokenBalance: testnetTokenBalance || null,
    stakedAmount: companyData ? companyData.stakedAmount : null,
    reputation: reputationData ? Number(reputationData) : null,
    
    // Contract interactions
    registerCompany,
    registerDeveloper,
    stakeTokens,
    postJob,
    applyForJob,
    reportFraud,
    
    // Profile management
    createProfile,
    updateProfile,
    updateAvatar,
    updateCover,
    
    // Loading states
    isLoading,
    error,
    
    // Utility functions
    connect: handleConnect,
    disconnect: handleDisconnect,
    refreshData,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
