
import React from "react";
import { Flag, Circle } from "lucide-react";

interface HopperProps {
  hopperIndex: 0 | 1;
  position: number;
  color: "purple" | "blue";
  denominator: number;
}

const Hopper: React.FC<HopperProps> = ({ 
  hopperIndex, 
  position, 
  color, 
  denominator 
}) => {
  const colorClasses = {
    purple: {
      text: "text-purple-700",
      bg: "bg-purple-100",
      border: "border-purple-300",
      icon: "text-purple-500"
    },
    blue: {
      text: "text-blue-700",
      bg: "bg-blue-100",
      border: "border-blue-300",
      icon: "text-blue-500"
    }
  };

  return (
    <div 
      className={`absolute transition-all duration-500 ease-bounce`}
      style={{ 
        left: `${position}%`, // This will be adjusted by the parent component
        top: "-15px",
        transform: "translateX(-50%)" 
      }}
    >
      <div className="relative">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${colorClasses[color].bg} ${colorClasses[color].border} border-2
          shadow-md transition-transform animate-bounce
        `}>
          {hopperIndex === 0 ? (
            <Circle className={`${colorClasses[color].icon}`} size={20} />
          ) : (
            <Flag className={`${colorClasses[color].icon}`} size={20} />
          )}
        </div>
        <div className={`
          absolute -top-5 left-1/2 transform -translate-x-1/2
          px-2 py-0.5 rounded-full text-xs font-bold
          ${colorClasses[color].bg} ${colorClasses[color].text}
        `}>
          {denominator}
        </div>
      </div>
    </div>
  );
};

export default Hopper;
