
export type JobDomain = 
  | "residential_security" // Sécurité résidentielle
  | "bodyguard" // Garde du corps
  | "private_property" // Surveillance propriétés privées
  | "industrial_security" // Sécurité industrielle
  | "office_security" // Sécurité de bureau
  | "security_patrol" // Patrouilleur
  | "access_control" // Contrôle d'accès
  | "security_systems" // Opérateur systèmes
  | "construction_security" // Sécurité chantier
  | "site_supervisor" // Surveillant travaux
  | "security_coordinator" // Coordinateur sécurité
  | "event_security" // Sécurité événementielle
  | "k9_security" // Sécurité cynophile
  | "security_manager" // Responsable sécurité
  | "security_consultant" // Consultant sécurité
  | "security_trainer" // Formateur sécurité
  | "housing_offer"; // Offre de logement

export type JobContract = "full_time" | "part_time" | "contract";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface Job {
  id: string;
  title: string;
  domain: JobDomain;
  description: string;
  requirements: string;
  contract: JobContract;
  location: string;
  salary: {
    amount: number;
    currency: string;
  };
  positions: number;
  publishDate: string;
  deadline: string;
  status: "active" | "closed";
  images?: string[];
  applications?: JobApplication[];
  // Propriétés spécifiques aux logements
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  isHousingOffer?: boolean;
  // Ajout de la propriété image pour l'image principale
  image?: string;
}

export interface JobFilters {
  search: string;
  domain: JobDomain | 'all';
  contract: JobContract | 'all';
  location: string | 'all';
  salaryRange: [number, number];
  showExpired: boolean;
  sortBy: 'newest' | 'salary';
  showHousingOnly?: boolean;
}
