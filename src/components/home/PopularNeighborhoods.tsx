
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PopularNeighborhoodsProps {
  setSearchTerm: (term: string) => void;
}

export const PopularNeighborhoods = ({ setSearchTerm }: PopularNeighborhoodsProps) => {
  const neighborhoods = ['Tokoin', 'Bè', 'Adidogomé', 'Agoè', 'Kodjoviakopé', 'Nyékonakpoè', 'Hédzranawoé', 'Baguida'];
  
  return (
    <div className="mt-4 mb-4 w-full px-1 py-2">
      <div className="w-full">
        <h2 className="text-2xl font-serif font-bold text-sholom-dark mb-3">
          Quartiers populaires à Lomé
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2">
          {neighborhoods.map(neighborhood => (
            <Button 
              key={neighborhood}
              variant="outline"
              className="py-3 text-base justify-start border-gray-200 hover:border-sholom-primary hover:bg-sholom-primary/5 transition-colors"
              onClick={() => setSearchTerm(neighborhood)}
            >
              <MapPin className="mr-2 h-4 w-4 text-sholom-primary" />
              {neighborhood}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
