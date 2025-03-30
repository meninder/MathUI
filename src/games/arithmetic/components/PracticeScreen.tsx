import React from 'react';
import { useArithmetic } from '../ArithmeticContext';
import Flashcard from '@/components/flashcard/Flashcard';
import { GameCard } from '@/components/game/GameCard';
import { GameHeader } from '@/components/GameHeader';

const PracticeScreen: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    correctAnswers,
    handleNextQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleReset,
    isInitialLoad
  } = useArithmetic();

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <GameHeader
        score={correctAnswers}
        total={questions.length}
        current={currentQuestionIndex + 1}
        onRestart={handleReset}
      />

      {questions.length > 0 && (
        <GameCard maxWidth="2xl">
          <div className="space-y-8">
            <Flashcard
              question={currentQuestion}
              onNext={handleNextQuestion}
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswer={handleWrongAnswer}
              isNewQuestion={true}
            />
          </div>
        </GameCard>
      )}
    </>
  );
};

export default PracticeScreen;
