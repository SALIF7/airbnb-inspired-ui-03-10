
import React from 'react';
import { formatDate } from "../../utils/formatUtils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Eye, Check, X } from 'lucide-react';
import { JobApplication, Job } from '@/types/job';
import StatusBadge from './StatusBadge';

interface ApplicationMobileCardProps {
  application: JobApplication;
  job: Job;
  onSelectApplication: (application: JobApplication) => void;
  updateApplicationStatus: (applicationId: string, jobId: string, status: 'pending' | 'approved' | 'rejected') => void;
}

const ApplicationMobileCard: React.FC<ApplicationMobileCardProps> = ({
  application,
  job,
  onSelectApplication,
  updateApplicationStatus
}) => {
  return (
    <div key={application.id} className="bg-white rounded-lg shadow overflow-hidden border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{application.applicantName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{application.applicantName}</div>
              <div className="text-sm text-gray-500 truncate max-w-[180px]">{application.email}</div>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>
      </div>
      <div className="p-4 border-b">
        <div className="text-sm font-medium mb-1">{job.title}</div>
        <div className="text-xs text-gray-500 flex items-center mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {job.location}
        </div>
        <div className="text-sm text-gray-500 flex items-center mb-2">
          <Phone className="h-4 w-4 mr-1 text-gray-400" />
          {application.phone}
        </div>
        <div className="text-xs text-gray-500">
          Postuler le {formatDate(application.submittedAt)}
        </div>
      </div>
      <div className="p-3 bg-gray-50 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onSelectApplication(application)}
          className="text-xs h-8"
        >
          <Eye className="h-3.5 w-3.5 mr-1" />
          Détails
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-green-600 h-8"
            disabled={application.status === 'approved'}
            onClick={() => updateApplicationStatus(application.id, job.id, 'approved')}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Accepter
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-red-600 h-8"
            disabled={application.status === 'rejected'}
            onClick={() => updateApplicationStatus(application.id, job.id, 'rejected')}
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Refuser
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationMobileCard;
