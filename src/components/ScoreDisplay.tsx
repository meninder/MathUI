import React from 'react';

interface ScoreDisplayProps {
  correct: number;
  total: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ correct, total }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="inline-flex flex-col items-center justify-center bg-secondary/40 backdrop-blur-sm rounded-lg p-4 shadow-soft border border-secondary/50 h-[80px] min-w-[140px]">
      <div className="text-sm font-medium text-muted-foreground">Score</div>
      <div className="flex items-center justify-center">
        <span className="font-bold text-primary text-2xl">{correct}</span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-muted-foreground text-lg">{total}</span>
      </div>
      <div className="bg-background/80 px-3 py-1 rounded-full text-sm font-medium">
        <span className="text-primary">{percentage}%</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
