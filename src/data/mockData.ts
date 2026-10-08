/**
 * AI Applicant Copilot - Mock Data
 *
 * NOTE FOR YOUR TEAMMATE (BACKEND / AI):
 * This file contains the initial mock data for the application.
 * Once the backend API or database is ready, you can replace
 * these values with real data fetched from your backend endpoints.
 */

import { ApplicantDetails, DocumentItem } from '../types';

export const initialApplicantDetails: ApplicantDetails = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  goal: 'study',
  intendedField: 'Computer Science (M.Sc.)',
  targetInstitution: 'Technical University of Munich (TUM)',
  country: 'Germany',
};

export const initialDocuments: DocumentItem[] = [
  {
    id: 'cv',
    name: 'CV',
    shortDescription: 'Tabellarischer Lebenslauf (German standard CV)',
    requiredFor: 'Uni-Assist & Embassy Visa application',
    status: 'uploaded',
    fileName: 'Alex_Rivera_Curriculum_Vitae.pdf',
    fileSize: '1.4 MB',
    uploadedAt: 'Oct 7, 10:15 AM',
  },
  {
    id: 'degree',
    name: 'Degree Certificate',
    shortDescription: 'Official Bachelor or Master degree scroll',
    requiredFor: 'Anabin database equivalency check',
    status: 'uploaded',
    fileName: 'BSc_Computer_Science_Degree.pdf',
    fileSize: '2.8 MB',
    uploadedAt: 'Oct 7, 10:18 AM',
  },
  {
    id: 'marksheet',
    name: 'Marksheet',
    shortDescription: 'Semester-wise academic transcripts & grading scheme',
    requiredFor: 'Bavarian formula GPA conversion (ECTS check)',
    status: 'uploaded',
    fileName: 'Official_Academic_Transcripts_All_Semesters.pdf',
    fileSize: '4.2 MB',
    uploadedAt: 'Oct 7, 10:20 AM',
  },
  {
    id: 'language',
    name: 'Language Certificate',
    shortDescription: 'IELTS / TOEFL or Goethe / TestDaF certificate',
    requiredFor: 'Language proficiency requirement (CEFR B2/C1)',
    status: 'missing',
  },
  {
    id: 'experience',
    name: 'Experience Letter',
    shortDescription: 'Proof of employment or internship completion certificate',
    requiredFor: 'APS certificate & visa qualification points',
    status: 'uploaded',
    fileName: 'Software_Engineering_Internship_Letter.pdf',
    fileSize: '950 KB',
    uploadedAt: 'Oct 7, 10:24 AM',
  },
];

export const suggestedFields = [
  'Computer Science & AI',
  'Data Science & Analytics',
  'Mechanical & Automotive Engineering',
  'Renewable Energy & Sustainability',
  'International Business Management',
  'Biomedical Engineering & Biotech',
];

export const suggestedUniversities = [
  'Technical University of Munich (TUM)',
  'RWTH Aachen University',
  'Karlsruhe Institute of Technology (KIT)',
  'Heidelberg University',
  'Technical University of Berlin (TUB)',
  'Ludwig Maximilian University of Munich (LMU)',
];

export const suggestedCompanies = [
  'SAP SE',
  'Siemens AG',
  'Robert Bosch GmbH',
  'BMW Group',
  'Zalando SE',
  'Infineon Technologies',
];
