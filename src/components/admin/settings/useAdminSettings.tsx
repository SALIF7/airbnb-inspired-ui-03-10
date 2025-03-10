
import { useState, useCallback, useRef, useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { SiteSettings } from '@/types/siteSettings';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export function useAdminSettings() {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } = useSiteSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [logoUrl, setLogoUrl] = useState<string>(settings.logo === 'stored_separately' ? localStorage.getItem('site_logo') || "/placeholder.svg" : settings.logo || "/placeholder.svg");
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState<string>(settings.favicon === 'stored_separately' ? localStorage.getItem('site_favicon') || "/favicon.ico" : settings.favicon || "/favicon.ico");
  const [faviconUploading, setFaviconUploading] = useState(false);
  const navigate = useNavigate();
  
  // Synchronize local state with settings when they change
  useEffect(() => {
    if (settings.logo) {
      const logoSrc = settings.logo === 'stored_separately' 
        ? localStorage.getItem('site_logo') || "/placeholder.svg" 
        : settings.logo;
      setLogoUrl(logoSrc);
    }
    
    if (settings.favicon) {
      const faviconSrc = settings.favicon === 'stored_separately' 
        ? localStorage.getItem('site_favicon') || "/favicon.ico" 
        : settings.favicon;
      setFaviconUrl(faviconSrc);
    }
  }, [settings.logo, settings.favicon]);

  const handleLogoUpload = useCallback((file: File) => {
    setLogoUploading(true);
    
    // Create a preview URL and apply it immediately to see the change
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (result) {
        // Update locally for UI
        setLogoUrl(result);
        
        // Store in settings and explicitly in localStorage
        updateSettings({ logo: result });
        localStorage.setItem('site_logo', result);
        
        // Then simulate the server upload for persistent storage
        setTimeout(() => {
          setLogoUploading(false);
          toast.success("Logo mis à jour avec succès");
        }, 1000);
      }
    };
    
    fileReader.readAsDataURL(file);
  }, [updateSettings]);

  const handleFaviconUpload = useCallback((file: File) => {
    setFaviconUploading(true);
    
    // Create a preview URL and apply it immediately
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (result) {
        // Update locally for UI
        setFaviconUrl(result);
        
        // Store in settings and explicitly in localStorage
        updateSettings({ favicon: result });
        localStorage.setItem('site_favicon', result);
        
        // Then simulate the server upload
        setTimeout(() => {
          setFaviconUploading(false);
          toast.success("Favicon mis à jour avec succès");
        }, 1000);
      }
    };
    
    fileReader.readAsDataURL(file);
  }, [updateSettings]);

  const handleImportClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const success = await importSettings(file);

    if (success) {
      toast.success("Paramètres importés avec succès");
    } else {
      toast.error("Échec de l'importation des paramètres");
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [importSettings]);

  const handleSettingsExport = useCallback(() => {
    const success = exportSettings();
    if (success) {
      toast.success("Paramètres exportés avec succès");
    } else {
      toast.error("Échec de l'exportation des paramètres");
    }
  }, [exportSettings]);

  const handleThemeColorChange = useCallback((type: 'primaryColor' | 'secondaryColor', color: string) => {
    updateSettings({ [type]: color });
    toast.success(`Couleur ${type === 'primaryColor' ? 'principale' : 'secondaire'} mise à jour`);
  }, [updateSettings]);

  const handleInputChange = useCallback((field: keyof SiteSettings, value: any) => {
    updateSettings({ [field]: value });
  }, [updateSettings]);

  const handleFooterChange = useCallback((field: keyof SiteSettings['footer'], value: string) => {
    updateSettings({
      footer: { ...settings.footer, [field]: value }
    });
  }, [settings.footer, updateSettings]);

  const handleCompanyInfoChange = useCallback((field: keyof SiteSettings['companyInfo'], value: string) => {
    updateSettings({
      companyInfo: { ...settings.companyInfo, [field]: value }
    });
  }, [settings.companyInfo, updateSettings]);

  const handleSocialLinkChange = useCallback((field: keyof SiteSettings['socialLinks'], value: string) => {
    updateSettings({
      socialLinks: { ...settings.socialLinks, [field]: value }
    });
  }, [settings.socialLinks, updateSettings]);

  const handleReset = useCallback(() => {
    resetSettings();
    
    // Synchronize local state with reset settings
    const defaultLogo = "/placeholder.svg";
    const defaultFavicon = "/favicon.ico";
    setLogoUrl(defaultLogo);
    setFaviconUrl(defaultFavicon);
    
    toast.success("Paramètres réinitialisés avec succès");
  }, [resetSettings]);
  
  const goBackToDashboard = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  return {
    settings,
    activeTab,
    setActiveTab,
    logoUrl,
    logoUploading,
    faviconUrl,
    faviconUploading,
    fileInputRef,
    handleLogoUpload,
    handleFaviconUpload,
    handleImportClick,
    handleFileChange,
    handleSettingsExport,
    handleThemeColorChange,
    handleInputChange,
    handleFooterChange,
    handleCompanyInfoChange,
    handleSocialLinkChange,
    handleReset,
    goBackToDashboard
  };
}
