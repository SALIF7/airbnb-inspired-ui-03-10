
import { useState } from "react";
import { useFormState } from "./formState";
import { useImageHandlers } from "./imageHandlers";
import { useDialogHandlers } from "./dialogHandlers";
import { useFormSubmission } from "./formSubmission";
import { Listing } from "@/types/listing";

interface UseListingFormProps {
  selectedListing: Listing | null;
  isEditing: boolean;
  onSave: (formData: any) => void;
  onCancel: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

/**
 * Main hook combining all form functionalities
 */
export const useListingForm = ({
  selectedListing,
  isEditing,
  onSave,
  onCancel,
  isOpen,
  setIsOpen
}: UseListingFormProps) => {
  // Set up isSubmitting state in the main hook
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form state management
  const {
    formState,
    errors,
    setErrors,
    updateFormState,
    handleNeighborhoodChange,
    resetForm
  } = useFormState(selectedListing, isEditing);

  // Image handling
  const {
    images,
    imagePreviews,
    handleImageChange,
    removeImage,
    resetImages
  } = useImageHandlers();

  // Dialog management
  const {
    dialogOpen,
    handleCancel,
    handleDialogChange
  } = useDialogHandlers({
    isOpen,
    setIsOpen,
    onCancel
  });

  // Form submission
  const {
    handleSubmit
  } = useFormSubmission({
    formState,
    images,
    imagePreviews,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    resetForm,
    resetImages,
    setDialogOpen: setIsOpen || (() => {}),
    onSave,
    selectedListing,
    isEditing
  });

  return {
    formState,
    images,
    imagePreviews,
    dialogOpen,
    errors,
    isSubmitting,
    updateFormState,
    handleNeighborhoodChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    handleCancel,
    handleDialogChange
  };
};
