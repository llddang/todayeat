import { signOut } from '@/libs/utils/apis/auth.api';

const AuthSignOutButton = () => {
  return (
    <form action={signOut}>
      <button>로그아웃</button>
    </form>
  );
};
export default AuthSignOutButton;
