
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ContractFieldsProps {
  contract: string;
  setContract: (value: string) => void;
}

export const ContractFields: React.FC<ContractFieldsProps> = ({
  contract,
  setContract
}) => {
  return (
    <div>
      <Label htmlFor="contract" className="block text-sm font-medium mb-1">
        Type de contrat <span className="text-red-500">*</span>
      </Label>
      <Select value={contract} onValueChange={setContract}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un type de contrat" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full_time">CDI</SelectItem>
          <SelectItem value="part_time">Temps partiel</SelectItem>
          <SelectItem value="contract">CDD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
