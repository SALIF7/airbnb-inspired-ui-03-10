
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useJobsService } from "@/services/jobsService";
import { Job } from "@/types/job";
import { JobApplicationFormData } from "@/types/jobApplications";

export const useJobsMutations = () => {
  const queryClient = useQueryClient();
  const { createJob, updateJobItem, deleteJobItem, submitApplication } = useJobsService();

  // Mutation pour ajouter un job
  const addJob = useMutation({
    mutationFn: async (newJob: Omit<Job, "id">) => {
      return await createJob(newJob);
    },
    onSuccess: (newJob) => {
      queryClient.setQueryData(["jobs"], (old: Job[] = []) => [...old, newJob]);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Offre d'emploi ajoutée avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de l'offre d'emploi");
    },
  });

  // Mutation pour mettre à jour un job
  const updateJob = useMutation({
    mutationFn: async (updatedJob: Job) => {
      return await updateJobItem(updatedJob);
    },
    onSuccess: (updatedJob) => {
      queryClient.setQueryData(["jobs"], (old: Job[] = []) =>
        old.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Offre d'emploi mise à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'offre d'emploi");
    },
  });

  // Mutation pour supprimer un job
  const deleteJob = useMutation({
    mutationFn: async (jobId: string) => {
      return await deleteJobItem(jobId);
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["jobs"], (old: Job[] = []) =>
        old.filter((job) => job.id !== deletedId)
      );
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Offre d'emploi supprimée avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'offre d'emploi");
    },
  });

  // Mutation pour postuler à une offre d'emploi
  const applyForJob = useMutation({
    mutationFn: async (applicationData: JobApplicationFormData) => {
      return await submitApplication(applicationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Votre candidature a été envoyée avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi de votre candidature");
    },
  });

  return {
    addJob,
    updateJob,
    deleteJob,
    applyForJob
  };
};
