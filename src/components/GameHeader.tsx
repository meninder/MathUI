import React from 'react';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import ScoreDisplay from '@/components/ScoreDisplay';
import { RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  total: number;
  current: number;
  onRestart: () => void;
}

export function GameHeader({ score, total, current, onRestart }: GameHeaderProps) {
  return (
    <div className="w-full max-w-4xl space-y-2">
      <div className="flex items-center justify-between gap-4">
        <ScoreDisplay
          correct={score}
          total={current}
        />
        <Button
          variant="outline"
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 h-[80px]"
          title="Restart Practice"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Restart</span>
        </Button>
      </div>
      <ProgressBar
        current={current}
        total={total}
      />
    </div>
  );
}
