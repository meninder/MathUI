import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export const AnswerInput = forwardRef<HTMLInputElement, AnswerInputProps>(
  ({ onSubmit, onKeyPress, disabled }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          type="number"
          className={cn(
            "w-full px-4 py-2 text-lg rounded-lg border border-input bg-background",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          placeholder="Enter your answer"
          onKeyPress={onKeyPress}
          disabled={disabled}
        />
      </div>
    );
  }
);

AnswerInput.displayName = 'AnswerInput';
