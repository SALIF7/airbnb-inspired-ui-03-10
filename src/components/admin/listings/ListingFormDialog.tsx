
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Listing } from "@/types/listing";
import { BasicInfoSection } from "./form/BasicInfoSection";
import { LocationSection } from "./form/LocationSection";
import { ImageUploadSection } from "./form/ImageUploadSection";
import { DialogActions } from "./form/DialogActions";
import { useListingForm } from "./hooks/useListingForm";

interface ListingFormDialogProps {
  selectedListing: Listing | null;
  isEditing: boolean;
  onSave: (formData: any) => void;
  onCancel: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const ListingFormDialog = ({
  selectedListing,
  isEditing,
  onSave,
  onCancel,
  isOpen,
  setIsOpen
}: ListingFormDialogProps) => {
  const {
    formState,
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
  } = useListingForm({
    selectedListing,
    isEditing,
    onSave,
    onCancel,
    isOpen,
    setIsOpen
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-white">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {isEditing ? "Modifier un logement" : "Ajouter un logement"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? "Mettez à jour les informations du logement"
              : "Remplissez le formulaire pour ajouter un nouveau logement"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <BasicInfoSection 
            title={formState.title}
            description={formState.description}
            price={formState.price}
            setTitle={(title) => updateFormState("title", title)}
            setDescription={(desc) => updateFormState("description", desc)}
            setPrice={(price) => updateFormState("price", price)}
            errors={errors}
          />

          <LocationSection 
            neighborhood={formState.neighborhood}
            location={formState.location}
            mapLocation={formState.mapLocation}
            handleNeighborhoodChange={handleNeighborhoodChange}
            setLocation={(loc) => updateFormState("location", loc)}
            setMapLocation={(map) => updateFormState("mapLocation", map)}
            errors={errors}
          />

          <ImageUploadSection 
            imagePreviews={imagePreviews} 
            onImageChange={handleImageChange}
            removeImage={removeImage}
            error={errors.images}
          />
        </div>

        <DialogFooter className="bg-gray-50 p-4 rounded-b-lg">
          <DialogActions 
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
