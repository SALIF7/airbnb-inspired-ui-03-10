
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import LoadingState from '@/components/jobs/detail/LoadingState';
import NotFoundState from '@/components/jobs/detail/NotFoundState';
import JobDetailContent from '@/components/jobs/detail/JobDetailContent';

const JobDetail = () => {
  const { id } = useParams();
  const { jobs, isLoading, applyForJob } = useJobs();
  const { settings } = useSiteSettings();
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  if (isLoading) {
    return <LoadingState />;
  }

  const job = jobs.find(job => job.id === id);

  if (!job) {
    return <NotFoundState />;
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicantData.name || !applicantData.email || !applicantData.phone) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    try {
      console.log("Submitting application data:", {
        jobId: job.id,
        ...applicantData
      });
      
      await applyForJob.mutateAsync({
        jobId: job.id,
        ...applicantData
      });
      
      setApplicantData({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
      });
      
      toast.success("Votre candidature a été envoyée avec succès!");
    } catch (error) {
      console.error("Erreur de candidature:", error);
      toast.error("Une erreur est survenue lors de l'envoi de votre candidature.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <JobDetailContent 
        job={job}
        jobs={jobs}
        settings={settings}
        handleApplySubmit={handleApplySubmit}
        applicantData={applicantData}
        setApplicantData={setApplicantData}
      />
    </div>
  );
};

export default JobDetail;
