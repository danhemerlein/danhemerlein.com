import Footer from 'components/base/Footer';
import Header from 'components/base/Header/index.js';
import SwitchComp from 'components/navigation/Switch';
import { ThemeContextProvider } from 'context/ThemeContext';
import { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { toggleMobileNav } from 'store/actions/mobileNav';
import { getMoodboardContent } from 'store/actions/moodboard';
import { getMusicProjectsContent } from 'store/actions/musicProjects';
import { toggleTipJar } from 'store/actions/tipJar';
import styled, { ThemeProvider } from 'styled-components';
import GlobalReset from 'styles/global';
import theme from 'styles/theme';
import GlobalFonts from 'styles/utilities/type';
import { remHelper } from 'utils';

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

const App = ({ mobileNavOpen, tipJarOpen, mode }) => {
  const dispatch = useDispatch();

  const closeAllModals = useCallback(
    (e) => {
      if (!e) {
        if (mobileNavOpen || tipJarOpen) {
          dispatch(toggleMobileNav(false));
          dispatch(toggleTipJar(false));
        }
      } else if (e.keyCode === 27) {
        dispatch(toggleMobileNav(false));
        dispatch(toggleTipJar(false));
      }
    },
    [dispatch, mobileNavOpen, tipJarOpen]
  );

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getMoodboardContent());
      await dispatch(getMusicProjectsContent());
    };

    window.addEventListener('keydown', closeAllModals);

    loadContent();
  }, [dispatch, closeAllModals]);

  const handleMobileNavToggle = (event, mobileNavOpen) => {
    dispatch(toggleMobileNav(!mobileNavOpen));
  };

  const handleTipJarToggle = (event, tipJarOpen) => {
    dispatch(toggleTipJar(!tipJarOpen));
  };

  return (
    <AppContainer theme={theme[mode]}>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme[mode]}>
        <ThemeContextProvider data={mode}>
          <Router>
            <Header
              toggleMobileNav={(event) =>
                handleMobileNavToggle(event, mobileNavOpen)
              }
              closeAllModals={(event) => closeAllModals(event)}
              mobileNavOpen={mobileNavOpen}
              tipJarOpen={tipJarOpen}
              toggleTipJar={(event) => handleTipJarToggle(event, tipJarOpen)}
            />

            <SwitchComp />
            <Footer />
          </Router>
        </ThemeContextProvider>
      </ThemeProvider>
    </AppContainer>
  );
};

const mapStateToProps = (state) => ({
  mobileNavOpen: state.mobileNav.mobileNavOpen,
  tipJarOpen: state.tipJar.tipJarOpen,
  mode: state.siteSettings.mode,
});

export default connect(mapStateToProps)(App);
