import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

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

        <div className="space-y-4">
          <div>
            <Label>Difficulty</Label>
            <RadioGroup
              value={difficulty}
              onValueChange={(value: "easy" | "medium" | "hard") =>
                setDifficulty(value)
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy (1-5)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium (6-10)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard (11-15)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Number of Questions</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Slider
                value={[questionCount]}
                onValueChange={(values: number[]) => setQuestionCount(values[0])}
                min={5}
                max={20}
                step={5}
                className="flex-1"
              />
              <span className="w-12 text-center">{questionCount}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleStart} className="w-full">
          Start Game
        </Button>
      </div>
    </Card>
  );
}
