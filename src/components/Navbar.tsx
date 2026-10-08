import React from 'react';
import { ApplicationStep } from '../types';

interface NavbarProps {
  currentStep: ApplicationStep;
  onNavigate: (step: ApplicationStep) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors cursor-pointer text-left"
        >
          AI Applicant Copilot
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${
              currentStep === 'home' ? 'text-blue-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('details')}
            className={`transition-colors cursor-pointer ${
              currentStep === 'details' ? 'text-blue-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Applicant Details
          </button>
          <button
            onClick={() => onNavigate('documents')}
            className={`transition-colors cursor-pointer ${
              currentStep === 'documents' ? 'text-blue-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Upload Documents
          </button>
          <button
            onClick={() => onNavigate('processing')}
            className={`transition-colors cursor-pointer ${
              currentStep === 'processing' || currentStep === 'profile-preview'
                ? 'text-blue-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            AI Processing
          </button>
        </nav>

        {/* Zone 3: Primary action / Destination target */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>Destination: Germany</span>
          </div>
        </div>
      </div>
    </header>
  );
};
