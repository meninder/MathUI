import React from 'react';
import { cn } from '@/lib/utils';

interface GameContainerProps {
  children: React.ReactNode;
  className?: string;
  isInitialLoad?: boolean;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  children,
  className,
  isInitialLoad = false
}) => {
  const containerClasses = cn(
    "min-h-screen flex flex-col items-center p-4 pt-8",
    isInitialLoad ? "opacity-0" : "animate-scale-up",
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};
