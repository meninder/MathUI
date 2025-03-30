import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FlashcardControlsProps {
  isFlipped: boolean;
  hasAnswered: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onFlip: () => void;
  onNext: (e: React.MouseEvent) => void;
  onPrevious: (e: React.MouseEvent) => void;
}

const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  isFlipped,
  hasAnswered,
  canGoNext,
  canGoPrevious,
  onFlip,
  onNext,
  onPrevious
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={cn(
          "btn-elegant p-2 rounded-full",
          !canGoPrevious && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {hasAnswered && (
        <button
          onClick={onFlip}
          className="btn-elegant p-2 rounded-full"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      )}

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "btn-elegant p-2 rounded-full",
          !canGoNext && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FlashcardControls;
