
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useLanguage } from '@/hooks/useLanguage';

export const PreferencesTab: React.FC = () => {
  const { settings, updateSettings } = useSiteSettings();
  const { t, language, setLanguage } = useLanguage();
  
  const savePreferences = () => {
    toast.success(t('save_preferences'));
  };

  const toggleDarkMode = (checked: boolean) => {
    updateSettings({ darkMode: checked });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as 'fr' | 'en';
    setLanguage(newLanguage);
    updateSettings({ language: newLanguage });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings')}</CardTitle>
        <CardDescription>{t('settings')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('email_notifications')}</h3>
              <p className="text-sm text-gray-500">{t('email_notifications')}</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('push_notifications')}</h3>
              <p className="text-sm text-gray-500">{t('push_notifications')}</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('dark_mode')}</h3>
              <p className="text-sm text-gray-500">{t('dark_mode')}</p>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('language_preference')}</h3>
              <p className="text-sm text-gray-500">{t('language_preference')}</p>
            </div>
            <select 
              className="border rounded-md p-1"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={savePreferences}>
          <Check className="h-4 w-4 mr-2" />
          {t('save_preferences')}
        </Button>
      </CardFooter>
    </Card>
  );
};
