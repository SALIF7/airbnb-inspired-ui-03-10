
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X } from 'lucide-react';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'cancelled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`${
        status === 'confirmed'
          ? 'bg-green-100 text-green-800 border-green-200'
          : status === 'pending'
          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
          : 'bg-red-100 text-red-800 border-red-200'
      }`}
    >
      {status === 'confirmed' ? (
        <>
          <Check className="mr-1 h-3.5 w-3.5" />
          Confirmée
        </>
      ) : status === 'pending' ? (
        <>
          <Clock className="mr-1 h-3.5 w-3.5" />
          En attente
        </>
      ) : (
        <>
          <X className="mr-1 h-3.5 w-3.5" />
          Annulée
        </>
      )}
    </Badge>
  );
};

export default StatusBadge;
