import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AbletonRecipes from 'components/pages/AbletonRecipes';
import AbletonRecipesAbout from 'components/pages/AbletonRecipesAbout';
import AbletonRecipesAdmin from 'components/pages/AbletonRecipesAdmin';
import AbletonRecipesDashboard from 'components/pages/AbletonRecipesDashboard';
import About from 'components/pages/About';
import BlogIndex from 'components/pages/BlogIndex';
import BlogPost from 'components/pages/BlogPost';
import Code from 'components/pages/Code';
import CountdownGarden from 'components/pages/CountdownGarden';
import Credits from 'components/pages/Credits';
import HomePage from 'components/pages/HomePage';
import Moodboard from 'components/pages/Moodboard';
import Music from 'components/pages/Music';
import MusicProject from 'components/pages/MusicProject';
import NotFound from 'components/pages/NotFound';
import SiteMap from 'components/pages/SiteMap';
import YAN from 'components/pages/YAN';
import { blockScroll } from 'utils/lib';

const Switch = () => {
  const location = useLocation();

  useEffect(() => {
    blockScroll(false);
  }, [location]);

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

      <Route exact path="/young-and-nauseous" element={<YAN />} />

      <Route
        exact
        path="/experiments/countdown-garden"
        element={<CountdownGarden />}
      />

      <Route exact path="/ableton-recipes" element={<AbletonRecipes />} />

      <Route
        exact
        path="/ableton-recipes/admin"
        element={<AbletonRecipesAdmin />}
      />

      <Route
        exact
        path="/ableton-recipes/about"
        element={<AbletonRecipesAbout />}
      />

      <Route
        exact
        path="/ableton-recipes/subscriber/:id"
        element={<AbletonRecipesDashboard />}
      />

      <Route exact path="/blog" element={<BlogIndex />} />
      <Route exact path="/blog/:handle" element={<BlogPost />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Switch;
