import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import { UserContext } from './context.js';
import SignInWithGoogleButton from './SignInWithGoogleButton.js';
import SignOutButton from './SignOutButton.js';

const StyledLink = styled(Link)`
  diplay: inline-block;
  margin-right: ${remHelper[8]};
`;

const Container = styled(FlexContainer)`
  padding: ${remHelper[16]} 0;
`;

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Container justify="space-between" items="center">
      <StyledLink to="/ableton-recipes">
        <P as="span">ableton recipes</P>
      </StyledLink>

      <FlexContainer items="center">
        <StyledLink to="/ableton-recipes/about">
          <P>wtf is ableton recipes?</P>
        </StyledLink>

        {user?.uid?.length > 0 ? (
          <StyledLink to={`/ableton-recipes/subscriber/${user.uid}`}>
            <P as="span">user dashboard</P>
          </StyledLink>
        ) : null}

        {user?.uid?.length > 0 ? <SignOutButton /> : <SignInWithGoogleButton />}
      </FlexContainer>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
