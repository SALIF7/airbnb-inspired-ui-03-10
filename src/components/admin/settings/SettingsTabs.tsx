
import React from 'react';
import { SiteSettings } from '@/types/siteSettings';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSettingsTab } from './GeneralSettingsTab';
import { CompanySettingsTab } from './CompanySettingsTab';
import { ContentSettingsTab } from './ContentSettingsTab';
import { NotificationSettingsTab } from './NotificationSettingsTab';
import { SocialSettingsTab } from './SocialSettingsTab';
import { ThemeSettingsTab } from './ThemeSettingsTab';
import { FooterSettingsTab } from './FooterSettingsTab';
import { ImportExportTab } from './ImportExportTab';
import { AdminStatusManager } from '../status/AdminStatusManager';
import { useTabsManagement } from './hooks/useTabsManagement';

export interface SettingsTabsProps {
  settings: SiteSettings;
  isMobileView?: boolean;
  showTabsContent?: boolean;
  setShowTabsContent?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({
  settings,
  isMobileView = false,
  showTabsContent = true,
  setShowTabsContent
}) => {
  const {
    handleInputChange,
    handleFooterChange,
    handleCompanyInfoChange,
    handleSocialLinksChange,
    handleNestedChange,
    handleThemeColorChange,
    logoUrl,
    logoUploading,
    faviconUrl,
    faviconUploading,
    handleLogoUpload,
    handleFaviconUpload,
    importSettings,
    exportSettings
  } = useTabsManagement(settings);

  return (
    <Tabs defaultValue="general" className="w-full overflow-x-auto">
      <div className="w-full overflow-x-auto pb-2">
        <TabsList className="grid md:grid-cols-9 grid-cols-3 md:grid-rows-1 grid-rows-3 h-auto mb-2 w-full">
          <TabsTrigger value="general" className="text-xs md:text-sm">Général</TabsTrigger>
          <TabsTrigger value="theme" className="text-xs md:text-sm">Apparence</TabsTrigger>
          <TabsTrigger value="company" className="text-xs md:text-sm">Entreprise</TabsTrigger>
          <TabsTrigger value="footer" className="text-xs md:text-sm">Pied de page</TabsTrigger>
          <TabsTrigger value="social" className="text-xs md:text-sm">Réseaux sociaux</TabsTrigger>
          <TabsTrigger value="notification" className="text-xs md:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="content" className="text-xs md:text-sm">Contenu</TabsTrigger>
          <TabsTrigger value="status" className="text-xs md:text-sm">Statut</TabsTrigger>
          <TabsTrigger value="import-export" className="text-xs md:text-sm">Import/Export</TabsTrigger>
        </TabsList>
      </div>
      
      <div className="overflow-x-hidden mt-4">
        <TabsContent value="general">
          <GeneralSettingsTab 
            settings={settings} 
            handleInputChange={handleInputChange} 
          />
        </TabsContent>
        
        <TabsContent value="theme">
          <ThemeSettingsTab 
            settings={settings}
            logoUrl={logoUrl}
            logoUploading={logoUploading}
            faviconUrl={faviconUrl}
            faviconUploading={faviconUploading}
            handleLogoUpload={handleLogoUpload}
            handleFaviconUpload={handleFaviconUpload}
            handleThemeColorChange={handleThemeColorChange}
            handleInputChange={handleInputChange}
          />
        </TabsContent>
        
        <TabsContent value="company">
          <CompanySettingsTab 
            settings={settings} 
            handleCompanyInfoChange={handleCompanyInfoChange} 
          />
        </TabsContent>
        
        <TabsContent value="footer">
          <FooterSettingsTab 
            settings={settings} 
            handleFooterChange={handleFooterChange} 
          />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialSettingsTab 
            settings={settings} 
            handleSocialLinkChange={handleSocialLinksChange}
          />
        </TabsContent>
        
        <TabsContent value="notification">
          <NotificationSettingsTab 
            settings={settings} 
            handleChange={handleInputChange} 
            handleNestedChange={handleNestedChange}
          />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentSettingsTab />
        </TabsContent>
        
        <TabsContent value="status">
          <AdminStatusManager />
        </TabsContent>
        
        <TabsContent value="import-export">
          <ImportExportTab 
            onImport={importSettings}
            onExport={exportSettings}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
