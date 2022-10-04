import Button from 'components/base/Button';
import { auth } from 'utils/firestore';

const SignOutButton = () => {
  const handleClick = () => {
    auth.signOut();
  };
  return (
    <Button CTA="log out" mode="secondary" clickHandler={handleClick}>
      sign out
    </Button>
  );
};

export default SignOutButton;
