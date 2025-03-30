import React, { useState } from "react";
import { SetupContainer } from "@/components/setup/SetupContainer";
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
    <SetupContainer
      title="Multiples Hopper Setup"
      description="Practice identifying multiples of numbers with increasing difficulty."
    >
      <DifficultyStep
        selectedDifficulty={difficulty}
        onSelectDifficulty={setDifficulty}
      />

      <CountStep
        count={questionCount}
        onSelectCount={setQuestionCount}
        onStart={handleStart}
      />
    </SetupContainer>
  );
}
