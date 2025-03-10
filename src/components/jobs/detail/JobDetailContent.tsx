
import React, { useState } from 'react';
import { Job } from '@/types/job';
import { SiteSettings } from '@/types/siteSettings';
import { toast } from 'sonner';
import { SocialBar } from '@/components/social/SocialBar';
import { translateDomain, translateContract, formatPriceFCFA, getDomainImage } from './JobDetailUtils';
import JobDetailHeader from './JobDetailHeader';
import JobInfoCards from './JobInfoCards';
import JobPriceCard from './JobPriceCard';
import JobDescription from './JobDescription';
import JobRequirements from './JobRequirements';
import JobGallery from './JobGallery';
import JobActionButtons from './JobActionButtons';
import JobSidebar from './JobSidebar';
import ApplicationDialog from './ApplicationDialog';

interface JobDetailContentProps {
  job: Job;
  jobs: Job[];
  settings: SiteSettings;
  handleApplySubmit: (e: React.FormEvent) => Promise<void>;
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
}

const JobDetailContent = ({ 
  job, 
  jobs, 
  settings, 
  handleApplySubmit,
  applicantData,
  setApplicantData 
}: JobDetailContentProps) => {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Découvrez cette offre: ${job.title} à ${job.location}`,
        url: window.location.href
      })
      .then(() => console.log('Partage réussi'))
      .catch((error) => console.error('Erreur de partage:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier!");
    }
  };

  const shareUrl = `${window.location.origin}/emploi/${job?.id}`;
  const similarJobs = jobs
    .filter(j => j.id !== job.id && j.domain === job.domain)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JobDetailHeader 
          title={job.title}
          location={job.location}
          domain={job.domain}
          status={job.status}
          isHousingOffer={!!job.isHousingOffer}
          image={job.images?.[0] || job.image || ''}
          translateDomain={translateDomain}
          getDomainImage={getDomainImage}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden">
              <div className="px-6 pt-4">
                <SocialBar 
                  type="job" 
                  itemId={job.id} 
                  title={job.title}
                  url={shareUrl}
                />
              </div>
              
              <div className="p-6">
                <JobInfoCards 
                  contract={job.contract}
                  publishDate={job.publishDate}
                  deadline={job.deadline}
                  isHousingOffer={!!job.isHousingOffer}
                  translateContract={translateContract}
                />
                
                <JobPriceCard 
                  isHousingOffer={!!job.isHousingOffer}
                  price={job.price}
                  salary={job.salary}
                  formatPriceFCFA={formatPriceFCFA}
                />
                
                <JobDescription description={job.description} />
                
                <JobRequirements 
                  isHousingOffer={!!job.isHousingOffer}
                  requirements={job.requirements}
                  bedrooms={job.bedrooms}
                  bathrooms={job.bathrooms}
                />
                
                {job.isHousingOffer && job.images && job.images.length > 0 && (
                  <JobGallery 
                    images={job.images}
                    title={job.title}
                    domain={job.domain}
                    getDomainImage={getDomainImage}
                  />
                )}
                
                <JobActionButtons 
                  isHousingOffer={!!job.isHousingOffer}
                  status={job.status}
                  onApply={() => setIsApplyDialogOpen(true)}
                  onShare={handleShare}
                />
              </div>
            </div>
          </div>
          
          <JobSidebar 
            settings={settings}
            similarJobs={similarJobs}
            getDomainImage={getDomainImage}
          />
        </div>
        
        <ApplicationDialog 
          isOpen={isApplyDialogOpen}
          onOpenChange={setIsApplyDialogOpen}
          onSubmit={handleApplySubmit}
          applicantData={applicantData}
          setApplicantData={setApplicantData}
          isHousingOffer={!!job.isHousingOffer}
        />
      </div>
    </div>
  );
};

export default JobDetailContent;
