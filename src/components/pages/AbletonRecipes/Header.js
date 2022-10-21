import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlexContainer, P } from 'styles/elements';
import { UserContext } from './context.js';
import * as styles from './Header.styles.js';
import SignInWithGoogleButton from './SignInWithGoogleButton.js';
import SignOutButton from './SignOutButton.js';

const Header = () => {
  const { user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [opaqueBackground, setOpaqueBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const buyMeACoffeeWidgetToggle = () => {
    const html = document.querySelector('html');
    const iframe = document.querySelector('iframe[title="Buy Me a Coffee"');

    const widgetSrc =
      'https://www.buymeacoffee.com/widget/page/danhemerlein?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%230086E0';

    html.classList.toggle('bmac-widget-active');
    iframe.src = widgetSrc;
  };

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
    <styles.Container
      justify="space-between"
      items="center"
      scrolled={scrolled}
    >
      <styles.MobileMenuContent
        justify="space-between"
        items="center"
        direction="row"
      >
        <styles.MobileMenuTrigger
          clickHandler={() => {
            return setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          <P as="span">menu</P>
        </styles.MobileMenuTrigger>

        <styles.HeaderButton link to="/ableton-recipes">
          <P as="span">ableton recipes</P>
        </styles.HeaderButton>
      </styles.MobileMenuContent>

      <styles.DesktopContent>
        <styles.HeaderButton link to="/ableton-recipes">
          <P as="span">ableton recipes</P>
        </styles.HeaderButton>

        <FlexContainer items="center">
          <styles.HeaderButton link to="/ableton-recipes/about">
            <P>wtf is ableton recipes?</P>
          </styles.HeaderButton>

          {user?.uid?.length > 0 ? (
            <styles.HeaderButton
              link
              to={`/ableton-recipes/subscriber/${user.uid}`}
            >
              <P as="span">dashboard</P>
            </styles.HeaderButton>
          ) : null}

          <styles.HeaderButton clickHandler={buyMeACoffeeWidgetToggle}>
            <P as="span">buy me a coffee</P>
          </styles.HeaderButton>

          {user?.uid?.length > 0 ? (
            <SignOutButton />
          ) : (
            <SignInWithGoogleButton />
          )}
        </FlexContainer>
      </styles.DesktopContent>

      <styles.MobileContent mobileMenuOpen={mobileMenuOpen}>
        <FlexContainer>
          <styles.CloseMobileMenuButton
            clickHandler={() => {
              return setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <P as="span">close menu</P>
          </styles.CloseMobileMenuButton>
        </FlexContainer>

        <styles.MobileInner items="flex-start" direction="column">
          <styles.HeaderButton link to="/ableton-recipes/about">
            <P>wtf is ableton recipes?</P>
          </styles.HeaderButton>

          {user?.uid?.length > 0 ? (
            <styles.HeaderButton
              link
              to={`/ableton-recipes/subscriber/${user.uid}`}
            >
              <P as="span">dashboard</P>
            </styles.HeaderButton>
          ) : null}

          <styles.HeaderButton clickHandler={buyMeACoffeeWidgetToggle}>
            <P as="span">buy me a coffee</P>
          </styles.HeaderButton>

          {user?.uid?.length > 0 ? (
            <SignOutButton />
          ) : (
            <SignInWithGoogleButton />
          )}
        </styles.MobileInner>
      </styles.MobileContent>
    </styles.Container>
  );
};

Header.propTypes = {};

export default Header;
