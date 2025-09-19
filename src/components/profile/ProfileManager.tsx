'use client';

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { uploadToIPFS, getIPFSUrl } from '@/lib/ipfs';
import { getUserProfileConfig } from '@/lib/web3';
import { useReadContract, useWriteContract } from 'wagmi';
import { 
  UserIcon, 
  PhotoIcon, 
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

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

export default function ProfileManager() {
  const { address, isConnected } = useWeb3();
  const { writeContractAsync } = useWriteContract();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    bio: '',
    avatarHash: '',
    coverHash: '',
    socialLinks: [''],
    skills: [''],
    skillScores: [0],
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: ''
  });

  // Read profile data from blockchain
  const { data: hasProfile } = useReadContract({
    ...getUserProfileConfig(),
    functionName: 'hasProfile',
    args: address ? [address] : undefined,
  });

  const { data: profile } = useReadContract({
    ...getUserProfileConfig(),
    functionName: 'getProfile',
    args: address && hasProfile ? [address] : undefined,
  });

  // Update profile data when blockchain data changes
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        avatarHash: profile.avatarHash || '',
        coverHash: profile.coverHash || '',
        socialLinks: profile.socialLinks || [''],
        skills: profile.skills || [''],
        skillScores: profile.skillScores || [0],
        location: profile.location || '',
        website: profile.website || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof ProfileData, value: string | string[] | number[]) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'socialLinks' | 'skills' | 'skillScores', index: number, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'socialLinks' | 'skills' | 'skillScores') => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...prev[field], field === 'skillScores' ? 0 : '']
    }));
  };

  const removeArrayItem = (field: 'socialLinks' | 'skills' | 'skillScores', index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (file: File, type: 'avatar' | 'cover') => {
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await uploadToIPFS(file);
      const field = type === 'avatar' ? 'avatarHash' : 'coverHash';
      handleInputChange(field, result.hash);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!address) return;

    try {
      setIsUploading(true);

      if (hasProfile) {
        // Update existing profile
        await writeContractAsync({
          ...getUserProfileConfig(),
          functionName: 'updateProfile',
          args: [
            profileData.name,
            profileData.email,
            profileData.bio,
            profileData.avatarHash,
            profileData.coverHash,
            profileData.socialLinks.filter(link => link.trim() !== ''),
            profileData.skills.filter(skill => skill.trim() !== ''),
            profileData.skillScores.slice(0, profileData.skills.filter(skill => skill.trim() !== '').length),
            profileData.location,
            profileData.website,
            profileData.github,
            profileData.linkedin,
            profileData.twitter
          ],
        });
      } else {
        // Create new profile
        await writeContractAsync({
          ...getUserProfileConfig(),
          functionName: 'createProfile',
          args: [
            profileData.name,
            profileData.email,
            profileData.bio,
            profileData.avatarHash,
            profileData.coverHash,
            profileData.socialLinks.filter(link => link.trim() !== ''),
            profileData.skills.filter(skill => skill.trim() !== ''),
            profileData.skillScores.slice(0, profileData.skills.filter(skill => skill.trim() !== '').length),
            profileData.location,
            profileData.website,
            profileData.github,
            profileData.linkedin,
            profileData.twitter
          ],
        });
      }

      setIsEditing(false);
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600">Please connect your wallet to view and manage your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {profileData.coverHash ? (
            <img
              src={getIPFSUrl(profileData.coverHash)}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PhotoIcon className="h-16 w-16 text-white/50" />
            </div>
          )}
          
          {isEditing && (
            <div className="absolute top-4 right-4">
              <label className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-white/20 hover:bg-white/30 cursor-pointer">
                <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                Upload Cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'cover')}
                />
              </label>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-6 -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {profileData.avatarHash ? (
                  <img
                    src={getIPFSUrl(profileData.avatarHash)}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                  <PencilIcon className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')}
                  />
                </label>
              )}
            </div>

            <div className="flex-1 pt-16">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.name || 'No Name'}
                  </h1>
                  <p className="text-gray-600">{profileData.email}</p>
                  <p className="text-gray-500">{profileData.location}</p>
                </div>
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isUploading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckIcon className="h-4 w-4 mr-2" />
                        {isUploading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input
                  type="url"
                  value={profileData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  value={profileData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="url"
                  value={profileData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="space-y-4">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayInputChange('skills', index, e.target.value)}
                    disabled={!isEditing}
                    placeholder="Skill name"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  <input
                    type="number"
                    value={profileData.skillScores[index] || 0}
                    onChange={(e) => handleArrayInputChange('skillScores', index, parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="Score (0-100)"
                    min="0"
                    max="100"
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  {isEditing && (
                    <button
                      onClick={() => removeArrayItem('skills', index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  onClick={() => addArrayItem('skills')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Skill
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
