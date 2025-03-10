
import { JobDomain, JobContract } from '@/types/job';

export interface UseFormResetParams {
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

export const useFormReset = ({
  setTitle,
  setDomain,
  setDescription,
  setRequirements,
  setContract,
  setLocation,
  setSalary,
  setPositions,
  setDeadline,
  setIsHousingOffer,
  setPrice,
  setBedrooms,
  setBathrooms,
  setImages,
  setIsPublished,
  setFeaturedImage
}: UseFormResetParams) => {
  
  const resetForm = () => {
    setTitle('');
    setDomain('residential_security');
    setDescription('');
    setRequirements('');
    setContract('full_time');
    setLocation('');
    setSalary(0);
    setPositions(1);
    setDeadline('');
    setIsHousingOffer(false);
    setPrice(0);
    setBedrooms(1);
    setBathrooms(1);
    setImages([]);
    setIsPublished(true);
    setFeaturedImage('');
  };

  return { resetForm };
};
