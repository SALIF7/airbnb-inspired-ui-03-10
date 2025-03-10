
import React, { useState, useEffect } from 'react';
import { TabsContainer } from '@/components/admin/jobs/TabsContainer';
import { JobFormDialog } from '@/components/admin/jobs/JobFormDialog';
import { ListingFormDialog } from '@/components/admin/listings/ListingFormDialog';
import { PageHeader } from '../components/PageHeader';
import { useJobManagement } from '../hooks/useJobManagement';
import { useListingManagement } from '../hooks/useListingManagement';
import { getDomainName } from '../utils/domainUtils';

export const AdminJobsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  
  const {
    filteredJobs,
    isLoadingJobs,
    selectedJob,
    isJobDialogOpen,
    isEditing: isEditingJob,
    searchTerm: jobSearchTerm,
    setSearchTerm: setJobSearchTerm,
    showExpired,
    setShowExpired,
    domainFilter,
    setDomainFilter,
    handleSaveJob,
    handleUpdateJob,
    handleEditJob,
    handleDeleteJob,
    handleCreateJob,
    handleCancelJob
  } = useJobManagement();

  const {
    filteredListings,
    isLoadingListings,
    selectedListing,
    isListingDialogOpen,
    setIsListingDialogOpen,
    isEditing: isEditingListing,
    searchTerm: listingSearchTerm,
    setSearchTerm: setListingSearchTerm,
    handleSaveListing,
    handleUpdateListing,
    handleEditListing,
    handleDeleteListing,
    handleCreateListing,
    handleCancelListing
  } = useListingManagement();

  // Synchronize search terms between tabs
  useEffect(() => {
    if (activeTab === 'jobs') {
      setListingSearchTerm(jobSearchTerm);
    } else {
      setJobSearchTerm(listingSearchTerm);
    }
  }, [activeTab, jobSearchTerm, listingSearchTerm, setJobSearchTerm, setListingSearchTerm]);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mb-6">
        <PageHeader 
          activeTab={activeTab}
          itemCount={activeTab === 'jobs' ? filteredJobs.length : filteredListings.length}
          onCreateItem={activeTab === 'jobs' ? handleCreateJob : handleCreateListing}
          exportData={activeTab === 'jobs' ? filteredJobs : filteredListings}
          exportType={activeTab === 'jobs' ? 'jobs' : 'listings'}
        />

        <TabsContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={activeTab === 'jobs' ? jobSearchTerm : listingSearchTerm}
          setSearchTerm={activeTab === 'jobs' ? setJobSearchTerm : setListingSearchTerm}
          showExpired={showExpired}
          setShowExpired={setShowExpired}
          domainFilter={domainFilter}
          setDomainFilter={setDomainFilter}
          getDomainName={getDomainName}
          isLoadingJobs={isLoadingJobs}
          isLoadingListings={isLoadingListings}
          filteredJobs={filteredJobs}
          filteredListings={filteredListings}
          handleEditJob={handleEditJob}
          handleDeleteJob={handleDeleteJob}
          handleEditListing={handleEditListing}
          handleDeleteListing={handleDeleteListing}
          onCreateJob={handleCreateJob}
          onCreateListing={handleCreateListing}
        />
      </div>

      {/* Job Form Dialog */}
      <JobFormDialog
        onSave={isEditingJob ? handleUpdateJob : handleSaveJob}
        selectedJob={selectedJob}
        isEditing={isEditingJob}
        onCancel={handleCancelJob}
        buttonText=""
      />
      
      {/* Listing Form Dialog */}
      <ListingFormDialog
        selectedListing={selectedListing}
        isEditing={isEditingListing}
        onSave={isEditingListing ? handleUpdateListing : handleSaveListing}
        onCancel={handleCancelListing}
        isOpen={isListingDialogOpen}
        setIsOpen={setIsListingDialogOpen}
      />
    </main>
  );
};
