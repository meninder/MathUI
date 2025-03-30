import React from 'react';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import FlashcardDisplay from './FlashcardDisplay';
import FlashcardControls from './FlashcardControls';
import AnswerInput from '../AnswerInput';

interface FlashcardContainerProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isNewQuestion: boolean;
}

const FlashcardContainer: React.FC<FlashcardContainerProps> = ({
  question,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  onCorrectAnswer,
  onWrongAnswer,
  isNewQuestion
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [userInputValue, setUserInputValue] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Reset state when question changes
  React.useEffect(() => {
    setIsFlipped(false);
    setHasAnswered(false);
    setUserInputValue('');
    setIsSubmitting(false);
  }, [question]);

  const handleFlip = () => {
    if (!isAnimating && hasAnswered) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 600); // Match animation duration
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canGoNext) {
      onNext();
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canGoPrevious) {
      onPrevious();
    }
  };

  const handleAnswerSubmit = () => {
    if (!isSubmitting && userInputValue.trim() !== '') {
      setIsSubmitting(true);
      const userAnswer = parseFloat(userInputValue);
      const isCorrect = userAnswer === question.answer;

      if (isCorrect) {
        onCorrectAnswer();
      } else {
        onWrongAnswer();
      }

      setHasAnswered(true);
      setIsFlipped(true);
    }
  };

  const handleInputChange = (value: string) => {
    setUserInputValue(value);
  };

  return (
    <div className="relative space-y-6">
      <FlashcardDisplay
        question={question}
        isFlipped={isFlipped}
        isAnimating={isAnimating}
        hasAnswered={hasAnswered}
        isNewQuestion={isNewQuestion}
      />

      {!hasAnswered && (
        <div className="w-full max-w-md mx-auto">
          <AnswerInput
            value={userInputValue}
            onChange={handleInputChange}
            onSubmit={handleAnswerSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <FlashcardControls
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        onFlip={handleFlip}
        hasAnswered={hasAnswered}
        isFlipped={isFlipped}
      />
    </div>
  );
};

export default FlashcardContainer;
