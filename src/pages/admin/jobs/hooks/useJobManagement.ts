
import { useState, useEffect } from 'react';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/job';

export const useJobManagement = () => {
  const { jobs, isLoading: isLoadingJobs, addJob, updateJob, deleteJob } = useJobs();
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [domainFilter, setDomainFilter] = useState<string>('all');

  // Filter jobs based on search term and filters
  useEffect(() => {
    if (jobs) {
      const filtered = jobs.filter(job => {
        // Filter by search term
        const searchMatch = 
          !searchTerm || 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by status (active/expired)
        const statusMatch = showExpired || job.status === 'active';
        
        // Filter by domain
        const domainMatch = domainFilter === 'all' || job.domain === domainFilter;
        
        return searchMatch && statusMatch && domainMatch;
      });
      
      setFilteredJobs(filtered);
    }
  }, [jobs, searchTerm, showExpired, domainFilter]);

  const handleSaveJob = async (formData: Omit<Job, "id">) => {
    try {
      await addJob.mutateAsync(formData);
      setIsJobDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsEditing(true);
    setIsJobDialogOpen(true);
  };

  const handleUpdateJob = async (formData: Omit<Job, "id">) => {
    if (selectedJob) {
      try {
        await updateJob.mutateAsync({ ...formData, id: selectedJob.id });
        setSelectedJob(null);
        setIsEditing(false);
        setIsJobDialogOpen(false);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre d'emploi ?")) {
      try {
        await deleteJob.mutateAsync(jobId);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleCreateJob = () => {
    setSelectedJob(null);
    setIsEditing(false);
    setIsJobDialogOpen(true);
  };

  const handleCancelJob = () => {
    setSelectedJob(null);
    setIsEditing(false);
    setIsJobDialogOpen(false);
  };

  return {
    jobs,
    filteredJobs,
    isLoadingJobs,
    selectedJob,
    isJobDialogOpen,
    isEditing,
    searchTerm,
    setSearchTerm,
    showExpired,
    setShowExpired,
    domainFilter,
    setDomainFilter,
    handleSaveJob,
    handleEditJob,
    handleUpdateJob,
    handleDeleteJob,
    handleCreateJob,
    handleCancelJob
  };
};
