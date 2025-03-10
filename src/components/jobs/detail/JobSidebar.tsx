
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Job } from '@/types/job';
import { SiteSettings } from '@/types/siteSettings';

interface JobSidebarProps {
  settings: SiteSettings;
  similarJobs: Job[];
  getDomainImage: (domain: string) => string;
}

const JobSidebar = ({ settings, similarJobs, getDomainImage }: JobSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 rounded-full p-3 mr-3">
            <Building className="h-6 w-6 text-sholom-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sholom-dark">{settings.siteName}</h3>
            <p className="text-sm text-gray-500">{settings.footer.contact}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{settings.companyInfo?.address || "Lomé, Togo"}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-gray-400 mr-2" />
            <span>{settings.companyInfo?.email || "contact@sholom.com"}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-gray-400 mr-2" />
            <span>{settings.companyInfo?.phone || "+228 00 00 00 00"}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
          Voir le profil
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-bold text-sholom-dark mb-4">Offres similaires</h3>
        <div className="space-y-4">
          {similarJobs.length > 0 ? (
            similarJobs.map(similarJob => (
              <Link 
                key={similarJob.id} 
                to={`/emploi/${similarJob.id}`}
                className="block group"
              >
                <motion.div 
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={similarJob.images?.[0] || getDomainImage(similarJob.domain)} 
                      alt={similarJob.title} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sholom-dark group-hover:text-sholom-primary transition-colors">
                      {similarJob.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{similarJob.location}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-sholom-primary transition-colors transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucune offre similaire disponible.</p>
          )}
        </div>
        
        <Link to="/emplois">
          <Button variant="link" className="mt-2 w-full text-sholom-primary">
            Voir toutes les offres
          </Button>
        </Link>
      </div>
      
      <div className="bg-gradient-to-br from-sholom-primary to-sholom-secondary rounded-xl shadow-sm p-6 text-white">
        <h3 className="font-bold text-xl mb-2">
          Trouvez votre prochaine opportunité
        </h3>
        <p className="text-white/80 mb-4">
          Ne manquez pas les offres d'emploi et logements disponibles.
        </p>
        <Link to="/emplois">
          <Button 
            className="w-full bg-white text-sholom-primary hover:bg-white/90"
          >
            Voir toutes les offres
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobSidebar;
