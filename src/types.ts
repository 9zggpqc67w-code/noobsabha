/**
 * AI Applicant Copilot - Type Definitions
 */

export type ApplicantGoal = 'study' | 'work';

export interface ApplicantDetails {
  fullName: string;
  email: string;
  goal: ApplicantGoal;
  intendedField: string;
  targetInstitution: string;
  country: string; // Pre-configured to Germany
}

export type DocumentStatus = 'uploaded' | 'missing';

export interface DocumentItem {
  id: string;
  name: string;
  shortDescription: string;
  requiredFor: string;
  status: DocumentStatus;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
}

export type ApplicationStep = 'home' | 'details' | 'documents' | 'processing' | 'profile-preview';
