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
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewQuestion) {
      setIsFlipped(false);
      setHasAnswered(false);
      setIsAnimating(true);
      setInputValue('');
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isNewQuestion]);

  const handleAnswerSubmit = (answer: string) => {
    if (!answer.trim()) return;

    const userAnswer = parseInt(answer);
    question.answerText = answer;
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
      handleAnswerSubmit(inputValue);
    }
  };

  const handleSubmit = () => {
    if (hasAnswered) {
      onNext();
    } else {
      handleAnswerSubmit(inputValue);
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
        <div className="flex gap-2 w-full">
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 text-lg rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter your answer"
            onKeyPress={handleKeyPress}
            disabled={hasAnswered}
          />
          <button
            onClick={handleSubmit}
            className="btn-primary px-6"
          >
            {hasAnswered ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
