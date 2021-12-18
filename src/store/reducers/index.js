import { combineReducers } from 'redux';
import aboutPageReducer from './aboutPage';
import codeProjectsReducer from './codeProjects';
import mobileNavReducer from './mobileNav';
import tipJarReducer from './tipJar';
import moodboardReducer from './moodboard';
import musicProjectsReducer from './musicProjects';
import siteSettingsReducer from './siteSettings';

const rootReducer = combineReducers({
  aboutPage: aboutPageReducer,
  moodboard: moodboardReducer,
  musicProjects: musicProjectsReducer,
  codeProjects: codeProjectsReducer,
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  tipJar: tipJarReducer,
});

export default rootReducer;
