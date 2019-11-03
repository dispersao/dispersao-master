import { combineReducers } from 'redux'

import { router } from './routes/reducer'
import config from './modules/config/reducer'
import scripts from './modules/scripts/reducer'
import sequences from './modules/sequences/reducer'

const reducer = combineReducers({
  router,
  config,
  scripts,
  sequences
})

export default reducer
