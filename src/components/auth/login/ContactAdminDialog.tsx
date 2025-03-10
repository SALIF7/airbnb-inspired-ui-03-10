
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

const ContactAdminDialog = ({ open, onOpenChange, email }: ContactAdminDialogProps) => {
  const [contactMessage, setContactMessage] = useState("");

  const handleContactAdmin = () => {
    if (!contactMessage.trim()) {
      toast.error("Veuillez saisir un message pour l'administrateur");
      return;
    }
    
    // Enregistrer la demande de contact dans le localStorage
    const contactRequests = JSON.parse(localStorage.getItem('admin_contact_requests') || '[]');
    contactRequests.push({
      id: Date.now().toString(),
      email: email,
      message: contactMessage,
      timestamp: new Date().toISOString(),
      type: 'account_reset',
      status: 'pending'
    });
    localStorage.setItem('admin_contact_requests', JSON.stringify(contactRequests));
    
    // Log this request in security logs
    const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    securityLogs.push({
      type: 'account_reset_request',
      email: email,
      timestamp: new Date().toISOString(),
      details: { message: contactMessage }
    });
    localStorage.setItem('security_logs', JSON.stringify(securityLogs));
    
    toast.success("Votre demande a été envoyée à l'administrateur");
    onOpenChange(false);
    setContactMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contacter l'administrateur</DialogTitle>
          <DialogDescription>
            Expliquez pourquoi vous souhaitez déverrouiller votre compte
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="admin-message" className="block text-sm font-medium">Message</label>
            <Textarea
              id="admin-message"
              placeholder="Expliquez pourquoi vous avez besoin d'un accès à votre compte..."
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleContactAdmin}>
            Envoyer la demande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactAdminDialog;
