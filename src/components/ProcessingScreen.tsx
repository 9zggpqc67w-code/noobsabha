import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, ShieldCheck, FileSearch, Sparkles } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
  applicantName: string;
}

const analysisSteps = [
  { id: 1, text: 'Extracting text and verifying document integrity...', duration: 800 },
  { id: 2, text: 'Cross-referencing university accreditation in German Anabin database...', duration: 1000 },
  { id: 3, text: 'Auditing degree equivalence & Bavarian formula GPA conversion...', duration: 900 },
  { id: 4, text: 'Checking German language and visa requirements for Germany...', duration: 800 },
  { id: 5, text: 'Synthesizing applicant profile & tailored next actions...', duration: 600 },
];

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  onComplete,
  applicantName,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Step progression based on progress percentage
    if (progress >= 95) {
      setCurrentStepIndex(4);
    } else if (progress >= 70) {
      setCurrentStepIndex(3);
    } else if (progress >= 45) {
      setCurrentStepIndex(2);
    } else if (progress >= 20) {
      setCurrentStepIndex(1);
    } else {
      setCurrentStepIndex(0);
    }

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-10">
      {/* Title & Spinner */}
      <div className="space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-blue-700 stroke-[2.2]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Analyzing your documents...
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Evaluating credentials for <span className="font-semibold text-slate-900">{applicantName || 'Applicant'}</span> according to German higher education and employment frameworks.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-left">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">Verification Engine</span>
          <span className="text-blue-700 tabular-nums">{progress}%</span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic step checklist */}
        <div className="space-y-2.5 pt-3">
          {analysisSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex || progress === 100;
            const isCurrent = index === currentStepIndex && progress < 100;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 text-xs transition-opacity duration-300 ${
                  isCompleted
                    ? 'text-slate-700 font-medium'
                    : isCurrent
                    ? 'text-blue-700 font-semibold'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>
                <span>{step.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual fast forward button for demo */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onComplete}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer transition-colors"
        >
          Skip animation and view result →
        </button>
      </div>
    </div>
  );
};
