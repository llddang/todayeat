'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorResponse } from '@/types/error.type';
import { SupabaseBucketValue } from '@/types/supabase-bucket.type';
import { UserDTO } from '@/types/DTO/user.dto';
import { getUser, updateUser } from '@/lib/apis/user.api';
import { uploadImage } from '@/lib/apis/storage.api';

/**
 * 마이페이지 프로필 수정 컴포넌트
 * 사용자 프로필 이미지와 닉네임을 수정할 수 있는 폼을 제공합니다.
 */
const MyPageEditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩 상태
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태
  const [userData, setUserData] = useState<UserDTO | null>(null); // 사용자 데이터
  const [nicknameInput, setNicknameInput] = useState<UserDTO['nickname']>(''); // 닉네임 입력 값
  const [profileImage, setProfileImage] = useState<UserDTO['profileImage'] | null>(null); // 프로필 이미지 URL (미리보기)
  const [imageFile, setImageFile] = useState<File | null>(null); // 선택된 이미지 파일
  const [isUploading, setIsUploading] = useState<boolean>(false); // 업로드 진행 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await getUser();

        setIsLoggedIn(!!userInfo);
        setUserData(userInfo);
        setNicknameInput(userInfo.nickname);
        setProfileImage(userInfo.profileImage);
      } catch (error) {
        console.error(error);
        alert('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    return () => {
      if (profileImage && profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  /**
   * 닉네임 입력값 변경 핸들러
   * @param {React.ChangeEvent<HTMLInputElement>} e - 이벤트 객체
   */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };

  /**
   * 프로필 이미지 파일 변경 핸들러
   *
   * 파일 입력 필드를 통해 새 이미지가 선택될 때 호출됩니다.
   * 선택된 이미지 파일을 상태에 저장하고, URL.createObjectURL을 사용하여
   * 브라우저 메모리에 임시 URL을 생성해 이미지 미리보기를 제공합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력 이벤트 객체
   */
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  /**
   * 프로필 수정 제출 핸들러
   *
   * 폼 제출 시 호출되며, 다음 작업을 수행합니다:
   * 1. 이미지 파일이 선택된 경우 서버(Storage)에 업로드
   * 2. 닉네임이나 프로필 이미지가 변경된 경우 사용자 정보 업데이트
   * 3. 상황별 알림 메시지 표시
   *
   * @param {React.FormEvent<HTMLFormElement>} e - 폼 제출 이벤트 객체
   */
  const handleSubmitChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = userData?.profileImage || null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const bucketName: SupabaseBucketValue = 'profile-images';
        const result: ErrorResponse<string> = await uploadImage(bucketName, formData);
        if (result.error) {
          throw new Error(result.error.message || '이미지 업로드에 실패했습니다.');
        }

        // 임시 URL인 경우 메모리 해제 (메모리 누수 방지)
        if (profileImage?.startsWith('blob:')) {
          URL.revokeObjectURL(profileImage);
        }

        // 스토리지에 업로드된 이미지 URL로 변수 업데이트
        imageUrl = result.data;
      }

      if (nicknameInput !== userData?.nickname || imageUrl !== userData?.profileImage) {
        await updateUser({
          nickname: nicknameInput,
          profileImage: imageUrl
        });
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
  if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;

  return (
    <div>
      {userData && (
        <form onSubmit={handleSubmitChanges}>
          <label>
            <span className="sr-only">프로필 사진</span>
            <div className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-full after:relative after:flex after:h-full after:w-full after:items-center after:justify-center after:bg-slate-950 after:bg-opacity-50 after:text-white after:opacity-0 after:content-['수정하기'] hover:after:opacity-100">
              {<Image src={profileImage || '/test.png'} alt={userData.nickname} fill priority sizes="30vw" />}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleProfileImageChange(e);
              }}
              className="hidden"
            />
          </label>
          <label>
            <span>닉네임</span>
            <input type="text" value={nicknameInput} onChange={(e) => handleNicknameChange(e)} className="border-2" />
          </label>
          <button type="submit" disabled={isUploading} className="bg-yellow-500">
            {isUploading ? '업로드중' : '수정하기'}
          </button>
        </form>
      )}
    </div>
  );
};

export default MyPageEditProfile;
