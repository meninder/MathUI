import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

interface FlashcardControlsProps {
  onNext: (e: React.MouseEvent) => void;
  onPrevious: (e: React.MouseEvent) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onFlip: () => void;
  hasAnswered: boolean;
  isFlipped: boolean;
}

const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  onFlip,
  hasAnswered,
  isFlipped
}) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {hasAnswered && (
        <Button
          variant="outline"
          size="icon"
          onClick={onFlip}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FlashcardControls;
