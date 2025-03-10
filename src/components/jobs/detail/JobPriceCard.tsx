
import React from 'react';

interface JobPriceCardProps {
  isHousingOffer: boolean;
  price?: number;
  salary: {
    amount: number;
  };
  formatPriceFCFA: (price: number) => string;
}

const JobPriceCard = ({ 
  isHousingOffer, 
  price = 0, 
  salary, 
  formatPriceFCFA 
}: JobPriceCardProps) => {
  return (
    <div className="mb-8 bg-sholom-primary/5 rounded-lg p-4 border border-sholom-primary/20">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sholom-dark">
          {isHousingOffer ? 'Prix du logement' : 'Rémunération'}
        </h3>
        <div className="text-xl font-bold text-sholom-primary">
          {isHousingOffer ? (
            <>{formatPriceFCFA(price)} FCFA<span className="text-sm font-normal text-gray-500 ml-1">/ mois</span></>
          ) : (
            <>{formatPriceFCFA(salary.amount)} FCFA<span className="text-sm font-normal text-gray-500 ml-1">/ mois</span></>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPriceCard;
