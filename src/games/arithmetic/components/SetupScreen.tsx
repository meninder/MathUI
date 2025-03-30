import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import OptionSelector from '@/components/OptionSelector';
import OperationStep from '@/components/operation-selector/OperationStep';
import DifficultyStep from '@/components/operation-selector/DifficultyStep';
import CountStep from '@/components/operation-selector/CountStep';

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

  const setupClasses = isInitialLoad
    ? "opacity-0"
    : "animate-scale-up";

  return (
    <div className={setupClasses}>
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
    </div>
  );
};

export default SetupScreen;
