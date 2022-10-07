import { useContext } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import { UserContext } from './context.js';
import SignInWithGoogleButton from './SignInWithGoogleButton.js';
import SignOutButton from './SignOutButton.js';

const Container = styled(FlexContainer)`
  padding: ${remHelper[16]} 0;
`;

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Container justify="space-between" items="center">
      <P>ableton recipes</P>

      <FlexContainer items="center">
        <P>wtf is ableton recipes?</P>

        {user?.uid?.length > 0 ? <SignOutButton /> : <SignInWithGoogleButton />}
      </FlexContainer>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
