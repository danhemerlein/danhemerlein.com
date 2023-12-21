import { combineReducers } from 'redux'

import countdownsReducer from './countdowns'
import mobileNavReducer from './mobileNav'
import siteSettingsReducer from './siteSettings'

const rootReducer = combineReducers({
  siteSettings: siteSettingsReducer,
  mobileNav: mobileNavReducer,
  countdowns: countdownsReducer
})

export default rootReducer
