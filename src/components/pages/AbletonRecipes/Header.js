import Button from 'components/base/Button.js';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';
import { UserContext } from './context.js';
import SignInWithGoogleButton from './SignInWithGoogleButton.js';
import SignOutButton from './SignOutButton.js';

const HeaderButton = styled(Button)`
  ${above.desktop`
    margin-right: ${remHelper[8]};
  `}
  background: ${({ theme }) => {
    return theme.background;
  }};
`;

const Container = styled(FlexContainer)`
  padding: ${remHelper[16]};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  margin-left: -${remHelper[16]};
  flex-direction: column;
  row-gap: ${remHelper[8]};

  ${({ scrolled }) => {
    if (scrolled) {
      return 'background: black;';
    }
    return 'background: white;';
  }}

  div {
    flex-direction: column;
    row-gap: ${remHelper[8]};
    width: 100%;
  }

  button,
  a {
    width: 100%;
  }

  ${above.desktop`
    flex-direction: row;

    button,
    a {
      width: auto;
    }

    div {
      width: auto;
      flex-direction: row;
    }
  `}
`;

const Header = () => {
  const { user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [opaqueBackground, setOpaqueBackground] = useState(false);

  useEffect(() => {
    setOpaqueBackground(scrolled || showBackground);
  }, [scrolled, showBackground]);

  useLayoutEffect(() => {
    const scrollListener = () => {
      setScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', scrollListener, true);

    return function cleanUpListener() {
      window.removeEventListener('scroll', scrollListener, true);
    };
  }, []);

  return (
    <Container justify="space-between" items="center" scrolled={scrolled}>
      <HeaderButton link to="/ableton-recipes">
        <P as="span">ableton recipes</P>
      </HeaderButton>

      <FlexContainer items="center">
        <HeaderButton link to="/ableton-recipes/about">
          <P>wtf is ableton recipes?</P>
        </HeaderButton>

        {user?.uid?.length > 0 ? (
          <HeaderButton link to={`/ableton-recipes/subscriber/${user.uid}`}>
            <P as="span">dashboard</P>
          </HeaderButton>
        ) : null}

        <HeaderButton
          anchor
          href="https://www.buymeacoffee.com/danhemerlein"
          target="_blank"
          rel="noopener noreferrer"
        >
          <P as="span">buy me a coffee</P>
        </HeaderButton>

        {user?.uid?.length > 0 ? <SignOutButton /> : <SignInWithGoogleButton />}
      </FlexContainer>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
