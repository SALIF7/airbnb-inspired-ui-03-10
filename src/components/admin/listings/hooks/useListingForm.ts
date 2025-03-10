
import { useState } from "react";
import { Listing } from "@/types/listing";
import { useFormState } from "./useListingForm/formState";
import { useDialogHandlers } from "./useListingForm/dialogHandlers";
import { useImageHandlers } from "./useListingForm/imageHandlers";
import { useFormSubmission } from "./useListingForm/formSubmission";

interface UseListingFormProps {
  selectedListing: Listing | null;
  isEditing: boolean;
  onSave: (formData: any) => void;
  onCancel: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const useListingForm = ({
  selectedListing,
  isEditing,
  onSave,
  onCancel,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen
}: UseListingFormProps) => {
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
    handleCancel: cancelDialog,
    handleDialogChange
  } = useDialogHandlers({
    isOpen: externalIsOpen,
    setIsOpen: externalSetIsOpen,
    onCancel
  });

  // Form submission
  const {
    handleSubmit: submitForm
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
    setDialogOpen: externalSetIsOpen || (() => {}),
    onSave,
    selectedListing,
    isEditing
  });

  const handleSubmit = async () => {
    await submitForm();
  };

  const handleCancel = () => {
    resetForm();
    resetImages();
    cancelDialog();
  };

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
