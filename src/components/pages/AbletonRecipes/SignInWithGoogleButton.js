import { signInWithPopup } from 'firebase/auth';

import Button from 'components/base/Button';
import styled from 'styled-components';
import { auth, provider } from 'utils/firestore';

const StyledButton = styled(Button)`
  width: 24rem;
  margin: 0 auto;
`;

export function SignInWithGoogleButton() {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
  };

  return (
    <StyledButton clickHandler={signInWithGoogle}>
      sign in with google
    </StyledButton>
  );
}
