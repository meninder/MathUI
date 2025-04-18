import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GameContainer } from "@/components/game/GameContainer";
import { GameCard } from "@/components/game/GameCard";
import { QuestionDisplay } from "@/components/question/QuestionDisplay";
import { NumberLine } from "@/components/question/NumberLine";
import { GameHeader } from "@/components/GameHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SummaryScreen from "@/components/SummaryScreen";
import { Operation } from "@/utils/arithmeticUtils";

interface MultiplesHopperProps {
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  questionText: string;
  answerText: string;
  answer: number;
}

const generateQuestion = (difficulty: "easy" | "medium" | "hard"): Question => {
  let denominator1: number;
  let denominator2: number;

  switch (difficulty) {
    case "easy":
      denominator1 = Math.floor(Math.random() * 3) + 2; // 2-4
      denominator2 = Math.floor(Math.random() * 3) + 2; // 2-4
      break;
    case "medium":
      denominator1 = Math.floor(Math.random() * 3) + 3; // 3-5
      denominator2 = Math.floor(Math.random() * 3) + 3; // 3-5
      break;
    case "hard":
      denominator1 = Math.floor(Math.random() * 3) + 4; // 4-6
      denominator2 = Math.floor(Math.random() * 3) + 4; // 4-6
      break;
  }

  // Ensure denominators are different
  while (denominator1 === denominator2) {
    if (difficulty === "easy") {
      denominator2 = Math.floor(Math.random() * 3) + 2;
    } else if (difficulty === "medium") {
      denominator2 = Math.floor(Math.random() * 3) + 3;
    } else {
      denominator2 = Math.floor(Math.random() * 3) + 4;
    }
  }

  // Calculate LCM
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const lcmValue = lcm(denominator1, denominator2);

  return {
    id: Math.floor(Math.random() * 1000000),
    num1: denominator1,
    num2: denominator2,
    operation: 'multiplication' as Operation,
    questionText: `Find LCM of ${denominator1} and ${denominator2}`,
    answerText: lcmValue.toString(),
    answer: lcmValue
  };
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
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(0);
  const [maxValue, setMaxValue] = useState(20);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const newQuestion = generateQuestion(difficulty);
    setCurrentQuestion(newQuestion);
    setMaxValue(Math.max(newQuestion.num1, newQuestion.num2) * 5);
  }, [difficulty]);

  const handleHop = (direction: 'forward' | 'backward', fraction: 1 | 2) => {
    if (!currentQuestion) return;

    const denominator = fraction === 1 ? currentQuestion.num1 : currentQuestion.num2;
    const hopAmount = direction === 'forward' ? denominator : -denominator;
    const setPosition = fraction === 1 ? setPosition1 : setPosition2;

    setPosition(prev => {
      const newPosition = prev + hopAmount;
      return Math.max(0, Math.min(newPosition, maxValue));
    });
  };

  // Check for LCM when positions change
  useEffect(() => {
    if (!currentQuestion || hasAnswered) return;

    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const lcm = (a: number, b: number): number => {
      return Math.abs(a * b) / gcd(a, b);
    };

    const currentLcm = lcm(currentQuestion.num1, currentQuestion.num2);
    if (position1 === currentLcm && position2 === currentLcm) {
      console.log('Success! LCM found:', currentLcm);
      setIsCorrect(true);
      setHasAnswered(true);
      setShowAnswer(true);
      setScore(prev => prev + 1);

      // Update the current question with the answer
      const updatedQuestion = {
        ...currentQuestion,
        questionText: `Find LCM of ${currentQuestion.num1} and ${currentQuestion.num2}`,
        answerText: currentLcm.toString(),
        answer: currentLcm
      };
      setQuestions(prev => [...prev, updatedQuestion]);
    }
  }, [position1, position2, currentQuestion, hasAnswered]);

  const handleNextQuestion = () => {
    if (currentIndex < questionCount - 1) {
      setCurrentIndex(prev => prev + 1);
      const newQuestion = generateQuestion(difficulty);
      setCurrentQuestion(newQuestion);
      setMaxValue(Math.max(newQuestion.num1, newQuestion.num2) * 5);
      setPosition1(0);
      setPosition2(0);
      setHasAnswered(false);
      setShowAnswer(false);
    } else {
      setShowResult(true);
      onComplete(score);
    }
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setHasAnswered(false);
    setShowAnswer(false);
    setShowResult(false);
    setQuestions([]);
    const newQuestion = generateQuestion(difficulty);
    setCurrentQuestion(newQuestion);
    setMaxValue(Math.max(newQuestion.num1, newQuestion.num2) * 5);
    setPosition1(0);
    setPosition2(0);
  };

  if (!currentQuestion) return null;

  // Calculate multiples for number lines
  const multiples1 = Array.from(
    { length: Math.floor(maxValue / currentQuestion.num1) + 1 },
    (_, i) => i * currentQuestion.num1
  );

  const multiples2 = Array.from(
    { length: Math.floor(maxValue / currentQuestion.num2) + 1 },
    (_, i) => i * currentQuestion.num2
  );

  if (showResult) {
    return (
      <GameContainer>
        <SummaryScreen
          correctAnswers={score}
          totalQuestions={questionCount}
          operation="Least Common Multiple"
          difficulty={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          onReset={handlePlayAgain}
          questions={questions}
        />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <GameHeader
        score={score}
        total={questionCount}
        current={currentIndex + 1}
        onRestart={handlePlayAgain}
      />

      <GameCard maxWidth="4xl">
        <div className="space-y-8">
          <QuestionDisplay
            question={`Find the least common multiple of 1/${currentQuestion.num1} and 1/${currentQuestion.num2}`}
            size="2xl"
          />

          <div className="space-y-8">
            {/* Controls and Number Lines */}
            <div className="grid grid-cols-2 gap-8">
              {/* Fraction 1 Controls */}
              <div className="space-y-4">
                <div className="text-center text-2xl font-bold">
                  1/{currentQuestion.num1}
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleHop('backward', 1)}
                    disabled={position1 === 0 || hasAnswered}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleHop('forward', 1)}
                    disabled={position1 >= maxValue || hasAnswered}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Fraction 2 Controls */}
              <div className="space-y-4">
                <div className="text-center text-2xl font-bold">
                  1/{currentQuestion.num2}
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleHop('backward', 2)}
                    disabled={position2 === 0 || hasAnswered}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleHop('forward', 2)}
                    disabled={position2 >= maxValue || hasAnswered}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stacked Number Lines */}
            <div className="space-y-4">
              <NumberLine
                maxValue={maxValue}
                multiples={multiples1.filter(m => m <= position1)}
                color="blue"
                currentValue={position1}
              />
              <NumberLine
                maxValue={maxValue}
                multiples={multiples2.filter(m => m <= position2)}
                color="green"
                currentValue={position2}
              />
            </div>
          </div>

          {hasAnswered && (
            <div className="flex justify-center">
              <Button onClick={handleNextQuestion}>
                Next Question
              </Button>
            </div>
          )}
        </div>
      </GameCard>
    </GameContainer>
  );
}
