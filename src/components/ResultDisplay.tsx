
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface ResultDisplayProps {
  lcd: number;
  onNewProblem: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ lcd, onNewProblem }) => {
  React.useEffect(() => {
    // Trigger confetti when LCD is found
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [lcd]);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-center text-white animate-scale-in">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Great job! 🎉
      </h2>
      <p className="text-xl md:text-2xl mb-4">
        <span className="font-bold">{lcd}</span> is the Least Common Denominator!
      </p>
      <Button 
        onClick={onNewProblem}
        className="bg-white text-purple-700 hover:bg-gray-100"
      >
        <RefreshCw className="mr-2" size={16} />
        Try Another Problem
      </Button>
    </div>
  );
};

export default ResultDisplay;
