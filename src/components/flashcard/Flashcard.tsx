import React, { useState, useRef, useEffect } from 'react';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import FlashcardDisplay from './FlashcardDisplay';

interface FlashcardProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isNewQuestion: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  onNext,
  onCorrectAnswer,
  onWrongAnswer,
  isNewQuestion
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewQuestion) {
      setIsFlipped(false);
      setHasAnswered(false);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isNewQuestion]);

  const handleAnswerSubmit = (answer: string) => {
    const userAnswer = parseInt(answer);
    if (userAnswer === question.answer) {
      onCorrectAnswer();
      setHasAnswered(true);
      setIsFlipped(true);
    } else {
      onWrongAnswer();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      handleAnswerSubmit(input.value);
    }
  };

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
        <input
          ref={inputRef}
          type="number"
          className="w-full px-4 py-2 text-lg rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your answer"
          onKeyPress={handleKeyPress}
          disabled={hasAnswered}
        />

        {hasAnswered && (
          <button
            onClick={onNext}
            className="btn-primary w-full"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
