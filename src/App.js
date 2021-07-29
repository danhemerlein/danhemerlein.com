import Footer from "components/base/Footer";
// base components
import Header from "components/base/Header";
import Loading from "components/other/Loading";
import About from "components/pages/About";
import Blog from "components/pages/Blog";
import Code from "components/pages/Code";
import Credits from "components/pages/Credits";
import HomePage from "components/pages/HomePage";
import Moodboard from "components/pages/Moodboard";
import Music from "components/pages/Music";
import MusicProject from "components/pages/MusicProject";
import NotFound from "components/pages/NotFound";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { getMoodboardContent } from "./store/actions/moodboard";
import { getMusicProjectsContent } from "./store/actions/musicProjects";
import GlobalReset from "./styles/global";
import GlobalFonts from "./styles/utilities/type";
import { remHelper } from "./utils";

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
`;

function App({
  moodboardLoading,
  moodboard,
  musicProjectsLoading,
  musicProjects,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getMoodboardContent());
      await dispatch(getMusicProjectsContent());
    };

    loadContent();
  }, [dispatch]);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  let musicPageRoutes;

  if (!musicProjectsLoading && musicProjects.length) {
    musicPageRoutes = musicProjects.map((project) => {
      const handle = `/music/${project.fields.handle}`;
      return (
        <Route
          path={handle}
          key={project}
          render={(props) => <MusicProject {...props} project={project} />}
        />
      );
    });
  }

  function usePageViews() {
    const location = useLocation();
    setCurrentRoute(location.pathname);

    useEffect(() => {
      if (currentRoute !== location.pathname && mobileNavOpen) {
        toggleMobileNav();
      }
    }, [location]);
  }

  const loading = moodboardLoading && musicProjectsLoading;
  const content = moodboard.length && musicProjects.length;

  function SwitchComp() {
    usePageViews();

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/about" component={About} />

        <Route exact path="/blog" render={() => <Blog />} />

        <Route exact path="/code" component={Code} />

        <Route exact path="/credits" component={Credits} />

        <Route
          exact
          path="/moodboard"
          render={() => <Moodboard images={moodboard} />}
        />

        <Route exact path="/music" render={() => <Music />} />

        {musicPageRoutes}

        <Route render={() => <NotFound />} />
      </Switch>
    );
  }

  if (loading === false && !content) {
    return null;
  }
  if (loading === true && !content) {
    return <Loading />;
  }
  return (
    <AppContainer>
      <GlobalReset />
      <GlobalFonts />

      <ThemeProvider theme={theme}>
        <Router>
          <Header
            toggleMobileNav={toggleMobileNav}
            mobileNavOpen={mobileNavOpen}
            currentRoute={currentRoute}
          />
          <SwitchComp />
          <Footer />
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    moodboardLoading: state.moodboard.loading,
    moodboard: state.moodboard.content,
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.activeProjects,
  };
};

export default connect(mapStateToProps)(App);
