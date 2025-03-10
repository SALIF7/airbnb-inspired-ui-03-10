
import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  formatPublishDate, 
  getDomainImage, 
  translateDomain, 
  translateContract, 
  formatPriceFCFA 
} from './utils/jobUtils';

interface JobCardProps {
  job: Job;
  itemVariants: any;
}

export const JobCard = ({ job, itemVariants }: JobCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover-shadow transition-all duration-300 group"
      variants={itemVariants}
    >
      <Link to={`/emploi/${job.id}`} className="block p-0">
        <div className="lg:flex">
          {/* Image représentative du poste */}
          <div className="lg:w-1/4 h-48 lg:h-auto relative overflow-hidden">
            <img 
              src={job.images?.[0] || getDomainImage(job.domain)}
              alt={job.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {job.isHousingOffer && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-sholom-accent text-white">Logement</Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Informations de l'offre */}
          <div className="lg:w-3/4 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center text-sholom-muted mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formatPublishDate(job.publishDate)}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {translateDomain(job.domain)}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-sholom-dark mb-2 group-hover:text-sholom-primary transition-colors">
                  {job.title}
                </h3>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-sholom-primary mr-1" />
                  <span className="text-sm text-sholom-muted">{job.location}</span>
                </div>
                
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {job.description}
                </p>
              </div>
              
              <div className="md:text-right">
                {job.isHousingOffer ? (
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-sholom-primary">
                      {formatPriceFCFA(job.price || 0)} FCFA
                    </div>
                    <div className="text-sm text-gray-500">par mois</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-sholom-primary">
                      {formatPriceFCFA(job.salary.amount)} FCFA
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.salary.currency === 'EUR' ? 'par mois' : 'par mois'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <JobCardFooter job={job} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

interface JobCardFooterProps {
  job: Job;
}

const JobCardFooter = ({ job }: JobCardFooterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        {!job.isHousingOffer && (
          <Badge variant="secondary" className="font-normal">
            {translateContract(job.contract)}
          </Badge>
        )}
        {job.isHousingOffer ? (
          <>
            {job.bedrooms && (
              <Badge variant="secondary" className="font-normal">
                {job.bedrooms} chambre{job.bedrooms > 1 ? 's' : ''}
              </Badge>
            )}
            {job.bathrooms && (
              <Badge variant="secondary" className="font-normal">
                {job.bathrooms} salle{job.bathrooms > 1 ? 's' : ''} de bain
              </Badge>
            )}
          </>
        ) : (
          <Badge variant="secondary" className="font-normal">
            {job.positions} poste{job.positions > 1 ? 's' : ''}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">
          Date limite: {new Date(job.deadline).toLocaleDateString('fr-FR')}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 text-sholom-primary group-hover:bg-sholom-primary/10"
        >
          Voir les détails
          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
