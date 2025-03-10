
import { useLanguage } from '@/hooks/useLanguage';

export const translateDomain = (domain: string) => {
  const domains: {[key: string]: string} = {
    'residential_security': 'Sécurité résidentielle',
    'bodyguard': 'Garde du corps',
    'private_property': 'Propriétés privées',
    'industrial_security': 'Sécurité industrielle',
    'office_security': 'Sécurité de bureau',
    'security_patrol': 'Patrouilleur',
    'access_control': 'Contrôle d\'accès',
    'security_systems': 'Opérateur systèmes',
    'construction_security': 'Sécurité chantier',
    'site_supervisor': 'Surveillant travaux',
    'security_coordinator': 'Coordinateur sécurité',
    'event_security': 'Sécurité événementielle',
    'k9_security': 'Maître-chien',
    'security_manager': 'Responsable sécurité',
    'security_consultant': 'Consultant sécurité',
    'security_trainer': 'Formateur sécurité',
    'housing_offer': 'Offre de logement',
    'all': 'Tous les domaines'
  };
  
  const domainsEN: {[key: string]: string} = {
    'residential_security': 'Residential Security',
    'bodyguard': 'Bodyguard',
    'private_property': 'Private Property',
    'industrial_security': 'Industrial Security',
    'office_security': 'Office Security',
    'security_patrol': 'Security Patrol',
    'access_control': 'Access Control',
    'security_systems': 'Systems Operator',
    'construction_security': 'Construction Security',
    'site_supervisor': 'Site Supervisor',
    'security_coordinator': 'Security Coordinator',
    'event_security': 'Event Security',
    'k9_security': 'K9 Handler',
    'security_manager': 'Security Manager',
    'security_consultant': 'Security Consultant',
    'security_trainer': 'Security Trainer',
    'housing_offer': 'Housing Offer',
    'all': 'All Domains'
  };
  
  // Get the current language from localStorage
  const currentLang = localStorage.getItem('userLanguage');
  
  if (currentLang === 'en') {
    return domainsEN[domain] || domain;
  }
  
  return domains[domain] || domain;
};

export const translateContract = (contract: string) => {
  const contractsMapFR: {[key: string]: string} = {
    'full_time': 'CDI',
    'part_time': 'Temps partiel',
    'contract': 'CDD',
    'all': 'Tous les contrats'
  };
  
  const contractsMapEN: {[key: string]: string} = {
    'full_time': 'Full-time',
    'part_time': 'Part-time',
    'contract': 'Contract',
    'all': 'All contracts'
  };
  
  // Get the current language from localStorage
  const currentLang = localStorage.getItem('userLanguage');
  
  if (currentLang === 'en') {
    return contractsMapEN[contract] || contract;
  }
  
  return contractsMapFR[contract] || contract;
};
