import Button from 'components/base/Button.js';
import { useContext } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import { UserContext } from './context.js';
import SignInWithGoogleButton from './SignInWithGoogleButton.js';
import SignOutButton from './SignOutButton.js';

const HeaderButton = styled(Button)`
  margin-right: ${remHelper[8]};
`;

const Container = styled(FlexContainer)`
  padding: ${remHelper[16]} 0;
`;

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Container justify="space-between" items="center">
      <HeaderButton link to="/ableton-recipes">
        <P as="span">ableton recipes</P>
      </HeaderButton>

      <FlexContainer items="center">
        <HeaderButton link to="/ableton-recipes/about">
          <P>wtf is ableton recipes?</P>
        </HeaderButton>

        {user?.uid?.length > 0 ? (
          <HeaderButton link to={`/ableton-recipes/subscriber/${user.uid}`}>
            <P as="span">your dashboard</P>
          </HeaderButton>
        ) : null}

        {user?.uid?.length > 0 ? <SignOutButton /> : <SignInWithGoogleButton />}
      </FlexContainer>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
