
import React from 'react';
import { SiteSettings } from '@/types/siteSettings';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FooterSettingsTabProps {
  settings: SiteSettings;
  handleFooterChange: (field: keyof SiteSettings['footer'], value: string) => void;
}

export const FooterSettingsTab: React.FC<FooterSettingsTabProps> = ({
  settings,
  handleFooterChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres du pied de page</CardTitle>
        <CardDescription>Modifiez le contenu du pied de page de votre site.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Label htmlFor="contact">Contact</Label>
          <Textarea
            id="contact"
            defaultValue={settings.footer.contact}
            onChange={(e) => handleFooterChange('contact', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="about">À propos</Label>
          <Textarea
            id="about"
            defaultValue={settings.footer.about}
            onChange={(e) => handleFooterChange('about', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="terms">Conditions d'utilisation</Label>
          <Textarea
            id="terms"
            defaultValue={settings.footer.terms}
            onChange={(e) => handleFooterChange('terms', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="policy">Politique de confidentialité</Label>
          <Textarea
            id="policy"
            defaultValue={settings.footer.policy}
            onChange={(e) => handleFooterChange('policy', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
