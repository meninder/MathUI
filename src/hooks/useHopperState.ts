import { useState, useEffect } from 'react';
import { HopperIndex, Problem, HopperState } from '@/types';
import { calculateMaxValue } from '@/utils/math';
import { generateProblem } from '@/utils/problemGenerator';

export const useHopperState = () => {
  const [problem, setProblem] = useState<Problem>(generateProblem());
  const [positions, setPositions] = useState<[number, number]>([0, 0]);
  const [multiples, setMultiples] = useState<[number[], number[]]>([[], []]);
  const [lcd, setLcd] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState(
    calculateMaxValue(problem.denominators[0], problem.denominators[1])
  );

  // Move both hoppers to LCD when it's found
  useEffect(() => {
    if (lcd !== null) {
      setPositions([lcd, lcd]);
    }
  }, [lcd]);

  const handleHop = (hopperIndex: HopperIndex) => {
    if (lcd !== null) return; // Stop hopping if LCD is found

    const denominator = problem.denominators[hopperIndex];
    const newPosition = positions[hopperIndex] + denominator;
    
    // Update the position and multiples for this hopper
    const newPositions = [...positions] as [number, number];
    newPositions[hopperIndex] = newPosition;
    setPositions(newPositions);

    const newMultiples = [...multiples] as [number[], number[]];
    newMultiples[hopperIndex] = [...newMultiples[hopperIndex], newPosition];
    setMultiples(newMultiples);

    // Dynamically extend the number line if needed
    if (newPosition > maxValue - 6) {
      setMaxValue(maxValue + Math.max(denominator * 2, 12));
    }
    
    // Check if we found the LCD (common multiple)
    if (newMultiples[0].includes(newPosition) && newMultiples[1].includes(newPosition)) {
      setLcd(newPosition);
    } else if (hopperIndex === HopperIndex.First && newMultiples[1].includes(newPosition)) {
      setLcd(newPosition);
    } else if (hopperIndex === HopperIndex.Second && newMultiples[0].includes(newPosition)) {
      setLcd(newPosition);
    }
  };

  const handleBack = (hopperIndex: HopperIndex) => {
    if (lcd !== null || positions[hopperIndex] === 0) return;

    const denominator = problem.denominators[hopperIndex];
    const newPosition = positions[hopperIndex] - denominator;
    
    if (newPosition < 0) return;
    
    // Update the position and multiples for this hopper
    const newPositions = [...positions] as [number, number];
    newPositions[hopperIndex] = newPosition;
    setPositions(newPositions);

    const newMultiples = [...multiples] as [number[], number[]];
    // Remove the last multiple if it exists
    if (newMultiples[hopperIndex].includes(positions[hopperIndex])) {
      newMultiples[hopperIndex] = newMultiples[hopperIndex].filter(
        m => m !== positions[hopperIndex]
      );
      setMultiples(newMultiples);
    }
  };

  const handleNewProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setPositions([0, 0]);
    setMultiples([[], []]);
    setLcd(null);
    setMaxValue(calculateMaxValue(newProblem.denominators[0], newProblem.denominators[1]));
  };

  // Calculate hopper position percentages based on maxValue
  const getHopperPositionPercent = (position: number): number => {
    return (position / maxValue) * 100;
  };

  return {
    problem,
    positions,
    multiples,
    lcd,
    maxValue,
    handleHop,
    handleBack,
    handleNewProblem,
    getHopperPositionPercent
  };
}; 