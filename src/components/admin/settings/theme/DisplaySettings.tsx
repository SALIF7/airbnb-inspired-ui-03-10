
import React from 'react';
import { SiteSettings } from '@/types/siteSettings';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DisplaySettingsProps {
  settings: SiteSettings;
  handleInputChange: (field: keyof SiteSettings, value: any) => void;
}

export const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  settings,
  handleInputChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={settings.darkMode}
        onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
        id="darkMode"
      />
      <Label htmlFor="darkMode">Mode sombre</Label>
    </div>
  );
};
