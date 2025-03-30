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
        "card-flip-container aspect-[4/3] w-full",
        hasAnswered && "pointer-events-none",
        isNewQuestion && "animate-scale-up"
      )}
    >
      <div className={cn("card-flip w-full h-full", isFlipped && "flipped")}>
        {/* Card Front */}
        <div className="card-front w-full h-full">
          <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
            <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {question.questionText}
            </div>

            {!hasAnswered && (
              <div className="text-sm text-muted-foreground mt-2">
                {isFlipped ? "Tap to see question" : "Tap to see answer"}
              </div>
            )}
          </div>
        </div>

        {/* Card Back */}
        <div className="card-back w-full h-full">
          <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
            <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {question.answerText}
            </div>

            {!hasAnswered && (
              <div className="text-sm text-muted-foreground mt-2">
                Tap to see question
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
