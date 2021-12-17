import Footer from 'components/base/Footer';
import Header from 'components/base/Header';
import SwitchComp from 'components/navigation/Switch';

import { ThemeContextProvider } from 'context/ThemeContext';
import { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { toggleMobileNav } from './store/actions/mobileNav';
import { getMoodboardContent } from './store/actions/moodboard';
import { getMusicProjectsContent } from './store/actions/musicProjects';
import GlobalReset from './styles/global';
import GlobalFonts from './styles/utilities/type';
import { remHelper } from './utils';

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

const App = ({ mobileNavOpen, mode }) => {
  const dispatch = useDispatch();

  const closeMobileNav = useCallback(
    (e) => {
      if (mobileNavOpen && e.keyCode === 27) {
        dispatch(toggleMobileNav(false));
      }
    },
    [dispatch, mobileNavOpen]
  );

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getMoodboardContent());
      await dispatch(getMusicProjectsContent());
    };

    window.addEventListener('keydown', closeMobileNav);

    loadContent();
  }, [dispatch, closeMobileNav]);

  const handleMobileNavToggle = (event, mobileNavOpen) => {
    dispatch(toggleMobileNav(!mobileNavOpen));
  };

  return (
    <AppContainer theme={theme[mode]}>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme[mode]}>
        <ThemeContextProvider data={mode}>
          <Router>
            <Header
              toggleMobileNav={(event) => {
                return handleMobileNavToggle(event, mobileNavOpen);
              }}
              mobileNavOpen={mobileNavOpen}
            />

            <SwitchComp />
            <Footer />
          </Router>
        </ThemeContextProvider>
      </ThemeProvider>
    </AppContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    mobileNavOpen: state.mobileNav.mobileNavOpen,
    mode: state.siteSettings.mode,
  };
};

export default connect(mapStateToProps)(App);
