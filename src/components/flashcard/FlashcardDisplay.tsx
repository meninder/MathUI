import React from 'react';
import { cn } from '@/lib/utils';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';

interface FlashcardDisplayProps {
  question: ArithmeticQuestion;
  isFlipped: boolean;
  isAnimating: boolean;
  hasAnswered: boolean;
  isNewQuestion: boolean;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  question,
  isFlipped,
  isAnimating,
  hasAnswered,
  isNewQuestion
}) => {
  return (
    <div
      className={cn(
        "card-flip-container aspect-[7/4] w-full max-w-md mx-auto",
        hasAnswered && "pointer-events-none",
        isNewQuestion && "animate-scale-up"
      )}
    >
      <div className={cn("card-flip w-full h-full relative", isFlipped && "flipped")}>
        {/* Card Front */}
        <div className="card-front w-full h-full absolute inset-0 backface-hidden">
          <div className="glass w-full h-full rounded-2xl shadow-soft p-6 flex flex-col items-center justify-center cursor-pointer select-none">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              {question.questionText}
            </div>

            {!hasAnswered && (
              <div className="text-sm text-muted-foreground mt-2">
                Enter your answer below
              </div>
            )}
          </div>
        </div>

        {/* Card Back */}
        <div className="card-back w-full h-full absolute inset-0 backface-hidden rotate-y-180">
          <div className="glass w-full h-full rounded-2xl shadow-soft p-6 flex flex-col items-center justify-center cursor-pointer select-none">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              {question.questionText}
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-primary">
              {question.answerText}
            </div>

            {hasAnswered && (
              <div className="text-sm text-muted-foreground mt-2">
                Tap to see question again
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
