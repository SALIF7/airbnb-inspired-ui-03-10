
import { SiteSettings } from '@/types/siteSettings';

export const defaultSettings: Partial<SiteSettings> = {
  primaryColor: '#007BFF',
  secondaryColor: '#6C757D',
  logo: '/logo.png',
  logoUrl: '/logo.png',
  siteName: 'Shalom Job Center',
  favicon: '/favicon.ico',
  language: 'fr',
  facebookUrl: 'https://facebook.com',
  twitterUrl: 'https://twitter.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  darkMode: false,
  footer: {
    contact: 'Contactez-nous pour plus d\'informations',
    about: 'SHALOM JOB CENTER est une agence de placement spécialisée dans le recrutement et le placement de personnel qualifié.',
    terms: 'Conditions d\'utilisation',
    policy: 'Politique de confidentialité'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com'
  },
  companyInfo: {
    address: '123 Main Street, Anytown',
    phone: '+15551234567',
    email: 'info@example.com',
    registrationNumber: '123456789',
    mapLocation: ''
  },
};
