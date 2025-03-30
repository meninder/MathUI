import { HopperIndex } from '@/types';
import Hopper from './Hopper';
import NumberLine from './NumberLine';
import { UI } from '@/constants';

interface HopperContainerProps {
  hopperIndex: HopperIndex;
  position: number;
  denominator: number;
  maxValue: number;
  multiples: number[];
  lcd: number | null;
}

const HopperContainer = ({
  hopperIndex,
  position,
  denominator,
  maxValue,
  multiples,
  lcd
}: HopperContainerProps) => {
  const color = hopperIndex === HopperIndex.First ? UI.COLORS.PURPLE : UI.COLORS.BLUE;

  return (
    <div className="relative">
      <Hopper
        hopperIndex={hopperIndex}
        position={position}
        color={color}
        denominator={denominator}
      />
      <NumberLine 
        maxValue={maxValue} 
        multiples={multiples} 
        color={color} 
        lcd={lcd}
      />
    </div>
  );
};

export default HopperContainer; 