import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SetupContainerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  isInitialLoad?: boolean;
}

export const SetupContainer: React.FC<SetupContainerProps> = ({
  children,
  className,
  title,
  description,
  isInitialLoad = false
}) => {
  const containerClasses = cn(
    "w-full max-w-md p-6",
    isInitialLoad ? "opacity-0" : "animate-scale-up",
    className
  );

  return (
    <Card className={containerClasses}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="space-y-8">
          {children}
        </div>
      </div>
    </Card>
  );
};
