import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';
import { generateQuestions, Operation, Difficulty, ArithmeticQuestion } from '../utils/arithmeticUtils';

type ArithmeticContextType = {
  step: 'setup' | 'practice' | 'summary';
  setupStep: 'operation' | 'difficulty' | 'count';
  selectedOperation: Operation | null;
  selectedDifficulty: Difficulty | null;
  questionCount: number;
  questions: ArithmeticQuestion[];
  currentQuestionIndex: number;
  isInitialLoad: boolean;
  correctAnswers: number;
  attemptedQuestions: number;
  isNewQuestion: boolean;
  handleSelectOperation: (operation: Operation) => void;
  handleSelectDifficulty: (difficulty: Difficulty) => void;
  handleSelectCount: (count: number) => void;
  handleStartPractice: () => void;
  handleNextQuestion: () => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  handleReset: () => void;
  getOperationDisplayName: (op: Operation | null) => string;
  getDifficultyDisplayName: (diff: Difficulty | null) => string;
};

const ArithmeticContext = createContext<ArithmeticContextType | undefined>(undefined);

export const ArithmeticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'setup' | 'practice' | 'summary'>('setup');
  const [setupStep, setSetupStep] = useState<'operation' | 'difficulty' | 'count'>('operation');
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questions, setQuestions] = useState<ArithmeticQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [isNewQuestion, setIsNewQuestion] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (step === 'practice' && questions.length === 0) {
      const newQuestions = generateQuestions(
        selectedOperation || 'all',
        selectedDifficulty || 'medium',
        questionCount
      );
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setCorrectAnswers(0);
      setAttemptedQuestions(0);
    }
  }, [step, selectedOperation, selectedDifficulty, questionCount]);

  const handleSelectOperation = (operation: Operation) => {
    setSelectedOperation(operation);
    setSetupStep('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setSetupStep('count');
  };

  const handleSelectCount = (count: number) => {
    setQuestionCount(count);
  };

  const handleStartPractice = () => {
    setStep('practice');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsNewQuestion(true);
    } else {
      setStep('summary');
    }
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswers(prev => prev + 1);
    setAttemptedQuestions(prev => prev + 1);
    setIsNewQuestion(false);
    toast({
      title: "Correct!",
      description: "Great job! Keep it up!",
      variant: "default",
    });
  };

  const handleWrongAnswer = () => {
    setAttemptedQuestions(prev => prev + 1);
    setIsNewQuestion(false);
    toast({
      title: "Incorrect",
      description: "Keep practicing! You'll get it next time.",
      variant: "destructive",
    });
  };

  const handleReset = () => {
    setStep('setup');
    setSetupStep('operation');
    setSelectedOperation(null);
    setSelectedDifficulty(null);
    setQuestionCount(10);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setAttemptedQuestions(0);
    setIsNewQuestion(true);
  };

  const getOperationDisplayName = (op: Operation | null): string => {
    if (!op) return 'All Operations';
    switch (op) {
      case 'addition': return 'Addition';
      case 'subtraction': return 'Subtraction';
      case 'multiplication': return 'Multiplication';
      case 'division': return 'Division';
      default: return 'All Operations';
    }
  };

  const getDifficultyDisplayName = (diff: Difficulty | null): string => {
    if (!diff) return 'Medium';
    switch (diff) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Medium';
    }
  };

  const value = {
    step,
    setupStep,
    selectedOperation,
    selectedDifficulty,
    questionCount,
    questions,
    currentQuestionIndex,
    isInitialLoad,
    correctAnswers,
    attemptedQuestions,
    isNewQuestion,
    handleSelectOperation,
    handleSelectDifficulty,
    handleSelectCount,
    handleStartPractice,
    handleNextQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleReset,
    getOperationDisplayName,
    getDifficultyDisplayName,
  };

  return (
    <ArithmeticContext.Provider value={value}>
      {children}
    </ArithmeticContext.Provider>
  );
};

export const useArithmetic = () => {
  const context = useContext(ArithmeticContext);
  if (context === undefined) {
    throw new Error('useArithmetic must be used within an ArithmeticProvider');
  }
  return context;
};
