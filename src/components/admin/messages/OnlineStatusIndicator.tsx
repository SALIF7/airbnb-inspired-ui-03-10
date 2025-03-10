
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cva } from 'class-variance-authority';

interface OnlineStatusIndicatorProps {
  isOnline: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const indicatorStyles = cva(
  "rounded-full inline-block", 
  {
    variants: {
      size: {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4"
      },
      status: {
        online: "bg-green-500",
        offline: "bg-gray-400"
      }
    },
    defaultVariants: {
      size: "md",
      status: "offline"
    }
  }
);

export const OnlineStatusIndicator: React.FC<OnlineStatusIndicatorProps> = ({ 
  isOnline, 
  showLabel = false,
  size = 'md'
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <span 
        className={indicatorStyles({ 
          size, 
          status: isOnline ? 'online' : 'offline'
        })}
      />
      
      {showLabel && (
        <span className="text-xs">
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </span>
      )}
    </div>
  );
};

export const OnlineStatusBadge: React.FC<Omit<OnlineStatusIndicatorProps, 'size'>> = ({
  isOnline,
  showLabel = true
}) => {
  return (
    <Badge 
      variant="outline" 
      className={`${isOnline ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}
    >
      <div className="flex items-center gap-1.5">
        <span 
          className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
        />
        {showLabel && (
          <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
        )}
      </div>
    </Badge>
  );
};
