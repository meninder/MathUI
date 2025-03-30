import React from 'react';
import { cn } from '@/lib/utils';
import { COLORS, ColorScheme, LAYOUT } from '@/constants/ui';

interface NumberLineProps {
  maxValue: number;
  multiples: number[];
  color: Lowercase<ColorScheme>;
  lcd: number | null;
}

interface TickMarkProps {
  position: number;
  maxValue: number;
  isMultiple: boolean;
  isLcd: boolean;
  color: Lowercase<ColorScheme>;
}

const TickMark: React.FC<TickMarkProps> = ({
  position,
  maxValue,
  isMultiple,
  isLcd,
  color
}) => {
  const colorKey = color.toUpperCase() as ColorScheme;
  const leftPosition = `${(position / maxValue) * 100}%`;

  return (
    <div
      className="flex flex-col items-center"
      style={{ position: 'absolute', left: leftPosition }}
    >
      {/* Integer position tick mark */}
      {position % 1 === 0 && (
        <>
          <div className="h-4 w-0.5 bg-gray-300" />
          <span className="text-xs text-gray-500 mt-1">{position}</span>
        </>
      )}
      
      {/* Multiple marker */}
      {isMultiple && (
        <div
          className={cn(
            'w-4 h-4 rounded-full absolute -top-5',
            COLORS[colorKey].LINE.MARKER,
            isLcd && 'animate-pulse w-5 h-5 border-2 border-yellow-400'
          )}
        />
      )}
    </div>
  );
};

const NumberLine: React.FC<NumberLineProps> = ({
  maxValue,
  multiples,
  color,
  lcd
}) => {
  const colorKey = color.toUpperCase() as ColorScheme;

  return (
    <div className={`${LAYOUT.SPACING.MARGIN.BOTTOM} pt-8 relative`}>
      <div className={cn(
        'h-2 rounded-full w-full relative',
        COLORS[colorKey].LINE.BASE
      )}>
        {Array.from({ length: maxValue + 1 }, (_, i) => (
          <TickMark
            key={i}
            position={i}
            maxValue={maxValue}
            isMultiple={multiples.includes(i)}
            isLcd={lcd === i}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberLine;
