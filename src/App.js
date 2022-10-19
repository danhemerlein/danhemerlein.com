import Footer from 'components/base/Footer';
import Header from 'components/base/Header/index.js';
import Switch from 'components/navigation/Switch';
import { ThemeContextProvider } from 'context/ThemeContext';
import { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { toggleMobileNav } from 'store/actions/mobileNav';

import { setup as reactContentfulImageSetup } from 'react-contentful-image';
import { toggleTipJar } from 'store/actions/tipJar';
import styled, { ThemeProvider } from 'styled-components';
import GlobalReset from 'styles/global';
import theme from 'styles/theme';
import GlobalFonts from 'styles/utilities/type';
import { blockScroll } from 'utils/lib';
import { remHelper } from 'utils/remHelper';

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
  background-color: ${({ theme }) => {
    return theme.background;
  }};
  color: ${({ theme }) => {
    return theme.foreground;
  }};

  ${({ withPaddingTop }) => {
    if (withPaddingTop) {
      return `padding-top: ${remHelper[16]};`;
    }

    return `padding-top: 0`;
  }}
`;

const mobile = '320px';
const tablet = '720px';
const desktop = '1024px';
const desktopMax = '1440px';

const media = {
  xs: `(min-width: ${mobile})`,
  sm: `(min-width: ${tablet})`,
  md: `(min-width: ${desktop})`,
  lg: `(min-width: ${desktopMax})`,
  dpr2: '(min-resolution: 144dpi)', // 1.5x devices and up get 2x images
  dpr3: '(min-resolution: 240dpi)', // 2.5x devices and up get 3x images
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
};

const variants = {
  default: {
    quality: 85,
    density: 1
  },
  dpr2: {
    quality: 35,
    density: 2
  },
  dpr3: {
    quality: 25,
    density: 3
  }
};

reactContentfulImageSetup(media, variants);

const App = ({ mobileNavOpen, tipJarOpen, mode }) => {
  const [isAbleton, setIsAbleton] = useState(false);

  const dispatch = useDispatch();

  const closeAllModals = useCallback(
    (e) => {
      if (!e) {
        if (mobileNavOpen || tipJarOpen) {
          dispatch(toggleMobileNav(false));
          dispatch(toggleTipJar(false));
          blockScroll(false);
        }
      } else if (e.keyCode === 27) {
        dispatch(toggleMobileNav(false));
        dispatch(toggleTipJar(false));
      }
    },
    [dispatch, mobileNavOpen, tipJarOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeAllModals);

    setIsAbleton(window.location.pathname.includes('ableton'));
  }, [dispatch, closeAllModals]);

  const handleMobileNavToggle = (event, mobileNavOpen) => {
    dispatch(toggleMobileNav(!mobileNavOpen));
  };

  const handleTipJarToggle = (event, tipJarOpen) => {
    dispatch(toggleTipJar(!tipJarOpen));
  };

  const withPaddingTop = isAbleton !== true;

  return (
    <>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme[mode]}>
        <ThemeContextProvider data={mode}>
          <Router>
            <AppContainer withPaddingTop={withPaddingTop}>
              <Header
                toggleMobileNav={(event) => {
                  return handleMobileNavToggle(event, mobileNavOpen);
                }}
                closeAllModals={(event) => {
                  return closeAllModals(event);
                }}
                mobileNavOpen={mobileNavOpen}
                tipJarOpen={tipJarOpen}
                toggleTipJar={(event) => {
                  return handleTipJarToggle(event, tipJarOpen);
                }}
              />

              <Switch />
              <Footer />
            </AppContainer>
          </Router>
        </ThemeContextProvider>
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mobileNavOpen: state.mobileNav.mobileNavOpen,
    tipJarOpen: state.tipJar.tipJarOpen,
    mode: state.siteSettings.mode
  };
};

export default connect(mapStateToProps)(App);
