'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupabaseBucket } from '@/types/supabase-bucket.type';
import { updateUser } from '@/lib/apis/user.api';
import { uploadImage } from '@/lib/apis/storage.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormSchema from '@/constants/form-schema.constant';
import { UserDTO } from '@/types/DTO/user.dto';
import { cleanupBlobUrl } from '@/lib/utils/cleanup-blob-url.util';

/**
 * 사용자 프로필 수정 폼을 위한 유효성 검증 스키마
 * - nickname: 닉네임 유효성 검증 스키마 (2~8자 한글/영문/숫자)
 * - newProfileImage: 새 프로필 이미지 파일 (선택 사항)
 */
const formSchema = z.object({
  nickname: FormSchema.NICKNAME_SCHEMA,
  newProfileImage: FormSchema.IMAGE_FILE_SCHEMA.nullable()
});

type FormValues = z.infer<typeof formSchema>;

/**
 * 마이페이지 프로필 수정 컴포넌트
 * 사용자가 자신의 프로필 정보(닉네임, 프로필 이미지)를 수정할 수 있는 폼을 제공합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {UserDTO} props.userInfo - 현재 사용자 정보
 * @returns {JSX.Element} 프로필 수정 폼 UI
 */
const MyPageEditProfile = ({ userInfo }: { userInfo: UserDTO }): JSX.Element => {
  /**
   * 프로필 상태 관리
   * - isUploading: 업로드 진행 중 상태를 나타냄
   * - profilePreviewUrl: 프로필 이미지 미리보기 URL
   */
  const [profileState, setProfileState] = useState({
    isUploading: false,
    profilePreviewUrl: userInfo?.profileImage || null
  });

  /**
   * 파일 입력 요소에 접근하기 위한 ref
   * 프로필 이미지 클릭 시 파일 선택 다이얼로그를 표시하는 데 사용
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 프로필 수정 폼 초기화 및 유효성 검증 설정
   */
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: userInfo.nickname || '',
      newProfileImage: null
    }
  });

  /**
   * 컴포넌트 언마운트 시 Blob URL 정리를 위한 효과
   * 메모리 누수 방지를 위해 생성된 객체 URL 해제
   */
  useEffect(() => {
    return () => {
      cleanupBlobUrl(profileState.profilePreviewUrl);
    };
  }, []);

  /**
   * 프로필 이미지 변경 처리 핸들러
   * 사용자가 새 이미지를 선택하면:
   * 1. 기존 Blob URL 정리
   * 2. 새 이미지의 미리보기 URL 생성
   * 3. 프로필 상태 및 폼 값 업데이트
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력 변경 이벤트
   */
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    cleanupBlobUrl(profileState.profilePreviewUrl);

    const previewUrl = URL.createObjectURL(file);
    setProfileState((prev) => ({
      ...prev,
      profilePreviewUrl: previewUrl
    }));

    form.setValue('newProfileImage', file);
  };

  /**
   * 프로필 변경 사항 제출 처리 핸들러
   * 폼 제출 시 사용자 프로필 변경 사항을 처리하는 메인 함수
   *
   * 1. 새 이미지 파일 존재 여부 확인
   * 2. 새 이미지가 있는 경우에만 업로드 처리
   * 3. 변경 사항 확인 (닉네임 또는 이미지 변경 여부)
   * 4. 사용자 정보 업데이트
   * 5. 성공 처리
   *
   * @param {FormValues} formData - 폼 제출 데이터 (닉네임, 새 프로필 이미지)
   */
  const handleSubmitProfileChanges = async (formData: FormValues): Promise<void> => {
    setIsUploading(true);

    const newProfileImageFile = form.getValues('newProfileImage');
    let imageUrl = profileState.profilePreviewUrl; // 프로필 UI에 노출되고 있는 이미지

    if (newProfileImageFile) {
      const uploadResult = await handleProfileImageUpload(newProfileImageFile);
      if (!uploadResult) {
        setIsUploading(false);
        return;
      }
      imageUrl = uploadResult;
    }

    // 변경 사항이 없는 경우 (닉네임과 이미지 모두 동일)
    if (formData.nickname === userInfo.nickname && imageUrl === userInfo.profileImage) {
      alert('변경된 정보가 없습니다.');
      setIsUploading(false);
      return;
    }

    await updateUser({
      nickname: formData.nickname,
      profileImage: imageUrl
    });

    handleProfileUpdateSuccess(formData.nickname, imageUrl);
    setIsUploading(false);
  };

  /**
   * 업로드 상태 설정 헬퍼 함수
   * 프로필 이미지 업로드 중임을 표시하는 상태를 관리
   *
   * @param {boolean} isUploading - 업로드 진행 상태
   */
  const setIsUploading = (isUploading: boolean): void => {
    setProfileState((prev) => ({ ...prev, isUploading }));
  };

  /**
   * 프로필 이미지 스토리지 업로드 처리 함수
   * 이미지 파일을 Supabase 스토리지에 업로드하고 결과 URL을 반환합니다.
   *
   * 1. 이미지 업로드를 위한 FormData 생성
   * 2. 이미지 업로드 API 호출
   * 3. 업로드 결과 처리 및 URL 반환
   *
   * @param {File} imageFile - 업로드할 이미지 파일
   * @returns {Promise<string | null>} 업로드된 이미지 URL 또는 에러 시 null
   */
  const handleProfileImageUpload = async (imageFile: File): Promise<string | null> => {
    const uploadForm = new FormData();
    uploadForm.append('file', imageFile);

    const result = await uploadImage(SupabaseBucket.PROFILE_IMAGES, uploadForm);

    if (result.error) {
      alert(`${result.error.message} ${result.error.action}`);
      setIsUploading(false);
      return null; // 업로드 실패
    }

    return result.data; // 새 이미지 URL 반환
  };

  /**
   * 프로필 업데이트 성공 처리 함수
   * 성공 메시지 표시 및 폼/상태 초기화
   *
   * @param {string} nickname - 업데이트된 닉네임
   * @param {string | null} newImageUrl - 업데이트된 이미지 URL
   */
  const handleProfileUpdateSuccess = (nickname: string, newImageUrl: string | null) => {
    form.reset({ nickname, newProfileImage: null });
    alert('프로필 수정이 완료되었습니다.');

    setProfileState((prev) => ({
      ...prev,
      profilePreviewUrl: newImageUrl
    }));
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitProfileChanges)} className="relative w-full">
          <div className="space-y-[2.3rem]">
            <FormItem>
              <FormLabel className="sr-only">프로필 사진</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center">
                  <div
                    className="relative aspect-square w-[6.25rem] cursor-pointer overflow-hidden rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image
                      src={profileState.profilePreviewUrl || '/test.png'}
                      alt={form.watch('nickname') || '프로필 이미지'}
                      fill
                      priority
                      sizes="30vw"
                    />
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </div>
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-auto rounded-[0.5rem] p-[1rem] shadow-none" />
                  </FormControl>
                  <FormDescription>닉네임은 특수문자 없이 2~8자 사이로 입력해 주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={profileState.isUploading}
            className="fixed bottom-[1.25rem] left-[1.25rem] right-[1.25rem] h-auto bg-[#D9D9D9] px-[0.75rem] py-[1rem] text-black shadow-none hover:bg-[#D9D9D9]"
          >
            {profileState.isUploading ? '변경중' : '수정하기'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPageEditProfile;
