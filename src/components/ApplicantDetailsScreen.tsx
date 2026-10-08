import React from 'react';
import { ApplicantDetails } from '../types';
import { ApplicantForm } from './ApplicantForm';

interface ApplicantDetailsScreenProps {
  details: ApplicantDetails;
  onUpdate: (details: ApplicantDetails) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ApplicantDetailsScreen: React.FC<ApplicantDetailsScreenProps> = (props) => {
  return <ApplicantForm {...props} />;
};
