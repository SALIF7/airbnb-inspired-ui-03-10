
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ListingCard } from '@/components/listing-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListings } from '@/hooks/useListings';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Favorites = () => {
  const { listings } = useListings();
  const { user } = useAuth();
  
  // Dans une application réelle, vous récupéreriez les favoris depuis une API
  // Pour cette démo, nous utilisons des données simulées
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      // Simuler des favoris avec 3 annonces aléatoires
      const randomListings = [...listings]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      return randomListings;
    },
    enabled: !!listings.length,
  });
  
  const { data: savedJobs = [] } = useQuery({
    queryKey: ['savedJobs'],
    queryFn: async () => {
      // Simuler des emplois sauvegardés
      return [];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-8">
          <h1 className="text-3xl font-bold">Mes favoris</h1>
        </div>
        
        <Tabs defaultValue="logements">
          <TabsList className="mb-8">
            <TabsTrigger value="logements">Logements</TabsTrigger>
            <TabsTrigger value="emplois">Offres d'emploi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logements">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun favori</h3>
                <p className="text-gray-500 mb-6">
                  Vous n'avez pas encore ajouté de logements à vos favoris.
                </p>
                <Button asChild>
                  <a href="/">Découvrir des logements</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="emplois">
            <div className="text-center p-12 border border-dashed rounded-lg">
              <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune offre d'emploi sauvegardée</h3>
              <p className="text-gray-500 mb-6">
                Vous n'avez pas encore ajouté d'offres d'emploi à vos favoris.
              </p>
              <Button asChild>
                <a href="/emplois">Voir les offres d'emploi</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Favorites;
