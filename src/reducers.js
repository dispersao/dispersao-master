import { combineReducers } from 'redux'

import { router } from './routes/reducer'
import config from './modules/config/reducer'
import scripts from './modules/scripts/reducer'
import sequences from './modules/sequences/reducer'
import characters from './modules/characters/reducer'
import categories from './modules/categories/reducer'
import locations from './modules/locations/reducer'
import parts from './modules/parts/reducer'
import types from './modules/types/reducer'
import scriptsequences from './modules/scriptsequences/reducer'

const reducer = combineReducers({
  router,
  config,
  scripts,
  sequences,
  characters,
  categories,
  locations,
  parts,
  types,
  scriptsequences
})

export default reducer
