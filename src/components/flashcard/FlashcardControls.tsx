import React from 'react';
import { cn } from '@/lib/utils';
import FlashcardDisplay from './FlashcardDisplay';
import { AnswerInput } from './AnswerInput';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';

interface FlashcardControlsProps {
  question: ArithmeticQuestion;
  isFlipped: boolean;
  isAnimating: boolean;
  hasAnswered: boolean;
  isNewQuestion: boolean;
  onAnswerSubmit: (answer: string) => void;
  onNextQuestion: () => void;
  onFlip: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  question,
  isFlipped,
  isAnimating,
  hasAnswered,
  isNewQuestion,
  onAnswerSubmit,
  onNextQuestion,
  onFlip,
  onKeyPress,
  inputRef
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <FlashcardDisplay
        question={question}
        isFlipped={isFlipped}
        isAnimating={isAnimating}
        hasAnswered={hasAnswered}
        isNewQuestion={isNewQuestion}
      />

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <AnswerInput
          ref={inputRef}
          onSubmit={onAnswerSubmit}
          onKeyPress={onKeyPress}
          disabled={hasAnswered}
        />

        {hasAnswered && (
          <button
            onClick={onNextQuestion}
            className="btn-primary w-full"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashcardControls;
