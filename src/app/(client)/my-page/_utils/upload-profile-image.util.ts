import { uploadImage } from '@/apis/storage.api';
import { SupabaseBucket } from '@/types/supabase-bucket.type';

export const uploadProfileImage = async (imageFile: File): Promise<string> => {
  const uploadForm = new FormData();
  uploadForm.append('file', imageFile);

  const result = await uploadImage(SupabaseBucket.PROFILE_IMAGES, uploadForm);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
};
