import React, { useState } from 'react';
import { ApplicantDetails, ApplicantGoal } from '../types';
import { suggestedFields, suggestedUniversities, suggestedCompanies } from '../data/mockData';
import { GraduationCap, Briefcase, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface ApplicantDetailsScreenProps {
  details: ApplicantDetails;
  onUpdate: (details: ApplicantDetails) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ApplicantDetailsScreen: React.FC<ApplicantDetailsScreenProps> = ({
  details,
  onUpdate,
  onContinue,
  onBack,
}) => {
  const [formData, setFormData] = useState<ApplicantDetails>(details);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleGoalChange = (newGoal: ApplicantGoal) => {
    // If switching goal, set a suitable default target if currently default
    const updated = {
      ...formData,
      goal: newGoal,
      targetInstitution:
        newGoal === 'study' ? suggestedUniversities[0] : suggestedCompanies[0],
    };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleChange = (field: keyof ApplicantDetails, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.intendedField.trim()) {
      newErrors.intendedField = 'Please specify your intended field';
    }
    if (!formData.targetInstitution.trim()) {
      newErrors.targetInstitution =
        formData.goal === 'study'
          ? 'Please enter your target university'
          : 'Please enter your target company';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate(formData);
    onContinue();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <span>Step 1 of 3</span>
          <span aria-hidden="true">·</span>
          <span>Profile Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Applicant Details
        </h1>
        <p className="text-sm text-slate-600">
          Tell us about yourself and your destination goal in Germany. This helps calibrate our document evaluation engine.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Goal Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">
            Primary Goal in Germany <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleGoalChange('study')}
              className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-3 ${
                formData.goal === 'study'
                  ? 'border-blue-700 bg-blue-50/50 ring-1 ring-blue-700'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  formData.goal === 'study' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  Study
                  {formData.goal === 'study' && <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />}
                </div>
                <div className="text-xs text-slate-500">
                  Bachelor, Master, or PhD Degree
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoalChange('work')}
              className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-3 ${
                formData.goal === 'work'
                  ? 'border-blue-700 bg-blue-50/50 ring-1 ring-blue-700'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  formData.goal === 'work' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  Work
                  {formData.goal === 'work' && <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />}
                </div>
                <div className="text-xs text-slate-500">
                  Blue Card, Opportunity Card, Job
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Full Name & Email */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Rivera"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors ${
                errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. alex.rivera@example.com"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors ${
                errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Intended Field */}
        <div className="space-y-2">
          <label htmlFor="intendedField" className="block text-sm font-semibold text-slate-900">
            Intended Field / Specialization <span className="text-red-500">*</span>
          </label>
          <input
            id="intendedField"
            type="text"
            value={formData.intendedField}
            onChange={(e) => handleChange('intendedField', e.target.value)}
            placeholder="e.g. Computer Science, Mechanical Engineering, Data Analytics"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors ${
              errors.intendedField ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.intendedField && (
            <p className="text-xs text-red-600">{errors.intendedField}</p>
          )}

          {/* Quick Field Suggestions */}
          <div className="space-y-1 pt-1">
            <span className="text-xs text-slate-500">Popular fields:</span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedFields.slice(0, 4).map((field) => (
                <button
                  type="button"
                  key={field}
                  onClick={() => handleChange('intendedField', field)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer text-left"
                >
                  {field}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target University / Company */}
        <div className="space-y-2">
          <label htmlFor="targetInstitution" className="block text-sm font-semibold text-slate-900">
            {formData.goal === 'study' ? 'Target University' : 'Target Company'} <span className="text-red-500">*</span>
          </label>
          <input
            id="targetInstitution"
            type="text"
            value={formData.targetInstitution}
            onChange={(e) => handleChange('targetInstitution', e.target.value)}
            placeholder={
              formData.goal === 'study'
                ? 'e.g. Technical University of Munich (TUM)'
                : 'e.g. SAP SE, Siemens AG'
            }
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors ${
              errors.targetInstitution ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.targetInstitution && (
            <p className="text-xs text-red-600">{errors.targetInstitution}</p>
          )}

          {/* Quick Institution Suggestions */}
          <div className="space-y-1 pt-1">
            <span className="text-xs text-slate-500">
              {formData.goal === 'study' ? 'Popular universities:' : 'Popular employers:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(formData.goal === 'study' ? suggestedUniversities : suggestedCompanies)
                .slice(0, 3)
                .map((inst) => (
                  <button
                    type="button"
                    key={inst}
                    onClick={() => handleChange('targetInstitution', inst)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer text-left"
                  >
                    {inst}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Target Country: Fixed to Germany */}
        <div className="space-y-1.5">
          <label htmlFor="country" className="block text-sm font-semibold text-slate-900">
            Destination Country
          </label>
          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800">
            <span className="text-base" aria-label="Germany">🇩🇪</span>
            <span className="font-medium">Germany</span>
            <span className="text-xs text-slate-500 ml-auto">(Configured for German Higher Education & Visa Standards)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Continue to Documents</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
