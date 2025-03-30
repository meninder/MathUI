import React from 'react';
import { cn } from '@/lib/utils';

interface NumberLineProps {
  maxValue: number;
  multiples: number[];
  color?: 'blue' | 'green' | 'red' | 'purple';
  currentValue?: number;
  className?: string;
}

export const NumberLine: React.FC<NumberLineProps> = ({
  maxValue,
  multiples,
  color = 'blue',
  currentValue,
  className
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-500/10 text-blue-600 border-blue-500';
      case 'green': return 'bg-green-500/10 text-green-600 border-green-500';
      case 'red': return 'bg-red-500/10 text-red-600 border-red-500';
      case 'purple': return 'bg-purple-500/10 text-purple-600 border-purple-500';
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className={cn("relative w-full h-12", className)}>
      {/* Base line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-0.5 bg-gray-200" />
      </div>

      {/* Numbers and markers */}
      <div className="absolute inset-0 flex items-center justify-between">
        {Array.from({ length: maxValue + 1 }, (_, i) => (
          <div key={i} className="relative">
            {/* Number */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
              {i}
            </div>

            {/* Marker */}
            <div className={cn(
              "w-1 h-3 rounded-full",
              multiples.includes(i) ? colorClasses : "bg-gray-300",
              currentValue === i && "ring-2 ring-offset-2 ring-primary"
            )} />
          </div>
        ))}
      </div>
    </div>
  );
};
