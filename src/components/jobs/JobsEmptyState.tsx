
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobsEmptyStateProps {
  onResetFilters: () => void;
}

export const JobsEmptyState = ({ onResetFilters }: JobsEmptyStateProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
      <p className="text-gray-500 mb-6">
        Aucune offre ne correspond à vos critères de recherche.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button 
          variant="outline" 
          onClick={onResetFilters}
        >
          Réinitialiser les filtres
        </Button>
        <Link to="/">
          <Button className="bg-sholom-primary hover:bg-sholom-primary/90">
            <Home className="mr-2 h-4 w-4" />
            Voir les logements
          </Button>
        </Link>
      </div>
    </div>
  );
};
