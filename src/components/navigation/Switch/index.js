import About from "components/pages/About";
import Code from "components/pages/Code";
import Credits from "components/pages/Credits";
import HomePage from "components/pages/HomePage";
import Moodboard from "components/pages/Moodboard";
import Music from "components/pages/Music";
import NotFound from "components/pages/NotFound";
import React from "react";
// import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import MusicProjectRoutes from "../MusicProjectRoutes";
// import { toggleMobileNav } from "store/actions/siteSettings";

const SwitchComp = ({ mobileNavOpen }) => {
  // const [currentRoute, setCurrentRoute] = useState("/");
  // const dispatch = useDispatch();

  // function usePageViews() {
  //   const location = useLocation();
  //   setCurrentRoute(location.pathname);

  //   useEffect(() => {
  //     if (currentRoute !== location.pathname && mobileNavOpen) {
  //       dispatch(toggleMobileNav(!mobileNavOpen));
  //     }
  //   }, [location]);
  // }

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/about" component={About} />

      <Route exact path="/code" component={Code} />

      <Route exact path="/credits" component={Credits} />

      <Route exact path="/moodboard" component={Moodboard} />

      <Route exact path="/music" component={Music} />

      <MusicProjectRoutes />

      <Route component={NotFound} />
    </Switch>
  );
};

export default SwitchComp;
