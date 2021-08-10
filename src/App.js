import Footer from "components/base/Footer";
import Header from "components/base/Header";
import SwitchComp from "components/navigation/Switch";
import { ThemeContextProvider } from "context/ThemeContext";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { getMoodboardContent } from "./store/actions/moodboard";
import { getMusicProjectsContent } from "./store/actions/musicProjects";
import { toggleMobileNav } from "./store/actions/siteSettings";
import GlobalReset from "./styles/global";
import GlobalFonts from "./styles/utilities/type";
import { remHelper } from "./utils";

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
  background-color: ${({ theme, $mode }) => theme[$mode].background};
  color: ${({ theme, $mode }) => theme[$mode].foreground};
`;

const App = ({ mobileNavOpen, mode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getMoodboardContent());
      await dispatch(getMusicProjectsContent());
    };

    loadContent();
  }, [dispatch]);

  const handleMobileNavToggle = (event, mobileNavOpen) => {
    dispatch(toggleMobileNav(!mobileNavOpen));
  };

  return (
    <AppContainer $mode={mode} theme={theme}>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme}>
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
    mobileNavOpen: state.siteSettings.mobileNavOpen,
    mode: state.siteSettings.mode,
  };
};

export default connect(mapStateToProps)(App);
