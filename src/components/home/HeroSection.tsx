import React from 'react';
import { Briefcase, Home, Building, Shield, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LOME_NEIGHBORHOODS } from '@/hooks/useListings';
import { MagicBook } from '@/components/ui/magic-book';
import { useLanguage } from '@/hooks/useLanguage';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleFindListing = () => {
    navigate('/', { state: { focusSearch: true } });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-sholom-light to-blue-50 pt-28 pb-16 relative">
        <div className="absolute right-8 bottom-8 transform z-10 hidden md:block">
          <MagicBook 
            position="bottom-right"
            isOpen={false}
            title={t('housing_in_africa')}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="lg:w-1/2 space-y-6" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-sholom-dark leading-tight">
                {t('discover_home')} <span className="text-sholom-primary italic">chez-vous</span> à Lomé
              </h1>
              <p className="text-xl text-sholom-muted max-w-2xl">
                {t('premium_housing')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-sholom-primary hover:bg-sholom-primary/90 text-white font-medium"
                  onClick={handleFindListing}
                >
                  {t('find_housing')}
                </Button>
                <Link to="/emplois">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="font-medium"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    {t('job_offers')}
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8">
                <p className="text-sholom-dark font-medium mb-3">{t('popular_neighborhoods')}</p>
                <div className="flex flex-wrap gap-2">
                  {LOME_NEIGHBORHOODS.slice(0, 5).map((neighborhood, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="bg-white/70 hover:bg-sholom-primary/10"
                      onClick={() => navigate('/', { state: { searchTerm: neighborhood } })}
                    >
                      <MapPin className="h-3.5 w-3.5 mr-1 text-sholom-primary" />
                      {neighborhood}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: <Home className="h-5 w-5" />, text: t('verified_housing') },
                  { icon: <Shield className="h-5 w-5" />, text: t('secure_payments') },
                  { icon: <Building className="h-5 w-5" />, text: t('local_support') }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sholom-dark">
                    <div className="text-sholom-primary">{benefit.icon}</div>
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className="lg:w-1/2 relative" variants={itemVariants}>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-sholom-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sholom-primary/20 rounded-full blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/8f046947-6e09-442a-88f9-2f82a0a50910.png" 
                  alt="Shalom Security" 
                  className="w-full h-auto object-cover rounded-2xl hover-scale aspect-[16/9]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center text-white gap-4">
                    <div>
                      <p className="text-lg font-medium">{t('premium_villa')}</p>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Tokoin, Lomé</span>
                      </div>
                    </div>
                    <div className="ml-auto bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                      <span className="font-semibold">1.200.000 FCFA</span> / mois
                    </div>
                  </div>
                </div>
                
                <div className="absolute right-3 bottom-3 z-10 md:hidden">
                  <MagicBook 
                    position="bottom-right"
                    title={t('housing_in_africa')}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
