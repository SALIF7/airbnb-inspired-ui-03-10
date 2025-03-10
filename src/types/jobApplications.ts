
import { Job } from "./job";

// Type pour les données de candidature reçues du formulaire
export interface JobApplicationFormData {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
}
