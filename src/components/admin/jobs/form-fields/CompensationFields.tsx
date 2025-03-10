
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompensationFieldsProps {
  salary: number;
  setSalary: (value: number) => void;
  positions: number;
  setPositions: (value: number) => void;
  isHousingOffer?: boolean;
  price?: number;
  setPrice?: (value: number) => void;
}

export const CompensationFields: React.FC<CompensationFieldsProps> = ({
  salary,
  setSalary,
  positions,
  setPositions,
  isHousingOffer = false,
  price = 0,
  setPrice
}) => {
  return (
    <>
      {isHousingOffer ? (
        <div>
          <Label htmlFor="price" className="block text-sm font-medium mb-1">
            Prix (€) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice && setPrice(Number(e.target.value))}
            placeholder="Prix du logement en euros"
            min="0"
            step="0.01"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Prix en FCFA: {Math.round(price * 655.957).toLocaleString('fr-FR')} FCFA</p>
        </div>
      ) : (
        <>
          <div>
            <Label htmlFor="salary" className="block text-sm font-medium mb-1">
              Salaire (€) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              placeholder="Salaire mensuel en euros"
              min="0"
              step="0.01"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Salaire en FCFA: {Math.round(salary * 655.957).toLocaleString('fr-FR')} FCFA</p>
          </div>

          <div>
            <Label htmlFor="positions" className="block text-sm font-medium mb-1">
              Nombre de postes <span className="text-red-500">*</span>
            </Label>
            <Input
              id="positions"
              type="number"
              value={positions}
              onChange={(e) => setPositions(Number(e.target.value))}
              placeholder="Nombre de postes disponibles"
              min="1"
              step="1"
              required
            />
          </div>
        </>
      )}
    </>
  );
};
