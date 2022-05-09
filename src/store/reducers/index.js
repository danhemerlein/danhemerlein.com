import { combineReducers } from 'redux';

import mobileNavReducer from './mobileNav';
import tipJarReducer from './tipJar';
import musicProjectsReducer from './musicProjects';
import siteSettingsReducer from './siteSettings';

const rootReducer = combineReducers({
  musicProjects: musicProjectsReducer,
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  tipJar: tipJarReducer,
});

export default rootReducer;
