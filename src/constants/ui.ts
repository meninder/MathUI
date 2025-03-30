export const COLORS = {
  PURPLE: {
    BG: 'bg-purple-50',
    TEXT: 'text-purple-700',
    BUTTON: {
      BASE: 'bg-purple-600',
      HOVER: 'hover:bg-purple-700'
    },
    LINE: {
      BASE: 'bg-purple-200',
      MARKER: 'bg-purple-500',
      HIGHLIGHT: 'bg-purple-300'
    }
  },
  BLUE: {
    BG: 'bg-blue-50',
    TEXT: 'text-blue-700',
    BUTTON: {
      BASE: 'bg-blue-600',
      HOVER: 'hover:bg-blue-700'
    },
    LINE: {
      BASE: 'bg-blue-200',
      MARKER: 'bg-blue-500',
      HIGHLIGHT: 'bg-blue-300'
    }
  }
} as const;

export const LAYOUT = {
  SPACING: {
    GAP: 'gap-6',
    PADDING: 'p-4',
    MARGIN: {
      TOP: 'mt-4',
      BOTTOM: 'mb-8'
    }
  },
  GRID: {
    CONTAINER: 'grid grid-cols-1 md:grid-cols-2',
  },
  FLEX: {
    CENTER: 'flex justify-center',
    COL_CENTER: 'flex flex-col items-center',
    GAP: 'gap-2'
  }
} as const;

export const TYPOGRAPHY = {
  FRACTION: 'text-2xl font-bold',
  TICK_MARK: 'text-xs text-gray-500'
} as const;

export type ColorScheme = keyof typeof COLORS; 