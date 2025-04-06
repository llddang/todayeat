import MyPageEditProfile from '@/components/_my-page/my-page-edit-profile';
import { getUser } from '@/lib/apis/user.api';

const MyPage = async () => {
  const userInfo = await getUser();

  return (
    <section className="relative min-h-[calc(100dvh-48px)] px-[1.25rem]">
      <h2>마이페이지</h2>
      <MyPageEditProfile userInfo={userInfo} />
    </section>
  );
};

export default MyPage;
