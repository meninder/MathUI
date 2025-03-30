import { MATH } from '@/constants';

/**
 * Calculate the Greatest Common Divisor (GCD) using Euclidean algorithm
 */
export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

/**
 * Calculate the Least Common Multiple (LCM)
 */
export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

/**
 * Calculate the maximum value for the number line based on denominators
 */
export const calculateMaxValue = (denom1: number, denom2: number): number => {
  return Math.max(
    MATH.MAX_VALUE_MULTIPLIER * Math.max(denom1, denom2),
    MATH.MIN_MAX_VALUE
  );
};

/**
 * Get a random element from an array
 */
export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
}; 