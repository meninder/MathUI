import { max } from "date-fns";

export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'all';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ArithmeticQuestion {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  questionText: string;
  answerText: string;
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomOperation = (): Exclude<Operation, 'all'> => {
  const operations: Exclude<Operation, 'all'>[] = ['addition', 'subtraction', 'multiplication', 'division'];
  const randomIndex = Math.floor(Math.random() * operations.length);
  return operations[randomIndex];
};

const getDifficultyRange = (
  difficulty: Difficulty,
  operation: Operation
): { min1: number; max1: number; min2: number; max2: number } => {
  // For 'all' operation, we'll get a random operation first
  const actualOperation = operation === 'all' ? getRandomOperation() : operation;
  
  switch (actualOperation) {
    case 'addition':
      switch (difficulty) {
        case 'easy': return { min1: 3, max1: 10, min2: 1, max2: 10 };
        case 'medium': return { min1: 10, max1: 50, min2: 10, max2: 50 };
        case 'hard': return { min1: 50, max1: 100, min2: 50, max2: 100 };
      }
      break;
    case 'subtraction':
      switch (difficulty) {
        case 'easy': return { min1: 5, max1: 20, min2: 1, max2: 5 };
        case 'medium': return { min1: 25, max1: 50, min2: 5, max2: 25 };
        case 'hard': return { min1: 50, max1: 100, min2: 25, max2: 50 };
      }
      break;
    case 'multiplication':
      switch (difficulty) {
        case 'easy': return { min1: 2, max1: 4, min2: 2, max2: 4 };
        case 'medium': return { min1: 3, max1: 6, min2: 3, max2: 6 };
        case 'hard': return { min1: 4, max1: 8, min2: 4, max2: 8 };
      }
      break;
    case 'division':
      switch (difficulty) {
        case 'easy': return { min1: 2, max1: 4, min2: 2, max2: 4 };
        case 'medium': return { min1: 3, max1: 6, min2: 3, max2: 6 };
        case 'hard': return { min1: 4, max1: 8, min2: 4, max2: 8 };
      }
      break;
  }
  // Default case (should never happen)
  return { min1: 1, max1: 10, min2: 1, max2: 10 };
};

const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case 'addition':
      return '+';
    case 'subtraction':
      return '-';
    case 'multiplication':
      return '×';
    case 'division':
      return '÷';
    default:
      return '?';
  }
};

export const generateQuestions = (
  operation: Operation,
  difficulty: Difficulty,
  count: number
): ArithmeticQuestion[] => {
  const questions: ArithmeticQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const actualOperation = operation === 'all' ? getRandomOperation() : operation;
    const range = getDifficultyRange(difficulty, actualOperation);
    
    let num1 = getRandomNumber(range.min1, range.max1);
    let num2 = getRandomNumber(range.min2, range.max2);
    
    // For subtraction, ensure num1 is greater than num2
    if (actualOperation === 'subtraction' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    
    // For division, ensure num1 is divisible by num2
    if (actualOperation === 'division') {
      num2 = getRandomNumber(range.min2, range.max2);
      num1 = num2 * getRandomNumber(1, 3);
    }
    
    let answer: number;
    switch (actualOperation) {
      case 'addition':
        answer = num1 + num2;
        break;
      case 'subtraction':
        answer = num1 - num2;
        break;
      case 'multiplication':
        answer = num1 * num2;
        break;
      case 'division':
        answer = num1 / num2;
        break;
      default:
        answer = 0;
    }
    
    const symbol = getOperationSymbol(actualOperation);
    questions.push({
      id: i + 1,
      num1,
      num2,
      operation: actualOperation,
      answer,
      questionText: `${num1} ${symbol} ${num2} = ?`,
      answerText: `${num1} ${symbol} ${num2} = ${answer}`,
    });
  }
  
  return questions;
}; 