import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import HopperButton from './HopperButton';
import { COLORS, LAYOUT, TYPOGRAPHY } from '@/constants/ui';
import { Problem } from '@/types';
import { HopperIndex } from '@/types';

interface ControlPanelProps {
  problem: Problem;
  onHop: (hopperIndex: HopperIndex) => void;
  onBack: (hopperIndex: HopperIndex) => void;
  onNewProblem: () => void;
  lcd: number | null;
  positions: [number, number];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  problem,
  onHop,
  onBack,
  onNewProblem,
  lcd,
  positions
}) => {
  const renderHopperControl = (index: HopperIndex, colorScheme: 'PURPLE' | 'BLUE') => (
    <div className={`${LAYOUT.FLEX.COL_CENTER} space-y-4 ${LAYOUT.SPACING.PADDING} ${COLORS[colorScheme].BG} rounded-lg`}>
      <div className={`${TYPOGRAPHY.FRACTION} ${COLORS[colorScheme].TEXT}`}>
        {problem.fractions[index]}
      </div>
      <div className={LAYOUT.FLEX.GAP}>
        <HopperButton
          direction="back"
          colorScheme={colorScheme}
          onClick={() => onBack(index)}
          disabled={lcd !== null || positions[index] === 0}
        />
        <HopperButton
          direction="forward"
          colorScheme={colorScheme}
          onClick={() => onHop(index)}
          disabled={lcd !== null}
        />
      </div>
    </div>
  );

  return (
    <div className={`${LAYOUT.GRID.CONTAINER} ${LAYOUT.SPACING.GAP}`}>
      {renderHopperControl(HopperIndex.First, 'PURPLE')}
      {renderHopperControl(HopperIndex.Second, 'BLUE')}

      <div className={`md:col-span-2 ${LAYOUT.FLEX.CENTER} ${LAYOUT.SPACING.MARGIN.TOP}`}>
        <Button
          onClick={onNewProblem}
          variant="outline"
          className="border-gray-300"
        >
          <RefreshCw className="mr-2" size={16} />
          New Problem
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
