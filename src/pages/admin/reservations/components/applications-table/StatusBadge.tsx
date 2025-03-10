
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X } from 'lucide-react';

interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`${
        status === 'approved'
          ? 'bg-green-100 text-green-800 border-green-200'
          : status === 'pending'
          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
          : 'bg-red-100 text-red-800 border-red-200'
      }`}
    >
      {status === 'approved' ? (
        <>
          <Check className="mr-1 h-3.5 w-3.5" />
          Acceptée
        </>
      ) : status === 'pending' ? (
        <>
          <Clock className="mr-1 h-3.5 w-3.5" />
          En attente
        </>
      ) : (
        <>
          <X className="mr-1 h-3.5 w-3.5" />
          Refusée
        </>
      )}
    </Badge>
  );
};

export default StatusBadge;
