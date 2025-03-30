import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { COLORS } from '@/constants/ui';
import { cn } from '@/lib/utils';

interface HopperButtonProps {
  direction: 'back' | 'forward';
  colorScheme: 'PURPLE' | 'BLUE';
  onClick: () => void;
  disabled?: boolean;
}

const HopperButton: React.FC<HopperButtonProps> = ({
  direction,
  colorScheme,
  onClick,
  disabled = false
}) => {
  const Icon = direction === 'back' ? ArrowLeft : ArrowRight;
  const buttonClasses = cn(
    COLORS[colorScheme].BUTTON.BASE,
    COLORS[colorScheme].BUTTON.HOVER
  );

  return (
    <Button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {direction === 'back' && <Icon className="mr-2" size={16} />}
      {direction === 'back' ? 'Back' : 'Hop'}
      {direction === 'forward' && <Icon className="ml-2" size={16} />}
    </Button>
  );
};

export default HopperButton; 