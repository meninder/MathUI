export enum HopperIndex {
  First = 0,
  Second = 1
}

export interface Problem {
  fractions: [string, string];
  denominators: [number, number];
}

export interface HopperState {
  positions: [number, number];
  multiples: [number[], number[]];
  lcd: number | null;
  maxValue: number;
}

export interface HopperProps {
  hopperIndex: HopperIndex;
  position: number;
  color: string;
  denominator: number;
}

export interface NumberLineProps {
  maxValue: number;
  multiples: number[];
  color: string;
  lcd: number | null;
} 