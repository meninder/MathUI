import React from 'react';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import Flashcard from '../flashcard/Flashcard';
import ProgressBar from '../ProgressBar';
import ScoreDisplay from '../ScoreDisplay';
import { cn } from '@/lib/utils';

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
    <div className={cn("min-h-screen flex flex-col items-center justify-center p-4", practiceClasses)}>
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex flex-col items-center gap-4">
          <ScoreDisplay
            correct={correctAnswers}
            total={attemptedQuestions}
          />
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
        </div>

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
    </div>
  );
};

export default PracticeScreen;
