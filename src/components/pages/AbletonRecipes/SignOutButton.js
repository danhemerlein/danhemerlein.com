import Button from 'components/base/Button';
import { P } from 'styles/elements';
import { auth } from 'utils/firestore';

const SignOutButton = () => {
  const handleClick = () => {
    auth.signOut();
  };
  return (
    <Button CTA="log out" mode="secondary" clickHandler={handleClick}>
      <P as="span">sign out</P>
    </Button>
  );
};

export default SignOutButton;
