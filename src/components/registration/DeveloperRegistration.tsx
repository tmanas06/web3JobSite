'use client';

import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';

interface DeveloperFormData {
  name: string;
  email: string;
  github: string;
  portfolio: string;
  skills: string[];
  skillScores: number[];
}

const DeveloperRegistration: React.FC = () => {
  const { registerDeveloper, isLoading, error, isDeveloper } = useWeb3();
  const [formData, setFormData] = useState<DeveloperFormData>({
    name: '',
    email: '',
    github: '',
    portfolio: '',
    skills: [''],
    skillScores: [80],
  });

  const commonSkills = [
    'Solidity', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Rust', 'Go', 'Web3.js', 'Ethers.js', 'Hardhat', 'Truffle',
    'Next.js', 'Vue.js', 'Angular', 'Express', 'FastAPI', 'Django'
  ];

  const handleInputChange = (field: keyof DeveloperFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleSkillScoreChange = (index: number, value: number) => {
    const newScores = [...formData.skillScores];
    newScores[index] = value;
    setFormData(prev => ({
      ...prev,
      skillScores: newScores,
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, ''],
      skillScores: [...prev.skillScores, 80],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
      skillScores: prev.skillScores.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDeveloper) {
      alert('You are already registered as a developer');
      return;
    }

    try {
      await registerDeveloper({
        name: formData.name,
        email: formData.email,
        github: formData.github,
        portfolio: formData.portfolio,
        skills: formData.skills.filter(skill => skill.trim() !== ''),
        skillScores: formData.skillScores,
      });

      alert('Developer registration successful! You can now apply for jobs.');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  if (isDeveloper) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Already Registered</h2>
          <p className="text-gray-300 mb-6">
            You are already registered as a developer. You can now apply for jobs and build your reputation.
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
        <h1 className="text-3xl font-bold text-white mb-4">Developer Registration</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Join the Web3 job network and showcase your skills to top companies. 
          Build your reputation through verified work and community endorsements.
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input w-full"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input w-full"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Profile *
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                className="input w-full"
                placeholder="https://github.com/username"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Your GitHub profile helps verify your coding skills
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio Website
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                className="input w-full"
                placeholder="https://yourportfolio.com"
              />
              <p className="text-xs text-gray-400 mt-1">
                Showcase your work and projects
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technical Skills *
            </label>
            <p className="text-xs text-gray-400 mb-4">
              Add your skills and rate your proficiency level (1-100)
            </p>
            
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="input w-full"
                    placeholder="e.g., Solidity"
                    required
                    list={`skills-${index}`}
                  />
                  <datalist id={`skills-${index}`}>
                    {commonSkills.map((commonSkill) => (
                      <option key={commonSkill} value={commonSkill} />
                    ))}
                  </datalist>
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={formData.skillScores[index]}
                    onChange={(e) => handleSkillScoreChange(index, parseInt(e.target.value))}
                    className="input w-full text-center"
                    min="1"
                    max="100"
                    placeholder="Score"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="btn-ghost p-2 text-red-400 hover:text-red-300"
                  disabled={formData.skills.length === 1}
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
          <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Benefits of Registration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Apply to verified company job postings</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Build blockchain-verified reputation</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Receive skill endorsements from companies</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Access to exclusive Web3 opportunities</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Fraud protection and dispute resolution</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>Earn YJT tokens for completed work</span>
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
              {isLoading ? 'Registering...' : 'Register as Developer'}
            </button>
          </div>
        </form>
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

export default DeveloperRegistration;
