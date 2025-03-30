import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DifficultyStep from "@/components/operation-selector/DifficultyStep";
import CountStep from "@/components/operation-selector/CountStep";

interface MultiplesHopperSetupProps {
  onStart: (difficulty: "easy" | "medium" | "hard", questionCount: number) => void;
}

export function MultiplesHopperSetup({ onStart }: MultiplesHopperSetupProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    onStart(difficulty, questionCount);
  };

  return (
    <Card className="w-full max-w-md p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Multiples Hopper Setup</h2>
          <p className="text-muted-foreground">
            Practice identifying multiples of numbers with increasing difficulty.
          </p>
        </div>

        <div className="space-y-8">
          <DifficultyStep
            selectedDifficulty={difficulty}
            onSelectDifficulty={setDifficulty}
          />

          <CountStep
            count={questionCount}
            onSelectCount={setQuestionCount}
            onStart={handleStart}
          />
        </div>
      </div>
    </Card>
  );
}
