
export interface SiteSettings {
  siteName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  language: 'fr' | 'en';
  footer: {
    contact: string;
    about: string;
    terms: string;
    policy: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  reservationSettings: {
    minStay: number;
    maxStay: number;
    advanceBookingDays: number;
    instantBooking: boolean;
  };
  companyInfo: {
    address: string;
    phone: string;
    email: string;
    registrationNumber: string;
    mapLocation: string;
  };
  siteDescription: string;
  adminEmail: string;
  supportEmail: string;
  phoneNumber: string;
  address: string;
  favicon: string;
  fontFamily: string;
  borderRadius: 'small' | 'medium' | 'large';
  darkMode: boolean;
  defaultLanguage: string;
  defaultCurrency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  timezone: string;
  maxFileSize: number;
  allowedFileTypes: string;
  imageCompression: 'low' | 'medium' | 'high';
  watermarkEnabled: boolean;
  watermarkOpacity: number;
  watermarkImage: string;
  mailProvider: 'smtp' | 'sendgrid' | 'mailgun';
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  senderName: string;
  senderEmail: string;
  currency: string;
  stripeLiveKey: string;
  stripeTestKey: string;
  paypalClientId: string;
  testMode: boolean;
  commissionRate: number;
  minWithdrawalAmount: number;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  enableSocialLogin: boolean;
  enableSocialSharing: boolean;
  logoUrl: string;
  notificationSettings: {
    emailNotifications: boolean;
    newContactFormAlert: boolean;
    contactFormEmailTemplate: string;
  };
}
