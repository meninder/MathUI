
// Generate fraction problems with appropriate denominators for a 10-year-old
export const generateProblem = () => {
  // Define a set of simple denominators appropriate for the target age
  const simpleDenominators = [2, 3, 4, 5, 6, 8, 10];

  // Select two different denominators randomly
  let denom1 = getRandomElement(simpleDenominators);
  let denom2 = getRandomElement(simpleDenominators.filter(d => d !== denom1));

  // Make sure LCD won't be too large (for better visualization)
  while (lcm(denom1, denom2) > 40) {
    denom1 = getRandomElement(simpleDenominators);
    denom2 = getRandomElement(simpleDenominators.filter(d => d !== denom1));
  }

  // Create fractions with numerator 1 for simplicity
  const fraction1 = `${denom1}`;
  const fraction2 = `${denom2}`;

  return {
    fractions: [fraction1, fraction2] as [string, string],
    denominators: [denom1, denom2] as [number, number]
  };
};

// Helper function to get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Calculate the Greatest Common Divisor (GCD) using Euclidean algorithm
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Calculate the Least Common Multiple (LCM)
const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};
