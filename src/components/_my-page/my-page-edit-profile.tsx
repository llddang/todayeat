'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import DefaultProfile from '@/../public/illustrations/default-profile.svg';

const formSchema = z.object({
  nickname: FormSchema.NICKNAME_SCHEMA,
  newProfileImage: FormSchema.IMAGE_FILE_SCHEMA.nullable()
});

type FormValues = z.infer<typeof formSchema>;

type MyPageEditProfileProps = {
  userInfo: UserDTO;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => Promise<void>;
};

const MyPageEditProfile = ({ userInfo, setOpen, refresh }: MyPageEditProfileProps): JSX.Element => {
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

  const handleProfileUpdateSuccess = async (nickname: string, newImageUrl: string | null) => {
    form.reset({ nickname, newProfileImage: null });
    alert('프로필 수정이 완료되었습니다.');

    setProfileState((prev) => ({
      ...prev,
      profilePreviewUrl: newImageUrl
    }));
    setOpen(false);
    await refresh();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitProfileChanges)} className="relative w-full">
          <div className="space-y-[2.3rem]">
            <FormItem>
              <FormLabel className="sr-only">프로필 사진</FormLabel>
              <FormControl>
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <div
                      className="relative aspect-square w-[5.625rem] cursor-pointer overflow-hidden rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Image
                        src={profileState.profilePreviewUrl || DefaultProfile}
                        alt={form.watch('nickname') || '프로필 이미지'}
                        fill
                        priority
                        sizes="30vw"
                      />
                    </div>
                    <IconButton
                      alt="프로필 사진 수정하기"
                      size="sm"
                      icon="before:bg-add-info-icon"
                      className="absolute bottom-0 right-0 h-6 w-6 bg-gray-500 hover:bg-gray-500"
                      onClick={() => fileInputRef.current?.click()}
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
                <FormItem className="space-y-2">
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>한글, 영어, 숫자만 사용해 2~8자로 입력해 주세요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={profileState.isUploading} className="mt-8 w-full">
            <Typography as="span" variant="subTitle4">
              {profileState.isUploading ? '변경중' : '수정하기'}
            </Typography>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPageEditProfile;
