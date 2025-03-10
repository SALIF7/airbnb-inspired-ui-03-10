
import { useState, useEffect } from 'react';
import { JobDomain, JobContract } from '@/types/job';
import { UseJobFormProps, JobFormState, JobFormStateWithSetters } from './types';

export const useFormState = ({ selectedJob }: UseJobFormProps): JobFormStateWithSetters => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState(selectedJob?.title || '');
  const [domain, setDomain] = useState<JobDomain>(selectedJob?.domain || 'residential_security');
  const [description, setDescription] = useState(selectedJob?.description || '');
  const [requirements, setRequirements] = useState(selectedJob?.requirements || '');
  const [contract, setContract] = useState<JobContract>(selectedJob?.contract || 'full_time');
  const [location, setLocation] = useState(selectedJob?.location || '');
  const [salary, setSalary] = useState(selectedJob?.salary?.amount || 0);
  const [positions, setPositions] = useState(selectedJob?.positions || 1);
  const [deadline, setDeadline] = useState(selectedJob?.deadline || '');
  const [isHousingOffer, setIsHousingOffer] = useState(selectedJob?.isHousingOffer || false);
  const [price, setPrice] = useState(selectedJob?.price || 0);
  const [bedrooms, setBedrooms] = useState(selectedJob?.bedrooms || 1);
  const [bathrooms, setBathrooms] = useState(selectedJob?.bathrooms || 1);
  const [images, setImages] = useState<string[]>(selectedJob?.images || []);
  const [isPublished, setIsPublished] = useState(selectedJob?.status === 'active');
  const [featuredImage, setFeaturedImage] = useState(selectedJob?.image || '');

  // Populate form when selectedJob changes
  useEffect(() => {
    if (selectedJob) {
      setIsOpen(true);
      setTitle(selectedJob.title);
      setDomain(selectedJob.domain);
      setDescription(selectedJob.description);
      setRequirements(selectedJob.requirements);
      setContract(selectedJob.contract);
      setLocation(selectedJob.location);
      setSalary(selectedJob.salary.amount);
      setPositions(selectedJob.positions);
      setDeadline(selectedJob.deadline);
      setIsHousingOffer(!!selectedJob.isHousingOffer);
      setPrice(selectedJob.price || 0);
      setBedrooms(selectedJob.bedrooms || 1);
      setBathrooms(selectedJob.bathrooms || 1);
      setImages(selectedJob.images || []);
      setIsPublished(selectedJob.status === 'active');
      setFeaturedImage(selectedJob.image || '');
    }
  }, [selectedJob]);

  return {
    // State values
    isOpen,
    isSubmitting,
    isUploading,
    title,
    domain,
    description,
    requirements,
    contract,
    location,
    salary,
    positions,
    deadline,
    isHousingOffer,
    price,
    bedrooms,
    bathrooms,
    images,
    isPublished,
    featuredImage,
    
    // State setters
    setIsOpen,
    setIsSubmitting,
    setIsUploading,
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
  };
};
