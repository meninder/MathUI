import React from 'react';
import { ArrowLeft, RefreshCw, Trophy, Plus, Minus, X, Divide } from 'lucide-react';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SummaryScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  operation: string;
  difficulty: string;
  onReset: () => void;
  questions: ArithmeticQuestion[];
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
  correctAnswers,
  totalQuestions,
  operation,
  difficulty,
  onReset,
  questions
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let message = "Good effort!";
  if (percentage >= 90) {
    message = "Excellent work!";
  } else if (percentage >= 70) {
    message = "Great job!";
  } else if (percentage >= 50) {
    message = "Good effort!";
  } else {
    message = "Keep practicing!";
  }

  // Helper function to get the operation icon
  const getOperationIcon = (questionText: string) => {
    if (questionText.includes('+')) return <Plus className="w-4 h-4 text-primary" />;
    if (questionText.includes('-')) return <Minus className="w-4 h-4 text-primary" />;
    if (questionText.includes('×') || questionText.includes('*')) return <X className="w-4 h-4 text-primary" />;
    if (questionText.includes('÷') || questionText.includes('/')) return <Divide className="w-4 h-4 text-primary" />;
    return null;
  };

  return (
    <div className="animate-scale-up w-full max-w-md mx-auto">
      <div className="glass p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Practice Complete!</h2>
          <Trophy className="w-8 h-8 text-primary" />
        </div>

        <div className="flex items-center justify-between mb-4 bg-secondary/10 p-3 rounded-lg">
          <div>
            <div className="text-2xl font-bold text-primary">{percentage}%</div>
            <div className="text-sm text-muted-foreground">{message}</div>
          </div>
          <div className="text-sm text-right text-muted-foreground">
            {correctAnswers} / {totalQuestions}<br />correct
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <div className="text-muted-foreground text-xs">Operation</div>
              <div className="font-medium">{operation}</div>
            </div>
            <div className="bg-secondary/10 p-2 rounded-lg">
              <div className="text-muted-foreground text-xs">Difficulty</div>
              <div className="font-medium">{difficulty}</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Question Review</h3>
          <div className="max-h-[250px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-2">Question</TableHead>
                  <TableHead className="py-2">Your Answer</TableHead>
                  <TableHead className="py-2">Correct</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2 py-1.5">
                      {getOperationIcon(question.questionText)}
                      {question.questionText}
                    </TableCell>
                    <TableCell className="py-1.5">{question.answerText}</TableCell>
                    <TableCell className="py-1.5">
                      {question.answer === Number(question.answerText) ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
