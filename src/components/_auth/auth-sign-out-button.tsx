import { Button } from '@/components/ui/button';
import { signOut } from '@/libs/apis/auth-server.api';

const AuthSignOutButton = () => {
  return (
    <form action={signOut}>
      <Button>로그아웃</Button>
    </form>
  );
};
export default AuthSignOutButton;
