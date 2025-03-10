
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  MapPin, 
  Briefcase,
  Check,
  X,
  Clock
} from 'lucide-react';
import { JobApplication } from '@/types/job';
import { formatDate } from '../utils/formatUtils';
import { Badge } from '@/components/ui/badge';

interface ApplicationDetailsDialogProps {
  application: JobApplication | null;
  jobTitle: string;
  jobLocation: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (applicationId: string, jobId: string, status: 'approved' | 'rejected' | 'pending') => void;
}

const ApplicationDetailsDialog: React.FC<ApplicationDetailsDialogProps> = ({
  application,
  jobTitle,
  jobLocation,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de la candidature</DialogTitle>
          <DialogDescription>
            Candidature pour <span className="font-medium">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status badge */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Statut</h3>
            <Badge
              className={`${
                application.status === 'approved'
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : application.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              {application.status === 'approved' ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Acceptée
                </>
              ) : application.status === 'pending' ? (
                <>
                  <Clock className="mr-1 h-4 w-4" />
                  En attente
                </>
              ) : (
                <>
                  <X className="mr-1 h-4 w-4" />
                  Refusée
                </>
              )}
            </Badge>
          </div>

          {/* Candidate information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Informations du candidat</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium mr-2">Email:</span>
                <a href={`mailto:${application.email}`} className="text-blue-600 hover:underline">
                  {application.email}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium mr-2">Téléphone:</span>
                <a href={`tel:${application.phone}`} className="text-blue-600 hover:underline">
                  {application.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium mr-2">Date de candidature:</span>
                <span>{formatDate(application.submittedAt)}</span>
              </div>
            </div>
          </div>

          {/* Job information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Détails du poste</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium mr-2">Poste:</span>
                <span>{jobTitle}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium mr-2">Lieu:</span>
                <span>{jobLocation}</span>
              </div>
            </div>
          </div>

          {/* Application details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Documents</h3>
            {application.resume ? (
              <div className="bg-gray-50 p-3 rounded-md flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                  CV du candidat
                </a>
              </div>
            ) : (
              <div className="text-gray-500 italic mb-4">Aucun CV fourni</div>
            )}

            <h3 className="text-lg font-semibold mb-3">Lettre de motivation</h3>
            {application.coverLetter ? (
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-wrap">
                {application.coverLetter}
              </div>
            ) : (
              <div className="text-gray-500 italic">Aucune lettre de motivation fournie</div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
          <div className="flex space-x-2 w-full sm:w-auto justify-start sm:justify-start order-2 sm:order-1">
            <Button 
              variant="destructive" 
              onClick={() => onUpdateStatus(application.id, application.jobId, 'rejected')}
              disabled={application.status === 'rejected'}
            >
              <X className="h-4 w-4 mr-2" />
              Refuser
            </Button>
            <Button 
              variant="outline"
              onClick={() => onUpdateStatus(application.id, application.jobId, 'pending')}
              disabled={application.status === 'pending'}
            >
              <Clock className="h-4 w-4 mr-2" />
              En attente
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onUpdateStatus(application.id, application.jobId, 'approved')}
              disabled={application.status === 'approved'}
            >
              <Check className="h-4 w-4 mr-2" />
              Accepter
            </Button>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose} 
            className="order-1 sm:order-2"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
