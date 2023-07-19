import { combineReducers } from 'redux'

import countdownsReducer from './countdowns'
import mobileNavReducer from './mobileNav'
import siteSettingsReducer from './siteSettings'
import tipJarReducer from './tipJar'

const rootReducer = combineReducers({
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  tipJar: tipJarReducer,
  countdowns: countdownsReducer
})

export default rootReducer
