import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultContainerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  onPlayAgain: () => void;
  isInitialLoad?: boolean;
}

export const ResultContainer: React.FC<ResultContainerProps> = ({
  children,
  className,
  title,
  onPlayAgain,
  isInitialLoad = false
}) => {
  const containerClasses = cn(
    "w-full max-w-2xl p-6",
    isInitialLoad ? "opacity-0" : "animate-scale-up",
    className
  );

  return (
    <Card className={containerClasses}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
        </div>

        <div className="space-y-6">
          {children}
        </div>

        <div className="flex justify-center">
          <Button onClick={onPlayAgain}>
            Play Again
          </Button>
        </div>
      </div>
    </Card>
  );
};
