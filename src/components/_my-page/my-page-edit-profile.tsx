'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupabaseBucket } from '@/types/supabase-bucket.type';
import { ImageFileWithPreview } from '@/types/image.type';
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
 * @property {z.ZodString} nickname - 사용자 닉네임 유효성 검증 스키마
 * @property {z.ZodAny} newProfileImage - 새 프로필 이미지 (선택 사항)
 */
const formSchema = z.object({
  nickname: FormSchema.NICKNAME_SCHEMA,
  newProfileImage: z.any().optional()
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
   * - isUploading: 업로드 진행 중 상태
   * - profileImage: 프로필 이미지 정보 (미리보기 URL과 파일)
   */
  const [profileState, setProfileState] = useState({
    isUploading: false,
    profileImage: {
      previewUrl: userInfo?.profileImage || null,
      file: null
    } as ImageFileWithPreview
  });

  /**
   * 이전 닉네임 값을 참조하기 위한 ref
   * 변경 여부를 확인하는 데 사용됨
   */
  const prevNicknameRef = useRef<string>(userInfo.nickname);
  /**
   * 파일 입력 요소에 접근하기 위한 ref
   * 프로필 이미지 클릭 시 파일 선택 다이얼로그를 표시하는 데 사용
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      cleanupBlobUrl(profileState.profileImage.previewUrl);
    };
  }, [profileState.profileImage.previewUrl]);

  /**
   * 프로필 이미지 변경 처리 핸들러
   * 사용자가 새 이미지를 선택하면 미리보기 URL을 생성하고 상태 업데이트
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력 변경 이벤트
   */
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    cleanupBlobUrl(profileState.profileImage.previewUrl);

    const previewUrl = URL.createObjectURL(file);
    setProfileState((prev) => ({
      ...prev,
      profileImage: { file, previewUrl }
    }));
    form.setValue('newProfileImage', file);
  };

  /**
   * 프로필 변경 사항 제출 처리 핸들러
   * 사용자 프로필 변경 사항을 저장하고 상태를 업데이트
   *
   * @param {FormValues} formData - 폼 제출 데이터
   */
  const handleSubmitChanges = async (formData: FormValues) => {
    setProfileState((prev) => ({ ...prev, isUploading: true }));

    const prevNickname = prevNicknameRef.current;
    const prevImageUrl = profileState.profileImage.previewUrl;
    let newImageUrl = prevImageUrl;

    // 새 프로필 이미지가 있는 경우 업로드 처리
    if (profileState.profileImage.file) {
      const uploadForm = new FormData();
      uploadForm.append('file', profileState.profileImage.file);

      const result = await uploadImage(SupabaseBucket.PROFILE_IMAGES, uploadForm);

      if (result.error) {
        alert(`${result.error.message} ${result.error.action}`);

        setProfileState((prev) => ({ ...prev, isUploading: false }));
        return;
      }
      newImageUrl = result.data;
    }

    // 데이터 변경 여부 확인
    const isDataChanged = formData.nickname !== prevNickname || newImageUrl !== prevImageUrl;

    if (!isDataChanged) {
      alert('변경된 정보가 없습니다.');
      setProfileState((prev) => ({ ...prev, isUploading: false }));
      return;
    }

    try {
      // 사용자 정보 업데이트 API 호출
      await updateUser({
        nickname: formData.nickname,
        profileImage: newImageUrl
      });

      form.reset({
        nickname: formData.nickname,
        newProfileImage: null
      });

      alert('프로필 수정이 완료되었습니다.');

      // 선택된 파일 상태 초기화
      setProfileState((prev) => ({
        ...prev,
        isUploading: false,
        profileImage: { previewUrl: newImageUrl, file: null }
      }));
    } catch (error) {
      console.error('프로필 업데이트 에러: ', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
      setProfileState((prev) => ({ ...prev, isUploading: false }));
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitChanges)} className="relative w-full">
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
                      src={profileState.profileImage.previewUrl || '/test.png'}
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
            className="fixed bottom-[1.25rem] left-[1.25rem] right-[1.25rem] h-auto bg-[#D9D9D9] px-[0.75rem] py-[1rem] text-black shadow-none"
          >
            {profileState.isUploading ? '변경중' : '수정하기'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPageEditProfile;
