
import { Job, JobDomain, JobContract } from '@/types/job';

export interface UseJobFormProps {
  selectedJob?: Job | null;
  onSave: (formData: Omit<Job, "id">) => void;
  onCancel: () => void;
}

export interface JobFormState {
  isOpen: boolean;
  isSubmitting: boolean;
  isUploading: boolean;
  title: string;
  domain: JobDomain;
  description: string;
  requirements: string;
  contract: JobContract;
  location: string;
  salary: number;
  positions: number;
  deadline: string;
  isHousingOffer: boolean;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  isPublished: boolean;
  featuredImage: string;
}

export interface FormStateSetters {
  setIsOpen: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
  setIsUploading: (value: boolean) => void;
  setTitle: (value: string) => void;
  setDomain: (value: JobDomain) => void;
  setDescription: (value: string) => void;
  setRequirements: (value: string) => void;
  setContract: (value: JobContract) => void;
  setLocation: (value: string) => void;
  setSalary: (value: number) => void;
  setPositions: (value: number) => void;
  setDeadline: (value: string) => void;
  setIsHousingOffer: (value: boolean) => void;
  setPrice: (value: number) => void;
  setBedrooms: (value: number) => void;
  setBathrooms: (value: number) => void;
  setImages: (value: string[]) => void;
  setIsPublished: (value: boolean) => void;
  setFeaturedImage: (value: string) => void;
}

export type JobFormStateWithSetters = JobFormState & FormStateSetters;
