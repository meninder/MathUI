import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import OptionSelector from '@/components/OptionSelector';
import { SetupContainer } from '@/components/setup/SetupContainer';

const SetupScreen: React.FC = () => {
  const {
    setupStep,
    selectedOperation,
    selectedDifficulty,
    questionCount,
    handleSelectOperation,
    handleSelectDifficulty,
    handleSelectCount,
    handleStartPractice,
    isInitialLoad
  } = useArithmetic();

  return (
    <SetupContainer
      title="Arithmetic Practice Setup"
      description="Choose your operation, difficulty, and number of questions."
      isInitialLoad={isInitialLoad}
    >
      <OptionSelector
        step={setupStep}
        selectedOperation={selectedOperation}
        selectedDifficulty={selectedDifficulty}
        count={questionCount}
        onSelectOperation={handleSelectOperation}
        onSelectDifficulty={handleSelectDifficulty}
        onSelectCount={handleSelectCount}
        onStart={handleStartPractice}
      />
    </SetupContainer>
  );
};

export default SetupScreen;
