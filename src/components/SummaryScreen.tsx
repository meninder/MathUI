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
      <div className="glass p-8 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-bold text-center mb-6">Practice Complete!</h2>

        <div className="flex flex-col items-center mb-8">
          <Trophy className="w-16 h-16 text-primary mb-4" />
          <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
          <div className="text-lg text-muted-foreground mb-4">{message}</div>
          <div className="text-sm text-muted-foreground">
            {correctAnswers} correct out of {totalQuestions} questions
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <div className="text-muted-foreground">Operation</div>
              <div className="font-medium">{operation}</div>
            </div>
            <div className="bg-secondary/20 p-3 rounded-lg">
              <div className="text-muted-foreground">Difficulty</div>
              <div className="font-medium">{difficulty}</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Question Review</h3>
          <div className="max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Your Answer</TableHead>
                  <TableHead>Correct</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      {getOperationIcon(question.questionText)}
                      {question.questionText}
                    </TableCell>
                    <TableCell>{question.answerText}</TableCell>
                    <TableCell>
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

        <div className="flex justify-center gap-4">
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
