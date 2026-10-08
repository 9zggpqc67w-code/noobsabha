import React from 'react';
import { ApplicationStep } from '../types';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: ApplicationStep;
  onNavigate: (step: ApplicationStep) => void;
}

const steps: { key: ApplicationStep; label: string; number: number }[] = [
  { key: 'details', label: 'Applicant Details', number: 1 },
  { key: 'documents', label: 'Upload Documents', number: 2 },
  { key: 'processing', label: 'AI Processing', number: 3 },
];

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, onNavigate }) => {
  if (currentStep === 'home') return null;

  const getStepIndex = (step: ApplicationStep) => {
    switch (step) {
      case 'details':
        return 1;
      case 'documents':
        return 2;
      case 'processing':
      case 'profile-preview':
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="bg-white border-b border-slate-200 py-3.5 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = currentIndex > step.number;
          const isCurrent = currentIndex === step.number;
          const isClickable = step.number <= currentIndex;

          return (
            <React.Fragment key={step.key}>
              <button
                onClick={() => isClickable && onNavigate(step.key)}
                disabled={!isClickable}
                className={`flex items-center gap-2.5 text-left transition-colors ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-blue-700 text-white'
                      : isCurrent
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-700'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
                </span>
                <span
                  className={`text-sm hidden sm:inline ${
                    isCurrent
                      ? 'font-semibold text-slate-900'
                      : isCompleted
                      ? 'font-medium text-slate-700'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 sm:mx-6 transition-colors ${
                    currentIndex > step.number ? 'bg-blue-700' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
