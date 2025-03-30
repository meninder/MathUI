export const UI = {
  COLORS: {
    PURPLE: 'purple',
    BLUE: 'blue',
    BACKGROUND: {
      FROM: 'from-purple-50',
      TO: 'to-blue-50'
    }
  },
  SPACING: {
    PADDING: {
      MOBILE: 'p-4',
      DESKTOP: 'md:p-6'
    },
    MARGIN: {
      BOTTOM: {
        SMALL: 'mb-2',
        MEDIUM: 'mb-6'
      }
    }
  },
  TYPOGRAPHY: {
    HEADING: {
      MOBILE: 'text-3xl',
      DESKTOP: 'md:text-4xl'
    }
  }
} as const;

export const MATH = {
  MIN_MAX_VALUE: 24,
  MAX_VALUE_MULTIPLIER: 3,
  MAX_LCD: 40,
  SIMPLE_DENOMINATORS: [2, 3, 4, 5, 6, 8, 10] as const,
  DEFAULT_NUMERATOR: 1
} as const; 