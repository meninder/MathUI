import React from 'react';
import { useArithmetic } from '../../contexts/ArithmeticContext';
import SetupScreen from './SetupScreen';
import PracticeScreen from './PracticeScreen';
import ResultScreen from './ResultScreen';
import { Toaster } from '../ui/toaster';

const ArithmeticGame: React.FC = () => {
  const { step } = useArithmetic();

  return (
    <div className="container mx-auto px-4 py-8">
      {step === 'setup' && <SetupScreen />}
      {step === 'practice' && <PracticeScreen />}
      {step === 'summary' && <ResultScreen />}
      <Toaster />
    </div>
  );
};

export default ArithmeticGame;
