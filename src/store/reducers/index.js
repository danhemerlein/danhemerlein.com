import { combineReducers } from 'redux';

import mobileNavReducer from './mobileNav';
import tipJarReducer from './tipJar';
import siteSettingsReducer from './siteSettings';

const rootReducer = combineReducers({
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  tipJar: tipJarReducer
});

export default rootReducer;
