
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReservationsTabContent } from '@/components/reservations/ReservationsTabContent';
import { useReservationsPage } from '@/components/reservations/useReservationsPage';

const UserReservations = () => {
  const {
    isLoading,
    upcoming,
    past,
    cancelled,
    handleViewDetails,
    handleCancelReservation
  } = useReservationsPage();

  if (isLoading) {
    return <div className="p-8 text-center">Chargement des réservations...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8 mt-8">Mes réservations</h1>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">À venir ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Passées ({past.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées ({cancelled.length})</TabsTrigger>
          </TabsList>
          
          <ReservationsTabContent 
            value="upcoming"
            reservations={upcoming}
            emptyTitle="Aucune réservation à venir"
            emptyDescription="Vous n'avez pas de réservations prévues pour le moment."
            onViewDetails={handleViewDetails}
            onCancel={handleCancelReservation}
          />
          
          <ReservationsTabContent 
            value="past"
            reservations={past}
            emptyTitle="Aucune réservation passée"
            emptyDescription="Vous n'avez pas encore effectué de réservation."
            onViewDetails={handleViewDetails}
          />
          
          <ReservationsTabContent 
            value="cancelled"
            reservations={cancelled}
            emptyTitle="Aucune réservation annulée"
            emptyDescription="Vous n'avez pas de réservations annulées."
            onViewDetails={handleViewDetails}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default UserReservations;
