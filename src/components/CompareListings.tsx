
import React, { useState, useEffect } from 'react';
import { useListings } from '@/hooks/useListings';
import { Link } from 'react-router-dom';
import { X, Scale, ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareListings = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { listings } = useListings();
  const [compareListings, setCompareListings] = useState<any[]>([]);

  // Charger les IDs depuis le localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedIds = localStorage.getItem('compareListings');
      if (storedIds) {
        try {
          const ids = JSON.parse(storedIds);
          setCompareIds(ids);
          setIsVisible(ids.length > 0);
        } catch (e) {
          console.error("Erreur lors de la récupération des logements à comparer:", e);
        }
      } else {
        setCompareIds([]);
        setIsVisible(false);
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Obtenir les détails des logements à comparer
  useEffect(() => {
    if (!listings || compareIds.length === 0) {
      setCompareListings([]);
      return;
    }

    const filteredListings = listings.filter(listing => compareIds.includes(listing.id));
    setCompareListings(filteredListings);
  }, [listings, compareIds]);

  // Supprimer un logement de la comparaison
  const removeListing = (id: string) => {
    const updatedIds = compareIds.filter(compareId => compareId !== id);
    localStorage.setItem('compareListings', JSON.stringify(updatedIds));
    
    // Mettre à jour l'état local
    setCompareIds(updatedIds);
    
    // Masquer le panneau si plus aucun logement à comparer
    if (updatedIds.length === 0) {
      setIsVisible(false);
    }
    
    // Déclencher un événement pour que les autres composants puissent réagir
    window.dispatchEvent(new Event('storage'));
  };

  // Vider la comparaison
  const clearComparison = () => {
    localStorage.removeItem('compareListings');
    setCompareIds([]);
    setIsVisible(false);
    window.dispatchEvent(new Event('storage'));
  };

  // Affichage du prix en FCFA
  const formatPriceFCFA = (priceEUR: number): string => {
    const priceFCFA = Math.round(priceEUR * 655.957);
    return priceFCFA.toLocaleString('fr-FR');
  };

  // Animations
  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 500 }
    },
    exit: { 
      y: 100, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="compare-panel"
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Scale className="h-5 w-5 text-sholom-primary mr-2" />
                <h3 className="text-lg font-semibold">
                  Comparer ({compareListings.length} logement{compareListings.length > 1 ? 's' : ''})
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearComparison}
                  className="text-sholom-muted hover:text-red-500"
                >
                  Vider
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsVisible(false)}
                  className="text-sholom-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {compareListings.map((listing) => (
                <motion.div 
                  key={listing.id}
                  className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover-shadow transition-all"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <button
                    onClick={() => removeListing(listing.id)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 z-10 hover:bg-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <Link to={`/logement/${listing.id}`} className="flex flex-col h-full">
                    <div className="relative h-32">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between text-white">
                          <div className="text-sm truncate font-medium">{listing.title}</div>
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded px-1.5 py-0.5 text-xs">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-0.5" />
                            {listing.rating || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex-grow flex flex-col">
                      <div className="flex items-center text-sholom-muted text-xs mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {listing.location}
                      </div>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div className="text-sm font-semibold text-sholom-primary">
                          {formatPriceFCFA(listing.price)} FCFA
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-xs text-sholom-muted hover:text-sholom-primary flex items-center"
                        >
                          Détails <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              {Array.from({ length: 4 - compareListings.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-40 bg-gray-50"
                >
                  <p className="text-gray-400 text-sm">Ajoutez un logement</p>
                </div>
              ))}
            </div>
            
            {compareListings.length > 1 && (
              <div className="flex justify-center mt-4">
                <Link to="/compare">
                  <Button className="bg-sholom-primary hover:bg-sholom-primary/90">
                    Comparer en détail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
