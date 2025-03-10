
import { UseJobFormProps } from './jobForm/types';
import { useFormState } from './jobForm/useFormState';
import { useImageHandlers } from './jobForm/useImageHandlers';
import { useFormSubmission } from './jobForm/useFormSubmission';
import { useFormReset } from './jobForm/useFormReset';

export const useJobForm = (props: UseJobFormProps) => {
  // Get form state and setters
  const formState = useFormState(props);
  
  // Extract necessary values for other hooks
  const {
    isHousingOffer,
    images,
    setImages,
    setFeaturedImage,
    setIsUploading,
    setIsSubmitting,
    setIsOpen
  } = formState;

  // Setup image handlers
  const imageHandlers = useImageHandlers({
    images,
    setImages,
    setFeaturedImage,
    setIsUploading
  });

  // Modified image handlers to include isHousingOffer
  const handleFeaturedImageUpload = () => imageHandlers.handleFeaturedImageUpload(isHousingOffer);
  const handleAddImage = () => imageHandlers.handleAddImage(isHousingOffer);
  const handleRemoveImage = imageHandlers.handleRemoveImage;

  // Setup form submission
  const formSubmission = useFormSubmission({
    ...formState,
    onSave: props.onSave,
    onCancel: props.onCancel
  });

  // Setup form reset
  const { resetForm } = useFormReset(formState);

  return {
    ...formState,
    resetForm,
    handleFeaturedImageUpload,
    handleAddImage,
    handleRemoveImage,
    handleOpenChange: formSubmission.handleOpenChange,
    handleSubmit: formSubmission.handleSubmit,
    handleDomainChange: formSubmission.handleDomainChange,
    handleContractChange: formSubmission.handleContractChange
  };
};
