
import React from 'react';
import { Briefcase, CalendarDays, Clock, Home } from 'lucide-react';

interface JobInfoCardsProps {
  contract: string;
  publishDate: string;
  deadline: string;
  isHousingOffer: boolean;
  translateContract: (contract: string) => string;
}

const JobInfoCards = ({
  contract,
  publishDate,
  deadline,
  isHousingOffer,
  translateContract
}: JobInfoCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 rounded-lg p-4 flex items-start">
        <div className="bg-sholom-primary/10 p-2 rounded-full mr-3">
          {isHousingOffer ? (
            <Home className="h-5 w-5 text-sholom-primary" />
          ) : (
            <Briefcase className="h-5 w-5 text-sholom-primary" />
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-medium">
            {isHousingOffer ? 'Logement' : translateContract(contract)}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-start">
        <div className="bg-sholom-primary/10 p-2 rounded-full mr-3">
          <CalendarDays className="h-5 w-5 text-sholom-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Publiée le</p>
          <p className="font-medium">
            {new Date(publishDate).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-start">
        <div className="bg-sholom-primary/10 p-2 rounded-full mr-3">
          <Clock className="h-5 w-5 text-sholom-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Date limite</p>
          <p className="font-medium">
            {new Date(deadline).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobInfoCards;
