import React from 'react';
import { useArithmetic } from '../../contexts/ArithmeticContext';
import Flashcard from '../flashcard/Flashcard';
import ProgressBar from '../ProgressBar';
import ScoreDisplay from '../ScoreDisplay';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { Card } from '../ui/card';
import AnswerInput from '../AnswerInput';
import ResultDisplay from '../ResultDisplay';

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
      <div className="w-full max-w-4xl space-y-2">
        <div className="flex items-center justify-between gap-4">
          <ScoreDisplay
            correct={correctAnswers}
            total={attemptedQuestions}
          />
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 h-[80px]"
            title="Restart Practice"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart</span>
          </Button>
        </div>
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
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
    </div>
  );
};

export default PracticeScreen;
