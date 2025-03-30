import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import SetupScreen from './SetupScreen';
import PracticeScreen from './PracticeScreen';
import ResultScreen from './ResultScreen';
import { Toaster } from '@/components/ui/toaster';
import { GameContainer } from '@/components/game/GameContainer';

const ArithmeticGame: React.FC = () => {
  const { step } = useArithmetic();

  return (
    <GameContainer>
      {step === 'setup' && <SetupScreen />}
      {step === 'practice' && <PracticeScreen />}
      {step === 'summary' && <ResultScreen />}
      <Toaster />
    </GameContainer>
  );
};

export default ArithmeticGame;
