
import React from 'react';
import { Home, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const FeaturesSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-24 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-sholom-dark mb-4">
          {t('recommended_places')}
        </h2>
        <p className="text-sholom-muted text-lg max-w-2xl mx-auto">
          {t('premium_housing')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Home className="h-8 w-8" />,
            title: t('verified_housing'),
            description: t('verified_housing')
          },
          {
            icon: <Shield className="h-8 w-8" />,
            title: t('secure_payments'),
            description: t('secure_payments')
          },
          {
            icon: <CheckCircle className="h-8 w-8" />,
            title: t('local_support'),
            description: t('local_support')
          }
        ].map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover-shadow transition-all flex flex-col items-center text-center"
          >
            <div className="bg-sholom-primary/10 text-sholom-primary p-3 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-sholom-dark mb-2">
              {feature.title}
            </h3>
            <p className="text-sholom-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
