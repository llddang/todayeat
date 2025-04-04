import MyPageEditProfile from '@/components/_my-page/my-page-edit-profile';

const MyPage = () => {
  return (
    <section className="relative min-h-[calc(100dvh-48px)] px-[1.25rem]">
      <h2>마이페이지</h2>
      <MyPageEditProfile />
    </section>
  );
};

export default MyPage;
