import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import ScoreDisplay from "@/components/ScoreDisplay";
import { cn } from "@/lib/utils";
import { MultiplesHopperResult } from "./MultiplesHopperResult";

interface MultiplesHopperProps {
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
  onComplete: (score: number) => void;
}

interface Question {
  number: number;
  multiples: number[];
  correctAnswer: number;
}

const generateQuestion = (difficulty: "easy" | "medium" | "hard"): Question => {
  let number: number;
  let multiples: number[];

  switch (difficulty) {
    case "easy":
      number = Math.floor(Math.random() * 5) + 1; // 1-5
      multiples = [2, 3, 4, 5];
      break;
    case "medium":
      number = Math.floor(Math.random() * 5) + 6; // 6-10
      multiples = [2, 3, 4, 5, 6, 7];
      break;
    case "hard":
      number = Math.floor(Math.random() * 5) + 11; // 11-15
      multiples = [2, 3, 4, 5, 6, 7, 8, 9];
      break;
  }

  const correctAnswer = multiples[Math.floor(Math.random() * multiples.length)];
  return { number, multiples, correctAnswer };
};

export function MultiplesHopper({
  difficulty,
  questionCount,
  onComplete,
}: MultiplesHopperProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setCurrentQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  const handleAnswer = (answer: number) => {
    if (!currentQuestion) return;

    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setHasAnswered(true);
    setShowAnswer(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentIndex < questionCount - 1) {
        setCurrentIndex((prev) => prev + 1);
        setCurrentQuestion(generateQuestion(difficulty));
        setHasAnswered(false);
        setShowAnswer(false);
      } else {
        setShowResult(true);
        onComplete(score + (correct ? 1 : 0));
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setHasAnswered(false);
    setShowAnswer(false);
    setShowResult(false);
    setCurrentQuestion(generateQuestion(difficulty));
  };

  if (!currentQuestion) return null;

  if (showResult) {
    return (
      <MultiplesHopperResult
        score={score}
        total={questionCount}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <ProgressBar current={currentIndex + 1} total={questionCount} />
      <ScoreDisplay correct={score} total={currentIndex + 1} />
      <Card className="w-full max-w-md p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Multiples Hopper</h2>
            <p className="text-lg">
              What is the next multiple of {currentQuestion.number}?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.multiples.map((multiple) => (
              <Button
                key={multiple}
                variant="outline"
                className={cn(
                  "h-12 text-lg",
                  showAnswer &&
                    (multiple === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : multiple === currentQuestion.number * multiple
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "opacity-50")
                )}
                onClick={() => !hasAnswered && handleAnswer(multiple)}
                disabled={hasAnswered}
              >
                {currentQuestion.number * multiple}
              </Button>
            ))}
          </div>
          {showAnswer && (
            <div
              className={cn(
                "text-center text-lg font-semibold",
                isCorrect ? "text-green-500" : "text-red-500"
              )}
            >
              {isCorrect ? "Correct!" : "Incorrect!"}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
