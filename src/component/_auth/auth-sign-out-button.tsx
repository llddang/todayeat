import { signOut } from '@/libs/apis/auth-server.api';

const AuthSignOutButton = () => {
  return (
    <form action={signOut}>
      <button>로그아웃</button>
    </form>
  );
};
export default AuthSignOutButton;
