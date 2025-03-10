
import { SiteSettings } from '@/types/siteSettings';

export const defaultSettings: SiteSettings = {
  siteName: 'Shalom Security',
  logo: '/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png',
  primaryColor: '#f59e0b', // Jaune doré comme dans le logo
  secondaryColor: '#000000', // Noir comme dans le logo
  language: 'fr',
  footer: {
    contact: 'Contactez-nous pour toute question concernant nos services de sécurité et de gardiennage.',
    about: 'SHALOM SECURITY est une agence de sécurité spécialisée dans le gardiennage et la protection de biens et de personnes au Togo.',
    terms: 'En utilisant notre service, vous acceptez nos conditions générales d\'utilisation et notre politique de confidentialité.',
    policy: 'Nous respectons votre vie privée et protégeons vos données personnelles conformément aux lois en vigueur.',
  },
  socialLinks: {
    facebook: 'https://facebook.com/shalomsecurity',
    twitter: 'https://twitter.com/shalomsecurity',
    instagram: 'https://instagram.com/shalomsecurity',
    linkedin: 'https://linkedin.com/company/shalomsecurity',
  },
  reservationSettings: {
    minStay: 1,
    maxStay: 90,
    advanceBookingDays: 365,
    instantBooking: true,
  },
  companyInfo: {
    address: 'Tokoin Trésor, ancien immeuble Udecto, Lomé, Togo',
    phone: '+228 90-19-03-41 / 98-89-41-23',
    email: 'Shalomjob@gmail.com',
    registrationNumber: 'RCCM TG-LOM-2023-B-12345',
    mapLocation: '6.1317,1.2232' // Lomé, Togo coordinates
  },
  siteDescription: 'Gardiennage et Protection - La sécurité, au centre de la vigilance.',
  adminEmail: 'admin@shalomsecurity.tg',
  supportEmail: 'support@shalomsecurity.tg',
  phoneNumber: '+228 90-19-03-41',
  address: 'Tokoin Trésor, ancien immeuble Udecto, Lomé, Togo',
  favicon: '/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 'medium',
  darkMode: false,
  defaultLanguage: 'fr',
  defaultCurrency: 'XOF',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: '24h',
  timezone: 'Africa/Lome',
  maxFileSize: 5, // MB
  allowedFileTypes: 'image/jpeg,image/png,image/gif',
  imageCompression: 'medium',
  watermarkEnabled: false,
  watermarkOpacity: 0.5,
  watermarkImage: '',
  mailProvider: 'smtp',
  smtpHost: 'smtp.example.com',
  smtpPort: '587',
  smtpUser: 'user@example.com',
  smtpPassword: 'password',
  senderName: 'Shalom Security',
  senderEmail: 'no-reply@shalomsecurity.tg',
  currency: 'XOF',
  stripeLiveKey: '',
  stripeTestKey: '',
  paypalClientId: '',
  testMode: true,
  commissionRate: 10,
  minWithdrawalAmount: 10000,
  facebookUrl: 'https://facebook.com/shalomsecurity',
  twitterUrl: 'https://twitter.com/shalomsecurity',
  instagramUrl: 'https://instagram.com/shalomsecurity',
  linkedinUrl: 'https://linkedin.com/company/shalomsecurity',
  youtubeUrl: '',
  enableSocialLogin: true,
  enableSocialSharing: true,
  logoUrl: '/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png',
  notificationSettings: {
    emailNotifications: true,
    newContactFormAlert: true,
    contactFormEmailTemplate: `Cher administrateur,

Un nouveau formulaire de contact a été soumis sur votre site.

Nom: {name}
Email: {email}
Département: {department}
Sujet: {subject}

Message:
{message}

Cordialement,
L'équipe Shalom Security`
  }
};
