
import React from 'react';
import { Building, BriefcaseBusiness, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const JobsFeatures = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-sholom-dark mb-4">
            {t('security_jobs')}
          </h2>
          <p className="text-sholom-muted text-lg max-w-2xl mx-auto">
            {t('premium_housing')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Building className="h-8 w-8" />,
              title: t('housing_included'),
              description: t('housing_included')
            },
            {
              icon: <BriefcaseBusiness className="h-8 w-8" />,
              title: t('job_description'),
              description: t('job_description')
            },
            {
              icon: <CheckCircle className="h-8 w-8" />,
              title: t('benefits'),
              description: t('benefits')
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hover-shadow transition-all flex flex-col items-center text-center"
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
    </div>
  );
};
