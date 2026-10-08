import React from 'react';
import { ArrowRight, GraduationCap, Briefcase, FileCheck2, Cpu, ShieldCheck } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
  onSelectGoal?: (goal: 'study' | 'work') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onSelectGoal }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
          <span>Official German Admissions & Visa Guidance</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          AI Applicant Copilot
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-blue-700">
          Your journey to Germany, guided by AI.
        </p>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Simplifying admissions and work relocation to Germany. AI Applicant Copilot audits your documents, checks Anabin equivalence, identifies missing requirements, and prepares you for German universities and embassies.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <span>Start Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Anabin Database Aligned
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            Uni-Assist Standards Ready
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-600" />
            Automated Qualification Audit
          </span>
        </div>
      </div>

      {/* Pathways: Study in Germany vs Work in Germany */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Choose Your Pathway to Germany</h2>
          <p className="text-sm text-slate-600">
            Select what best matches your goal. We customize the document checklist and admission criteria for your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Study Pathway */}
          <div className="p-6 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Study in Germany</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For international students applying for Bachelor’s, Master’s, or PhD programs at public & private German universities.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Bavarian GPA calculation & ECTS transcript check
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  University degree recognition (H+ status on Anabin)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Language verification (IELTS / TestDaF / Goethe)
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                if (onSelectGoal) onSelectGoal('study');
                onStart();
              }}
              className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:border-blue-600 text-blue-700 font-medium rounded-md text-sm transition-colors cursor-pointer text-center"
            >
              Apply as Student
            </button>
          </div>

          {/* Work Pathway */}
          <div className="p-6 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Work in Germany</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For skilled professionals seeking the EU Blue Card, Opportunity Card (Chancenkarte), or German employment visa.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  German Opportunity Card points pre-assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Foreign qualification recognition (ZAB Statement)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Work experience & reference letters audit
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                if (onSelectGoal) onSelectGoal('work');
                onStart();
              }}
              className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:border-emerald-600 text-emerald-700 font-medium rounded-md text-sm transition-colors cursor-pointer text-center"
            >
              Apply as Professional
            </button>
          </div>
        </div>
      </div>

      {/* How It Works: The 4 Simple Steps */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">How the Application Copilot Works</h2>
          <p className="text-sm text-slate-600">
            A guided four-step pipeline designed specifically for international admissions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step 01</div>
            <h3 className="font-semibold text-slate-900">Applicant Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your background, chosen field, target institution, and whether you aim for higher education or skilled employment.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step 02</div>
            <h3 className="font-semibold text-slate-900">Document Upload</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your CV, degrees, semester marksheets, language certificates, and professional experience records.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step 03</div>
            <h3 className="font-semibold text-slate-900">AI Document Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The copilot analyzes document integrity, flags missing certificates, and converts credentials to German standards.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step 04</div>
            <h3 className="font-semibold text-slate-900">Qualification Check</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive your structured applicant profile and tailored next actions for your university or visa submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
