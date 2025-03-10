
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface BasicInfoFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  domain: string;
  setDomain: (value: string) => void;
  isHousingOffer?: boolean;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  title,
  setTitle,
  domain,
  setDomain,
  isHousingOffer = false
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium mb-1">
          Titre <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'offre"
          required
        />
      </div>

      {!isHousingOffer && (
        <div>
          <Label htmlFor="domain" className="block text-sm font-medium mb-1">
            Domaine <span className="text-red-500">*</span>
          </Label>
          <Select value={domain} onValueChange={setDomain}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un domaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential_security">Sécurité résidentielle</SelectItem>
              <SelectItem value="bodyguard">Garde du corps</SelectItem>
              <SelectItem value="private_property">Surveillance propriétés privées</SelectItem>
              <SelectItem value="industrial_security">Sécurité industrielle</SelectItem>
              <SelectItem value="office_security">Sécurité de bureau</SelectItem>
              <SelectItem value="security_patrol">Patrouilleur</SelectItem>
              <SelectItem value="access_control">Contrôle d'accès</SelectItem>
              <SelectItem value="security_systems">Opérateur systèmes</SelectItem>
              <SelectItem value="construction_security">Sécurité chantier</SelectItem>
              <SelectItem value="site_supervisor">Surveillant travaux</SelectItem>
              <SelectItem value="security_coordinator">Coordinateur sécurité</SelectItem>
              <SelectItem value="event_security">Sécurité événementielle</SelectItem>
              <SelectItem value="k9_security">Maître-chien</SelectItem>
              <SelectItem value="security_manager">Responsable sécurité</SelectItem>
              <SelectItem value="security_consultant">Consultant sécurité</SelectItem>
              <SelectItem value="security_trainer">Formateur sécurité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
