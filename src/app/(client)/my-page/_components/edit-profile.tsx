'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUser, updateUser } from '@/apis/user.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import formSchema from '@/schemas/form-schema.schema';
import { cleanupBlobUrl } from '@/utils/cleanup-blob-url.util';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import DefaultProfile from '@/../public/illustrations/default-profile.svg';
import { useUserStore } from '@/store/user.store';
import { uploadProfileImage } from '../_utils/upload-profile-image.util';
import { useToast } from '@/hooks/use-toast';
import Modal from '@/components/commons/modal';

const editProfileFormSchema = z.object({
  nickname: formSchema.NICKNAME_SCHEMA,
  newProfileImage: formSchema.IMAGE_FILE_SCHEMA.nullable()
});

type FormValues = z.infer<typeof editProfileFormSchema>;

type EditProfileProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const EditProfile = ({ setOpen }: EditProfileProps) => {
  const { toast } = useToast();

  const { user, setUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileState, setProfileState] = useState({
    isUploading: false,
    profilePreviewUrl: user?.profileImage || null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      nickname: user.nickname || '',
      newProfileImage: null
    }
  });

  useEffect(() => {
    return () => {
      cleanupBlobUrl(profileState.profilePreviewUrl);
    };
  }, [profileState.profilePreviewUrl]);

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    let { profilePreviewUrl } = profileState;

    if (newProfileImageFile) {
      try {
        const uploadResult = await uploadProfileImage(newProfileImageFile);
        profilePreviewUrl = uploadResult;
      } catch (error) {
        setIsModalOpen(true);
        console.error(error);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    if (formData.nickname === user.nickname && profilePreviewUrl === user.profileImage) {
      toast({
        description: '변경된 정보가 없습니다.',
        icon: 'before:bg-toast-fail',
        duration: 3000
      });
      return setIsUploading(false);
    }

    await updateUser({
      nickname: formData.nickname,
      profileImage: profilePreviewUrl
    });

    handleProfileUpdateSuccess(formData.nickname, profilePreviewUrl);
  };

  const setIsUploading = (isUploading: boolean): void => {
    setProfileState((prev) => ({ ...prev, isUploading }));
  };

  const handleProfileUpdateSuccess = async (nickname: string, newImageUrl: string | null) => {
    form.reset({ nickname, newProfileImage: null });
    toast({
      description: '프로필이 성공적으로 수정되었습니다.',
      icon: 'before:bg-toast-success',
      duration: 3000
    });
    setProfileState((prev) => ({
      ...prev,
      profilePreviewUrl: newImageUrl
    }));

    const updatedUser = await getUser();
    setUser(updatedUser);
    setOpen(false);
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
                        className="object-cover"
                      />
                    </div>
                    <IconButton
                      title="프로필 사진 수정하기"
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
              render={({ field }) => {
                const hasError = !!form.formState.errors.nickname;

                return (
                  <FormItem className="space-y-2">
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {!hasError && <FormDescription>한글, 영어, 숫자만 사용해 2~8자로 입력해 주세요</FormDescription>}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button type="submit" disabled={profileState.isUploading} className="mt-8 w-full">
            <Typography as="span" variant="subTitle4">
              {profileState.isUploading ? '변경중' : '수정하기'}
            </Typography>
          </Button>
        </form>
      </Form>
      <Modal
        title="이미지 업로드하지 못했습니다."
        content="잠시후 다시 시도해주세요."
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default EditProfile;
