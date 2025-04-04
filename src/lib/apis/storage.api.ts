'use server';

import { getServerClient } from '@/lib/utils/supabase/server.util';
import { sanitizeFilename } from '@/lib/utils/filename.util';
import { categoriesError, ErrorResponse } from '@/types/error.type';
import { SupabaseBucketValue } from '@/types/supabase-bucket.type';

/**
 * Supabase 스토리지의 지정된 버킷에 이미지 파일을 업로드합니다.
 *
 * 이 함수는 파일명을 고유한 UUID와 안전하게 처리된 원본 파일명의 조합으로 생성하고,
 * 파일을 업로드한 후 공개 URL을 반환합니다.
 *
 * @async
 * @param {SupabaseBucketValue} bucketName - 업로드할 Supabase 버킷 이름 ('meal' 또는 'profile-image')
 * @param {FormData} formData - 업로드할 파일 객체
 * @returns {Promise<ErrorResponse<string>>} 성공 시 data에 업로드된 파일의 공개 URL을 포함하고, 실패 시 error에 오류 정보를 포함하는 객체
 */
export const uploadImage = async (
  bucketName: SupabaseBucketValue,
  formData: FormData
): Promise<ErrorResponse<string>> => {
  const supabase = getServerClient();

  const file = formData.get('file') as File;
  const filename = crypto.randomUUID() + sanitizeFilename(file.name);

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(filename, file);
  if (uploadError) return { data: null, error: categoriesError(uploadError) };

  const { data: fileUrl } = supabase.storage.from(bucketName).getPublicUrl(filename);
  return { data: fileUrl.publicUrl, error: null };
};
