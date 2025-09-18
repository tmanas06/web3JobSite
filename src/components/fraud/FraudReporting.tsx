'use client';

import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';

interface FraudReportData {
  reportedUser: string;
  reason: string;
  severity: number;
  evidence: string;
}

const FraudReporting: React.FC = () => {
  const { reportFraud, isLoading, error } = useWeb3();
  const [formData, setFormData] = useState<FraudReportData>({
    reportedUser: '',
    reason: '',
    severity: 1,
    evidence: '',
  });

  const fraudReasons = [
    'Fake Portfolio/Projects',
    'Plagiarized Code',
    'False Identity',
    'Payment Fraud',
    'Job Application Spam',
    'Inappropriate Behavior',
    'Contract Violation',
    'Misleading Information',
    'Other'
  ];

  const severityLevels = [
    { value: 1, label: 'Low - Minor Issue', description: 'First offense or minor violation' },
    { value: 2, label: 'Medium - Moderate Issue', description: 'Repeated violations or moderate impact' },
    { value: 3, label: 'High - Serious Issue', description: 'Significant fraud or major impact' },
    { value: 4, label: 'Critical - Severe Issue', description: 'Major fraud with financial impact' },
    { value: 5, label: 'Extreme - Criminal Activity', description: 'Illegal activities or severe fraud' }
  ];

  const handleInputChange = (field: keyof FraudReportData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reportedUser.trim()) {
      alert('Please enter the address of the user you want to report');
      return;
    }

    if (!formData.reason.trim()) {
      alert('Please select a reason for reporting');
      return;
    }

    if (!formData.evidence.trim()) {
      alert('Please provide evidence for your report');
      return;
    }

    try {
      await reportFraud({
        reportedUser: formData.reportedUser,
        reason: formData.reason,
        severity: formData.severity,
        evidence: formData.evidence,
      });

      alert('Fraud report submitted successfully. Our team will review it within 24 hours.');
      
      // Reset form
      setFormData({
        reportedUser: '',
        reason: '',
        severity: 1,
        evidence: '',
      });
    } catch (err) {
      console.error('Failed to submit fraud report:', err);
      alert('Failed to submit fraud report. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Report Fraud</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Help maintain the integrity of our platform by reporting suspicious activities, 
          fake profiles, or fraudulent behavior. All reports are reviewed by our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Submit Fraud Report</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reported User */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User Address to Report *
                </label>
                <input
                  type="text"
                  value={formData.reportedUser}
                  onChange={(e) => handleInputChange('reportedUser', e.target.value)}
                  className="input w-full"
                  placeholder="0x..."
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter the wallet address of the user you want to report
                </p>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for Reporting *
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="input w-full"
                  required
                >
                  <option value="">Select a reason...</option>
                  {fraudReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Severity Level *
                </label>
                <div className="space-y-2">
                  {severityLevels.map((level) => (
                    <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value={level.value}
                        checked={formData.severity === level.value}
                        onChange={(e) => handleInputChange('severity', parseInt(e.target.value))}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{level.label}</div>
                        <div className="text-xs text-gray-400">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Evidence */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Evidence/Description *
                </label>
                <textarea
                  value={formData.evidence}
                  onChange={(e) => handleInputChange('evidence', e.target.value)}
                  className="input w-full h-32 resize-none"
                  placeholder="Provide detailed evidence, links, screenshots, or description of the fraudulent activity..."
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Be as specific as possible. Include links, transaction hashes, or other evidence.
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          {/* Report Process */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report Process</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Submit your report with evidence</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Our team reviews within 24 hours</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Investigation and verification</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Action taken if fraud is confirmed</span>
              </div>
            </div>
          </div>

          {/* What We Investigate */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">What We Investigate</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>Fake or stolen portfolios</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>Plagiarized code or projects</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>False identity or credentials</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>Payment fraud or disputes</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>Spam or inappropriate behavior</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-400">•</span>
                <span>Contract violations</span>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Consequences</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">•</span>
                <span>Reputation score reduction</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">•</span>
                <span>Temporary platform restrictions</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">•</span>
                <span>Account suspension or ban</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">•</span>
                <span>Legal action for severe cases</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
            <p className="text-sm text-gray-300 mb-3">
              If you have questions about the reporting process or need immediate assistance:
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:fraud@web3jobs.network" className="text-cyan-400 hover:text-cyan-300">
                fraud@web3jobs.network
              </a>
              <br />
              <a href="#" className="text-cyan-400 hover:text-cyan-300">
                Live Chat Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudReporting;
