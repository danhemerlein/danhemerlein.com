import Footer from 'components/base/Footer';
import Header from 'components/base/Header/index.js';
import Switch from 'components/navigation/Switch';
import { ThemeContextProvider } from 'context/ThemeContext';
import { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { toggleMobileNav } from 'store/actions/mobileNav';

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
`;

const App = ({ mobileNavOpen, tipJarOpen, mode }) => {
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
  }, [dispatch, closeAllModals]);

  const handleMobileNavToggle = (event, mobileNavOpen) => {
    dispatch(toggleMobileNav(!mobileNavOpen));
  };

  const handleTipJarToggle = (event, tipJarOpen) => {
    dispatch(toggleTipJar(!tipJarOpen));
  };

  return (
    <>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme[mode]}>
        <ThemeContextProvider data={mode}>
          <Router>
            <AppContainer>
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
