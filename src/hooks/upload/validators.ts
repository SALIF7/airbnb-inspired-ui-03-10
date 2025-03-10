
import { toast } from 'sonner';

/**
 * Validates files before upload
 */

/**
 * Validate a single file against allowed types and size constraints
 * @param file The file to validate
 * @param allowedTypes Array of allowed MIME types
 * @param maxFileSize Maximum file size in MB
 * @returns Object containing validation result and error message if any
 */
export const validateSingleFile = (
  file: File, 
  allowedTypes: string[], 
  maxFileSize: number
): { valid: boolean; errorMessage?: string } => {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      errorMessage: `Format non supporté. Formats acceptés: ${allowedTypes.map(type => type.replace('image/', '.')).join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > maxFileSize * 1024 * 1024) {
    return { 
      valid: false, 
      errorMessage: `L'image ne doit pas dépasser ${maxFileSize}MB` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate multiple files against allowed types, size constraints and quantity
 * @param files Array of files to validate
 * @param allowedTypes Array of allowed MIME types
 * @param maxFileSize Maximum file size in MB
 * @param maxFiles Maximum number of files allowed
 * @returns Object containing validation result
 */
export const validateFiles = (
  files: File[],
  allowedTypes: string[],
  maxFileSize: number,
  maxFiles: number
): { valid: boolean; invalidReason?: string } => {
  // Check if too many files are selected
  if (maxFiles && files.length > maxFiles) {
    toast.error(`Vous ne pouvez pas télécharger plus de ${maxFiles} images à la fois`);
    return { valid: false, invalidReason: 'too_many_files' };
  }
  
  // Check file types
  const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
  if (invalidFiles.length > 0) {
    toast.error(`Formats acceptés: ${allowedTypes.map(type => type.replace('image/', '.')).join(', ')}`);
    return { valid: false, invalidReason: 'invalid_type' };
  }
  
  // Check file sizes
  const oversizedFiles = files.filter(file => file.size > maxFileSize * 1024 * 1024);
  if (oversizedFiles.length > 0) {
    toast.error(`Les images ne doivent pas dépasser ${maxFileSize}MB`);
    return { valid: false, invalidReason: 'too_large' };
  }
  
  return { valid: true };
};
