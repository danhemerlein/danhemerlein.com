import About from 'components/pages/About';
import Code from 'components/pages/Code';
import Credits from 'components/pages/Credits';
import HomePage from 'components/pages/HomePage';
import Moodboard from 'components/pages/Moodboard';
import Music from 'components/pages/Music';
import MusicProject from 'components/pages/MusicProject';
import NotFound from 'components/pages/NotFound';
import SiteMap from 'components/pages/SiteMap';
import { Route, Routes } from 'react-router-dom';

const SwitchComp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />

      <Route exact path="/about" element={<About />} />

      <Route exact path="/code" element={<Code />} />

      <Route exact path="/credits" element={<Credits />} />

      <Route exact path="/moodboard" element={<Moodboard />} />

      <Route exact path="/music" element={<Music />} />

      <Route exact path="/music/:handle" element={<MusicProject />} />

      <Route exact path="/site-map" element={<SiteMap />} />

      <Route element={<NotFound />} />
    </Routes>
  );
};

export default SwitchComp;
