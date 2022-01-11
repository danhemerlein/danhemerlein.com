import About from 'components/pages/About';
import Code from 'components/pages/Code';
import Credits from 'components/pages/Credits';
import HomePage from 'components/pages/HomePage';
import Moodboard from 'components/pages/Moodboard';
import Music from 'components/pages/Music';
import MusicProject from 'components/pages/MusicProject';
import NotFound from 'components/pages/NotFound';
import SiteMap from 'components/pages/SiteMap';
import { Route, Switch } from 'react-router-dom';

const SwitchComp = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/about" component={About} />

      <Route exact path="/code" component={Code} />

      <Route exact path="/credits" component={Credits} />

      <Route exact path="/moodboard" component={Moodboard} />

      <Route exact path="/music" component={Music} />

      <Route exact path="/music/:handle" component={MusicProject} />

      <Route exact path="/site-map" component={SiteMap} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default SwitchComp;
