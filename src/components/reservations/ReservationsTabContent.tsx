
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ReservationCard } from './ReservationCard';
import { EmptyState } from './EmptyState';
import { Reservation } from '@/hooks/reservations';

interface ReservationsTabContentProps {
  value: string;
  reservations: Reservation[];
  emptyTitle: string;
  emptyDescription: string;
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const ReservationsTabContent = ({
  value,
  reservations,
  emptyTitle,
  emptyDescription,
  onViewDetails,
  onCancel
}: ReservationsTabContentProps) => {
  return (
    <TabsContent value={value}>
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <ReservationCard 
              key={reservation.id} 
              reservation={reservation} 
              onViewDetails={onViewDetails}
              onCancel={onCancel}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title={emptyTitle} 
          description={emptyDescription} 
        />
      )}
    </TabsContent>
  );
};
