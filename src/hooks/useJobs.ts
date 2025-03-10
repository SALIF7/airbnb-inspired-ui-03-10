
import { useQuery } from "@tanstack/react-query";
import { useJobsService } from "@/services/jobsService";
import { useJobsMutations } from "@/hooks/useJobsMutations";

export const useJobs = () => {
  const { loadJobs } = useJobsService();
  const { addJob, updateJob, deleteJob, applyForJob } = useJobsMutations();

  // Requête pour obtenir tous les jobs
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: loadJobs,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  return {
    jobs,
    isLoading,
    error,
    addJob,
    updateJob,
    deleteJob,
    applyForJob
  };
};
