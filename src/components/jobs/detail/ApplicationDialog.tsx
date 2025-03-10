
import React from 'react';
import { Mail, User, Phone, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ApplicationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  applicantData: {
    name: string;
    email: string;
    phone: string;
    resume: string;
    coverLetter: string;
  };
  setApplicantData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    resume: string;
    coverLetter: string;
  }>>;
  isHousingOffer: boolean;
}

const ApplicationDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  applicantData,
  setApplicantData,
  isHousingOffer
}: ApplicationDialogProps) => {
  // Handle form submission with loading state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(e);
      onOpenChange(false);
    } catch (error) {
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isHousingOffer ? "Réserver ce logement" : "Postuler à cette offre"}
          </DialogTitle>
          <DialogDescription>
            {isHousingOffer 
              ? "Remplissez le formulaire ci-dessous pour réserver ce logement." 
              : "Remplissez le formulaire ci-dessous pour envoyer votre candidature."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                id="name" 
                placeholder="Votre nom complet" 
                className="pl-10"
                value={applicantData.name}
                onChange={(e) => setApplicantData({...applicantData, name: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                id="email" 
                type="email"
                placeholder="votre@email.com" 
                className="pl-10"
                value={applicantData.email}
                onChange={(e) => setApplicantData({...applicantData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                id="phone" 
                placeholder="+228 XX XX XX XX" 
                className="pl-10"
                value={applicantData.phone}
                onChange={(e) => setApplicantData({...applicantData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          {!isHousingOffer && (
            <div>
              <label htmlFor="resume" className="block text-sm font-medium mb-1">
                CV (lien)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="resume" 
                  placeholder="Lien vers votre CV (Google Drive, Dropbox...)" 
                  className="pl-10"
                  value={applicantData.resume}
                  onChange={(e) => setApplicantData({...applicantData, resume: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
              {isHousingOffer ? "Message (facultatif)" : "Lettre de motivation (facultatif)"}
            </label>
            <Textarea 
              id="coverLetter" 
              placeholder={isHousingOffer 
                ? "Partagez avec nous vos besoins ou questions concernant ce logement..." 
                : "Partagez avec nous vos motivations pour ce poste..."
              }
              className="min-h-[100px]"
              value={applicantData.coverLetter}
              onChange={(e) => setApplicantData({...applicantData, coverLetter: e.target.value})}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-sholom-primary hover:bg-sholom-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : isHousingOffer ? "Réserver" : "Envoyer ma candidature"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
