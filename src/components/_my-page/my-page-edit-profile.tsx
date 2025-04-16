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

const formSchema = z.object({
  nickname: FormSchema.NICKNAME_SCHEMA,
  newProfileImage: FormSchema.IMAGE_FILE_SCHEMA.nullable()
});

type FormValues = z.infer<typeof formSchema>;

const MyPageEditProfile = ({ userInfo }: { userInfo: UserDTO }): JSX.Element => {
  const [profileState, setProfileState] = useState({
    isUploading: false,
    profilePreviewUrl: userInfo?.profileImage || null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: userInfo.nickname || '',
      newProfileImage: null
    }
  });

  useEffect(() => {
    // profilePreviewUrl 변경 또는 언마운트 시 Blob URL 정리 → 메모리 누수 방지
    return () => {
      cleanupBlobUrl(profileState.profilePreviewUrl);
    };
  }, [profileState.profilePreviewUrl]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileState((prev) => ({
      ...prev,
      profilePreviewUrl: previewUrl
    }));

    form.setValue('newProfileImage', file);
  };

  const handleSubmitProfileChanges = async (formData: FormValues): Promise<void> => {
    setIsUploading(true);

    const newProfileImageFile = form.getValues('newProfileImage');
    let imageUrl = profileState.profilePreviewUrl;

    if (newProfileImageFile) {
      const uploadResult = await handleProfileImageUpload(newProfileImageFile);
      if (!uploadResult) {
        setIsUploading(false);
        return;
      }
      imageUrl = uploadResult;
    }

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

  const setIsUploading = (isUploading: boolean): void => {
    setProfileState((prev) => ({ ...prev, isUploading }));
  };

  const handleProfileImageUpload = async (imageFile: File): Promise<string | null> => {
    const uploadForm = new FormData();
    uploadForm.append('file', imageFile);

    const result = await uploadImage(SupabaseBucket.PROFILE_IMAGES, uploadForm);

    if (result.error) {
      alert(`${result.error.message} ${result.error.action}`);
      setIsUploading(false);
      return null;
    }

    return result.data;
  };

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
            className="fixed bottom-[1.25rem] left-[1.25rem] right-[1.25rem] h-auto bg-[#D9D9D9] px-3 py-4 text-black shadow-none hover:bg-[#D9D9D9]"
          >
            {profileState.isUploading ? '변경중' : '수정하기'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPageEditProfile;
