'use client';

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { formatTokenAmount, formatTimestamp, getJobTypeLabel, getJobStatusLabel } from '@/lib/web3';

interface Job {
  id: number;
  title: string;
  description: string;
  companyId: number;
  salaryMin: bigint;
  salaryMax: bigint;
  deadline: bigint;
  status: number;
  jobType: number;
  maxApplications: number;
  applicationCount: number;
  createdAt: bigint;
}

interface JobFormData {
  title: string;
  description: string;
  requiredSkills: string[];
  skillWeights: number[];
  salaryMin: string;
  salaryMax: string;
  deadline: string;
  jobType: number;
  maxApplications: number;
}

const JobManagement: React.FC = () => {
  const { isCompany, postJob, isLoading, error } = useWeb3();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: '',
    description: '',
    requiredSkills: [''],
    skillWeights: [80],
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    jobType: 0,
    maxApplications: 10,
  });

  const jobTypes = [
    { value: 0, label: 'Full Time' },
    { value: 1, label: 'Part Time' },
    { value: 2, label: 'Contract' },
    { value: 3, label: 'Internship' },
    { value: 4, label: 'Freelance' },
  ];

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setJobFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...jobFormData.requiredSkills];
    newSkills[index] = value;
    setJobFormData(prev => ({
      ...prev,
      requiredSkills: newSkills,
    }));
  };

  const handleSkillWeightChange = (index: number, value: number) => {
    const newWeights = [...jobFormData.skillWeights];
    newWeights[index] = value;
    setJobFormData(prev => ({
      ...prev,
      skillWeights: newWeights,
    }));
  };

  const addSkill = () => {
    setJobFormData(prev => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, ''],
      skillWeights: [...prev.skillWeights, 80],
    }));
  };

  const removeSkill = (index: number) => {
    setJobFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
      skillWeights: prev.skillWeights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCompany) {
      alert('Only companies can post jobs');
      return;
    }

    try {
      const deadlineTimestamp = Math.floor(new Date(jobFormData.deadline).getTime() / 1000);
      
      await postJob({
        title: jobFormData.title,
        description: jobFormData.description,
        requiredSkills: jobFormData.requiredSkills.filter(skill => skill.trim() !== ''),
        skillWeights: jobFormData.skillWeights,
        salaryMin: jobFormData.salaryMin,
        salaryMax: jobFormData.salaryMax,
        deadline: deadlineTimestamp,
        jobType: jobFormData.jobType,
        maxApplications: jobFormData.maxApplications,
      });

      // Reset form
      setJobFormData({
        title: '',
        description: '',
        requiredSkills: [''],
        skillWeights: [80],
        salaryMin: '',
        salaryMax: '',
        deadline: '',
        jobType: 0,
        maxApplications: 10,
      });
      setShowJobForm(false);
      
      alert('Job posted successfully!');
    } catch (err) {
      console.error('Failed to post job:', err);
      alert('Failed to post job. Please try again.');
    }
  };

  if (!isCompany) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Company Access Required</h2>
          <p className="text-gray-300 mb-6">
            You need to register as a company to manage jobs. Please register your company first.
          </p>
          <button className="btn-primary">
            Register Company
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Job Management</h1>
          <p className="text-gray-300">Manage your job postings and applications</p>
        </div>
        <button
          onClick={() => setShowJobForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <span>+</span>
          <span>Post New Job</span>
        </button>
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-cyan-400/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Post New Job</h2>
              <button
                onClick={() => setShowJobForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobFormData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input w-full"
                    placeholder="e.g., Senior Solidity Developer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Type *
                  </label>
                  <select
                    value={jobFormData.jobType}
                    onChange={(e) => handleInputChange('jobType', parseInt(e.target.value))}
                    className="input w-full"
                    required
                  >
                    {jobTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={jobFormData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input w-full h-32 resize-none"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  required
                />
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Salary (YJT) *
                  </label>
                  <input
                    type="number"
                    value={jobFormData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    className="input w-full"
                    placeholder="1000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Salary (YJT) *
                  </label>
                  <input
                    type="number"
                    value={jobFormData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    className="input w-full"
                    placeholder="2000"
                    required
                  />
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Required Skills *
                </label>
                {jobFormData.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="input flex-1"
                      placeholder="e.g., Solidity"
                      required
                    />
                    <input
                      type="number"
                      value={jobFormData.skillWeights[index]}
                      onChange={(e) => handleSkillWeightChange(index, parseInt(e.target.value))}
                      className="input w-20"
                      min="1"
                      max="100"
                      placeholder="Weight"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="btn-ghost p-2 text-red-400 hover:text-red-300"
                      disabled={jobFormData.requiredSkills.length === 1}
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
                  + Add Skill
                </button>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Application Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    value={jobFormData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Applications *
                  </label>
                  <input
                    type="number"
                    value={jobFormData.maxApplications}
                    onChange={(e) => handleInputChange('maxApplications', parseInt(e.target.value))}
                    className="input w-full"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-6">
        {jobs.length === 0 ? (
          <div className="card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-300 mb-4">
              Start by posting your first job to attract talented developers.
            </p>
            <button
              onClick={() => setShowJobForm(true)}
              className="btn-primary"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span>{getJobTypeLabel(job.jobType)}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === 0 ? 'bg-green-500/20 text-green-400' :
                      job.status === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {getJobStatusLabel(job.status)}
                    </span>
                    <span>•</span>
                    <span>{job.applicationCount}/{job.maxApplications} applications</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-cyan-400">
                    {formatTokenAmount(job.salaryMin)} - {formatTokenAmount(job.salaryMax)} YJT
                  </div>
                  <div className="text-sm text-gray-400">
                    Posted {formatTimestamp(job.createdAt)}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Deadline: {formatTimestamp(job.deadline)}
                </div>
                <div className="flex space-x-2">
                  <button className="btn-ghost text-sm">View Applications</button>
                  <button className="btn-secondary text-sm">Edit</button>
                  <button className="btn-ghost text-sm text-red-400 hover:text-red-300">
                    Close Job
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobManagement;
