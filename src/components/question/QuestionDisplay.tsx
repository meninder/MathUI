import React from 'react';
import { cn } from '@/lib/utils';

interface QuestionDisplayProps {
  question: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showAnswer?: boolean;
  answer?: string | number;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  className,
  size = '2xl',
  showAnswer = false,
  answer
}) => {
  const questionClasses = cn(
    "text-center font-bold",
    {
      'text-xl': size === 'sm',
      'text-2xl': size === 'md',
      'text-3xl': size === 'lg',
      'text-4xl': size === 'xl',
      'text-5xl': size === '2xl',
    },
    className
  );

  const answerClasses = cn(
    "text-center mt-4 text-muted-foreground",
    {
      'text-lg': size === 'sm',
      'text-xl': size === 'md',
      'text-2xl': size === 'lg',
      'text-3xl': size === 'xl',
      'text-4xl': size === '2xl',
    }
  );

  return (
    <div className="space-y-4">
      <div className={questionClasses}>
        {question}
      </div>
      {showAnswer && answer !== undefined && (
        <div className={answerClasses}>
          {answer}
        </div>
      )}
    </div>
  );
};
