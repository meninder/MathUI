import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameCardProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export const GameCard: React.FC<GameCardProps> = ({
  children,
  className,
  maxWidth = '4xl'
}) => {
  const cardClasses = cn(
    "w-full mx-auto p-6",
    {
      'max-w-sm': maxWidth === 'sm',
      'max-w-md': maxWidth === 'md',
      'max-w-lg': maxWidth === 'lg',
      'max-w-xl': maxWidth === 'xl',
      'max-w-2xl': maxWidth === '2xl',
      'max-w-3xl': maxWidth === '3xl',
      'max-w-4xl': maxWidth === '4xl',
      'max-w-5xl': maxWidth === '5xl',
      'max-w-6xl': maxWidth === '6xl',
      'max-w-7xl': maxWidth === '7xl',
    },
    className
  );

  return (
    <Card className={cardClasses}>
      {children}
    </Card>
  );
};
