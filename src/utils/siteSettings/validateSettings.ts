
import { SiteSettings } from '@/types/siteSettings';
import { defaultSettings } from './defaultSettings';

// Function to ensure that settings are valid
export const validateSettings = (settings: any): SiteSettings => {
  const validatedSettings = { ...defaultSettings };
  
  // Merge saved settings with default settings
  if (settings) {
    // Validate top-level properties
    for (const key in defaultSettings) {
      if (settings[key] !== undefined && settings[key] !== null) {
        (validatedSettings as any)[key] = settings[key];
      }
    }
    
    // Validate nested objects
    for (const nestedKey of ['footer', 'socialLinks', 'reservationSettings', 'companyInfo']) {
      if (settings[nestedKey] && typeof settings[nestedKey] === 'object') {
        for (const innerKey in (defaultSettings as any)[nestedKey]) {
          if (settings[nestedKey][innerKey] !== undefined && settings[nestedKey][innerKey] !== null) {
            (validatedSettings as any)[nestedKey][innerKey] = settings[nestedKey][innerKey];
          }
        }
      }
    }
  }
  
  return validatedSettings;
};
