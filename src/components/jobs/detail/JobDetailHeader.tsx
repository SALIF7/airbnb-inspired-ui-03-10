
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobDetailHeaderProps {
  title: string;
  location: string;
  domain: string;
  status: string;
  isHousingOffer: boolean;
  image: string;
  translateDomain: (domain: string) => string;
  getDomainImage: (domain: string) => string;
}

const JobDetailHeader = ({
  title,
  location,
  domain,
  status,
  isHousingOffer,
  image,
  translateDomain,
  getDomainImage
}: JobDetailHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="hover:bg-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour aux offres
        </Button>
      </div>
      
      <div className="relative h-56 sm:h-72 md:h-96 bg-gray-200 overflow-hidden rounded-t-2xl">
        <img 
          src={image || getDomainImage(domain)} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2">
            <Badge className="bg-sholom-primary text-white border-none">
              {isHousingOffer ? 'Logement' : translateDomain(domain)}
            </Badge>
            {status === 'active' ? (
              <Badge className="ml-2 bg-green-500 text-white border-none">
                Disponible
              </Badge>
            ) : (
              <Badge className="ml-2 bg-red-500 text-white border-none">
                Clôturée
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center text-white/80">
            <span>{location}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailHeader;
