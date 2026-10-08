/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ApplicationStep, ApplicantDetails, DocumentItem } from './types';
import { initialApplicantDetails, initialDocuments } from './data/mockData';
import { Navbar } from './components/Navbar';
import { StepProgressBar } from './components/StepProgressBar';
import { HomeScreen } from './components/HomeScreen';
import { ApplicantDetailsScreen } from './components/ApplicantDetailsScreen';
import { DocumentUploadScreen } from './components/DocumentUploadScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { NextActionPreviewScreen } from './components/NextActionPreviewScreen';

export default function App() {
  // Navigation State
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('home');

  // Application State (initialized from separate mock data file)
  const [applicantDetails, setApplicantDetails] = useState<ApplicantDetails>(initialApplicantDetails);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);

  // Navigation Handlers
  const handleStart = () => {
    setCurrentStep('details');
  };

  const handleSelectGoal = (goal: 'study' | 'work') => {
    setApplicantDetails((prev) => ({
      ...prev,
      goal,
      targetInstitution:
        goal === 'study'
          ? 'Technical University of Munich (TUM)'
          : 'SAP SE',
    }));
  };

  const handleContinueToDocuments = () => {
    setCurrentStep('documents');
  };

  const handleContinueToProcessing = () => {
    setCurrentStep('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentStep('profile-preview');
  };

  const handleRestart = () => {
    setApplicantDetails(initialApplicantDetails);
    setDocuments(initialDocuments);
    setCurrentStep('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <Navbar currentStep={currentStep} onNavigate={setCurrentStep} />

      {/* Step Progress Tracker */}
      <StepProgressBar currentStep={currentStep} onNavigate={setCurrentStep} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentStep === 'home' && (
          <HomeScreen
            onStart={handleStart}
            onSelectGoal={handleSelectGoal}
          />
        )}

        {currentStep === 'details' && (
          <ApplicantDetailsScreen
            details={applicantDetails}
            onUpdate={setApplicantDetails}
            onContinue={handleContinueToDocuments}
            onBack={() => setCurrentStep('home')}
          />
        )}

        {currentStep === 'documents' && (
          <DocumentUploadScreen
            documents={documents}
            onUpdateDocuments={setDocuments}
            onContinue={handleContinueToProcessing}
            onBack={() => setCurrentStep('details')}
          />
        )}

        {currentStep === 'processing' && (
          <ProcessingScreen
            applicantName={applicantDetails.fullName}
            onComplete={handleProcessingComplete}
          />
        )}

        {currentStep === 'profile-preview' && (
          <NextActionPreviewScreen
            details={applicantDetails}
            documents={documents}
            onRestart={handleRestart}
            onEditDetails={() => setCurrentStep('details')}
            onEditDocuments={() => setCurrentStep('documents')}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">AI Applicant Copilot</span>
            <span aria-hidden="true">·</span>
            <span>Study & Work in Germany Pathway</span>
          </div>
          <div>
            Built for Hackathon · Aligned with German Anabin & Uni-Assist standards
          </div>
        </div>
      </footer>
    </div>
  );
}
