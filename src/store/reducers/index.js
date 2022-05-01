import { combineReducers } from 'redux';

import codeProjectsReducer from './codeProjects';
import mobileNavReducer from './mobileNav';
import tipJarReducer from './tipJar';
import musicProjectsReducer from './musicProjects';
import siteSettingsReducer from './siteSettings';

const rootReducer = combineReducers({
  musicProjects: musicProjectsReducer,
  codeProjects: codeProjectsReducer,
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  tipJar: tipJarReducer,
});

export default rootReducer;
