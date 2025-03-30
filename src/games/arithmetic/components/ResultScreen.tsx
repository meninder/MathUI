import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import SummaryScreen from '@/components/SummaryScreen';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

const ResultScreen: React.FC = () => {
  const {
    correctAnswers,
    questions,
    selectedOperation,
    selectedDifficulty,
    handleReset,
    getOperationDisplayName,
    getDifficultyDisplayName
  } = useArithmetic();

  return (
    <div className="animate-scale-up">
      <SummaryScreen
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        operation={getOperationDisplayName(selectedOperation)}
        difficulty={getDifficultyDisplayName(selectedDifficulty)}
        onReset={handleReset}
        questions={questions}
      />
    </div>
  );
};

export default ResultScreen;
