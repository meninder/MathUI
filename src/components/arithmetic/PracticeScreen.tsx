import React from 'react';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import Flashcard from '../flashcard/Flashcard';
import ProgressBar from '../ProgressBar';
import ScoreDisplay from '../ScoreDisplay';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

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
      <div className="w-full max-w-4xl space-y-6">
        <div className="relative">
          <div className="flex flex-col items-center gap-3">
            <ScoreDisplay
              correct={correctAnswers}
              total={attemptedQuestions}
            />
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={questions.length}
            />
          </div>
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex flex-col items-center gap-1 py-2"
              title="Restart Practice"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-xs">Restart</span>
            </Button>
          </div>
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
