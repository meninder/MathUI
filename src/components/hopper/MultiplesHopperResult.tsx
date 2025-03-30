import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScoreDisplay from "@/components/ScoreDisplay";
import { useNavigate } from "react-router-dom";

interface MultiplesHopperResultProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
}

export function MultiplesHopperResult({
  score,
  total,
  onPlayAgain,
}: MultiplesHopperResultProps) {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);

  return (
    <Card className="w-full max-w-md p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Complete!</h2>
          <ScoreDisplay correct={score} total={total} />
          <p className="text-lg mt-4">
            You got {percentage}% of the questions correct!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={onPlayAgain} className="w-full">
            Play Again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Card>
  );
}
