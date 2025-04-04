'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupabaseBucket } from '@/types/supabase-bucket.type';
import { ImageFileWithPreview } from '@/types/image.type';
import { getUser, updateUser } from '@/lib/apis/user.api';
import { uploadImage } from '@/lib/apis/storage.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormSchema from '@/constants/form-schema.constant';

const formSchema = z.object({
  nickname: FormSchema.NICKNAME_SCHEMA,
  newProfileImage: z.any().optional()
});

type FormValues = z.infer<typeof formSchema>;

const MyPageEditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩 상태
  const [isUploading, setIsUploading] = useState<boolean>(false); // 업로드 진행 상태

  const prevNicknameRef = useRef<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImageData, setProfileImageData] = useState<ImageFileWithPreview>({
    previewUrl: null,
    file: null
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      newProfileImage: null
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      // ? 미들웨어에서 인증 처리를 하므로 별도의 에러 처리 없이 진행
      const userInfo = await getUser();

      form.reset({
        nickname: userInfo.nickname || '',
        newProfileImage: null
      });

      prevNicknameRef.current = userInfo.nickname;

      setProfileImageData({
        previewUrl: userInfo.profileImage,
        file: null
      });

      setIsLoading(false);
    };

    fetchUserData();
  }, [form]);

  useEffect(() => {
    return () => {
      if (profileImageData.previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImageData.previewUrl);
      }
    };
  }, [profileImageData.previewUrl]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (profileImageData.previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImageData.previewUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      setProfileImageData({ file, previewUrl });
      form.setValue('newProfileImage', file);
    }
  };

  const handleSubmitChanges = async (formData: FormValues) => {
    setIsUploading(true);

    try {
      const prevNickname = prevNicknameRef.current;
      const prevImageUrl = profileImageData.previewUrl;

      let newImageUrl = prevImageUrl;

      if (profileImageData.file) {
        const uploadForm = new FormData();
        uploadForm.append('file', profileImageData.file);

        const result = await uploadImage(SupabaseBucket.PROFILE_IMAGES, uploadForm);

        if (result.error) {
          alert('프로필 사진 업로드에 실패했습니다.');
          setIsUploading(false);
          return;
        }

        newImageUrl = result.data;
      }

      // 데이터 변경 여부 확인
      const isDataChanged = formData.nickname !== prevNickname || newImageUrl !== prevImageUrl;

      if (isDataChanged) {
        await updateUser({
          nickname: formData.nickname,
          profileImage: newImageUrl
        });

        form.reset({
          nickname: formData.nickname,
          newProfileImage: null
        });

        // 선택된 파일 상태 초기화
        setProfileImageData({ previewUrl: newImageUrl, file: null });

        alert('프로필이 성공적으로 업데이트되었습니다.');
      } else {
        alert('변경된 정보가 없습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <div>로딩중</div>;

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
                      src={profileImageData.previewUrl || '/test.png'}
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
            disabled={isUploading}
            className="fixed bottom-[1.25rem] left-[1.25rem] right-[1.25rem] h-auto bg-[#D9D9D9] px-[0.75rem] py-[1rem] text-black shadow-none"
          >
            {isUploading ? '업로드중...' : '수정하기'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPageEditProfile;
