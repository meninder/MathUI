import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import Flashcard from '@/components/flashcard/Flashcard';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import AnswerInput from '@/components/AnswerInput';
import ResultDisplay from '@/components/ResultDisplay';
import { GameHeader } from '@/components/GameHeader';

const PracticeScreen: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    correctAnswers,
    attemptedQuestions,
    isNewQuestion,
    handleNextQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleReset,
    isInitialLoad
  } = useArithmetic();

  const practiceClasses = isInitialLoad
    ? "opacity-0"
    : "animate-scale-up";

  return (
    <div className={cn("min-h-screen flex flex-col items-center p-4 pt-8", practiceClasses)}>
      <GameHeader
        score={correctAnswers}
        total={questions.length}
        current={currentQuestionIndex + 1}
        onRestart={handleReset}
      />

      {questions.length > 0 && (
        <div className="w-full max-w-2xl mx-auto">
          <Flashcard
            question={questions[currentQuestionIndex]}
            onNext={handleNextQuestion}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            isNewQuestion={isNewQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default PracticeScreen;
