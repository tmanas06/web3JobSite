'use client';

import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';

interface CompanyFormData {
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  verifiableSkills: string[];
}

const CompanyRegistration: React.FC = () => {
  const { registerCompany, stakeTokens, isLoading, error, isCompany } = useWeb3();
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    description: '',
    website: '',
    logoUrl: '',
    verifiableSkills: [''],
  });

  const [stakeAmount, setStakeAmount] = useState('1000');
  const [showStakeSection, setShowStakeSection] = useState(false);

  const commonVerifiableSkills = [
    'Solidity', 'Smart Contracts', 'DeFi', 'NFT', 'Web3', 'Blockchain',
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Rust',
    'Go', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'
  ];

  const handleInputChange = (field: keyof CompanyFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.verifiableSkills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      verifiableSkills: newSkills,
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      verifiableSkills: [...prev.verifiableSkills, ''],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      verifiableSkills: prev.verifiableSkills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCompany) {
      alert('You are already registered as a company');
      return;
    }

    try {
      // First register the company
      await registerCompany({
        name: formData.name,
        description: formData.description,
        website: formData.website,
        logoUrl: formData.logoUrl,
        verifiableSkills: formData.verifiableSkills.filter(skill => skill.trim() !== ''),
      });

      setShowStakeSection(true);
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  const handleStake = async () => {
    try {
      await stakeTokens(stakeAmount);
      alert('Company registered and staked successfully! You can now post jobs.');
    } catch (err) {
      console.error('Staking failed:', err);
      alert('Staking failed. Please try again.');
    }
  };

  if (isCompany) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Already Registered</h2>
          <p className="text-gray-300 mb-6">
            You are already registered as a company. You can now post jobs and hire developers.
          </p>
          <button className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Company Registration</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Register your company to access verified Web3 talent. Post jobs, hire developers, 
          and build your team with blockchain-verified credentials.
        </p>
      </div>

      <div className="card p-8">
        {!showStakeSection ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input w-full"
                  placeholder="Your Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website *
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="input w-full"
                  placeholder="https://yourcompany.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input w-full h-32 resize-none"
                placeholder="Describe your company, mission, and what you do..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                className="input w-full"
                placeholder="https://yourcompany.com/logo.png"
              />
              <p className="text-xs text-gray-400 mt-1">
                Optional: URL to your company logo image
              </p>
            </div>

            {/* Verifiable Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills You Can Verify *
              </label>
              <p className="text-xs text-gray-400 mb-4">
                Select skills that your company can verify and endorse for developers
              </p>
              
              {formData.verifiableSkills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="input w-full"
                      placeholder="e.g., Solidity Development"
                      required
                      list={`verifiable-skills-${index}`}
                    />
                    <datalist id={`verifiable-skills-${index}`}>
                      {commonVerifiableSkills.map((commonSkill) => (
                        <option key={commonSkill} value={commonSkill} />
                      ))}
                    </datalist>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="btn-ghost p-2 text-red-400 hover:text-red-300"
                    disabled={formData.verifiableSkills.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addSkill}
                className="btn-secondary text-sm"
              >
                + Add Another Skill
              </button>
            </div>

            {/* Benefits Section */}
            <div className="bg-purple-400/10 border border-purple-400/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Company Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Post jobs with staking protection</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Access verified Web3 developers</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Verify and endorse developer skills</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Fraud protection and dispute resolution</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Build company reputation on-chain</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">✓</span>
                  <span>Access to exclusive talent pool</span>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="btn-primary px-8 py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Company'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">Company Registered!</h2>
              <p className="text-gray-300">
                Your company has been successfully registered. Now you need to stake YJT tokens to start posting jobs.
              </p>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Staking Requirements</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Minimum stake: 1,000 YJT tokens</p>
                <p>• Staking protects against fraud and ensures commitment</p>
                <p>• You can withdraw stakes after 30 days</p>
                <p>• Staked amount determines your posting limits</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stake Amount (YJT)
              </label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="input w-48 mx-auto"
                min="1000"
                placeholder="1000"
              />
              <p className="text-xs text-gray-400 mt-1">
                Minimum: 1,000 YJT
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowStakeSection(false)}
                className="btn-ghost"
              >
                Back to Registration
              </button>
              <button
                onClick={handleStake}
                className="btn-primary px-8 py-3"
                disabled={isLoading || !stakeAmount || parseInt(stakeAmount) < 1000}
              >
                {isLoading ? 'Staking...' : 'Stake Tokens & Complete Registration'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Terms and Privacy */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          By registering, you agree to our{' '}
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default CompanyRegistration;
